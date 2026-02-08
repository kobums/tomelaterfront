import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { EMAIL_REGEX, PASSWORD_REGEX, NICKNAME_REGEX } from '../util';

import { AlertModal } from '../components/ui/AlertModal';

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Alert Modal State
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onClose?: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
  });

  // Email verification states
  const [verificationCode, setVerificationCode] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);

  // Timer states
  const [timeLeft, setTimeLeft] = useState(0); // in seconds

  // Field-specific errors
  const [errors, setErrors] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    nickname: '',
    verificationCode: '',
    general: '',
  });

  // Helper to show alert
  const showAlert = (title: string, message: string, onClose?: () => void) => {
    setAlertState({ isOpen: true, title, message, onClose });
  };

  const closeAlert = () => {
    if (alertState.onClose) {
      alertState.onClose();
    }
    setAlertState((prev) => ({ ...prev, isOpen: false, onClose: undefined }));
  };

  // Countdown effect
  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && isEmailSent && !isEmailVerified) {
      setErrors((prev) => ({ ...prev, verificationCode: '인증 시간이 만료되었습니다. 다시 시도해주세요.' }));
    }
  }, [timeLeft, isEmailSent, isEmailVerified]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'nickname':
        return NICKNAME_REGEX.test(value)
          ? ''
          : '닉네임은 2~10자의 영문, 숫자, 한글만 가능합니다.';
      case 'email':
        return EMAIL_REGEX.test(value) ? '' : '유효하지 않은 이메일 형식입니다.';
      case 'password':
        return PASSWORD_REGEX.test(value)
          ? ''
          : '비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.';
      case 'confirmPassword':
        return value === password ? '' : '비밀번호가 일치하지 않습니다.';
      case 'verificationCode':
        return value.length === 6 ? '' : '인증 코드는 6자리 숫자여야 합니다.';
      default:
        return '';
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field === 'email') setEmail(value);
    if (field === 'password') setPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);
    if (field === 'nickname') setNickname(value);
    if (field === 'verificationCode') setVerificationCode(value);

    // Immediate validation feedback
    const errorMsg = validateField(field, value);
    setErrors((prev) => ({ ...prev, [field]: errorMsg, general: '' }));
  };

  const handleSendCode = async () => {
    const emailError = validateField('email', email);
    if (emailError) {
      setErrors((prev) => ({ ...prev, email: emailError }));
      return;
    }

    setIsSendingCode(true);
    try {
      await authService.sendVerificationCode(email);
      setIsEmailSent(true);
      setTimeLeft(300); // 5 minutes
      showAlert('전송 완료', '인증 코드가 이메일로 발송되었습니다.');
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, general: err.message }));
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (verificationCode.length !== 6) {
      setErrors((prev) => ({ ...prev, verificationCode: '인증 코드를 입력해주세요.' }));
      return;
    }

    if (timeLeft === 0) {
      setErrors((prev) => ({ ...prev, verificationCode: '인증 시간이 만료되었습니다. 다시 시도해주세요.' }));
      return;
    }

    setIsVerifyingCode(true);
    try {
      const isValid = await authService.checkVerificationCode(email, verificationCode);
      if (isValid) {
        setIsEmailVerified(true);
        setTimeLeft(0);
        showAlert('인증 성공', '이메일 인증이 완료되었습니다.');
      } else {
        setErrors((prev) => ({ ...prev, verificationCode: '인증 코드가 일치하지 않거나 만료되었습니다.' }));
      }
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, general: err.message }));
    } finally {
      setIsVerifyingCode(false);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isEmailVerified) {
      setErrors((prev) => ({ ...prev, general: '이메일 인증을 완료해주세요.' }));
      return;
    }

    // Final check before submission
    const newErrors = {
      nickname: validateField('nickname', nickname),
      email: validateField('email', email),
      password: validateField('password', password),
      confirmPassword: validateField('confirmPassword', confirmPassword),
      verificationCode: '',
      general: '',
    };


    setErrors(newErrors);

    if (Object.values(newErrors).some((msg) => msg !== '')) {
      return;
    }

    setIsLoading(true);

    try {
      await authService.register({
        email,
        passwd: password,
        nickname,
        socialtype: 'NONE',
        socialid: '',
      });
      
      showAlert('환영합니다!', '회원가입이 완료되었습니다. 로그인해주세요.', () => {
        navigate('/login');
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrors((prev) => ({ ...prev, general: err.message }));
      } else {
        setErrors((prev) => ({ ...prev, general: '회원가입에 실패했습니다.' }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50">
        <div>
          <h2 className="mt-2 text-center text-4xl font-bold font-serif text-gray-900 tracking-tight">
            Join Us
          </h2>
          <p className="mt-4 text-center text-gray-600 font-serif italic">
            "Start your journey to the future self."
          </p>
        </div>

        <form className="mt-10 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <Input
              label="Nickname"
              type="text"
              value={nickname}
              onChange={(e) => handleInputChange('nickname', e.target.value)}
              error={errors.nickname}
              required
              placeholder="Your name"
              className="bg-white/50"
            />
            
            <div className="space-y-1">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    disabled={isEmailVerified}
                    placeholder="you@example.com"
                    className="bg-white/50"
                  />
                </div>
                {!isEmailVerified && (
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={isSendingCode || !email || (!!errors.email && email.length > 0)}
                    className="h-[42px] px-4 text-[11px] font-bold uppercase tracking-wider text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-200 disabled:text-gray-400 rounded-xl transition-all shadow-md shadow-indigo-100 active:scale-95 flex items-center justify-center min-w-[100px]"
                  >
                    {isSendingCode ? (
                      <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : isEmailSent ? 'Resend' : 'Send Code'}
                  </button>
                )}
              </div>
              {errors.email && <p className="text-xs text-red-500 px-1">{errors.email}</p>}
            </div>

            {isEmailSent && !isEmailVerified && (
              <div className="flex flex-col space-y-2 animate-slide-up">
                <div className="flex items-end space-x-2">
                  <div className="flex-1">
                    <Input
                      label="Verification Code"
                      type="text"
                      value={verificationCode}
                      onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                      placeholder="6 digits"
                      className="bg-white/50"
                      maxLength={6}
                    />
                  </div>
                  <Button
                    type="button"
                    onClick={handleVerifyCode}
                    isLoading={isVerifyingCode}
                    disabled={verificationCode.length !== 6 || timeLeft === 0}
                    className="px-6 h-[42px] whitespace-nowrap bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:shadow-indigo-200"
                  >
                    Verify
                  </Button>
                </div>
                
                {errors.verificationCode && (
                  <p className="text-xs text-red-500 px-1">{errors.verificationCode}</p>
                )}

                {timeLeft > 0 && (
                  <div className="flex items-center justify-between px-2.5 py-1.5 bg-pink-50/50 rounded-lg border border-pink-100/50">
                    <div className="flex items-center space-x-2">
                      <svg className="w-3.5 h-3.5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-[11px] font-medium text-pink-700">인증 유효시간</span>
                    </div>
                    <span className="text-sm font-mono font-bold text-pink-600 animate-pulse">
                      {formatTime(timeLeft)}
                    </span>
                  </div>
                )}
              </div>
            )}





            {isEmailVerified && (
              <div className="text-xs text-emerald-600 font-medium flex items-center space-x-1 px-1">
                <span>✓</span>
                <span>이메일 인증이 완료되었습니다.</span>
              </div>
            )}

            <Input
              label="Password"
              type="password"
              value={password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              error={errors.password}
              required
              placeholder="••••••••"
              className="bg-white/50"
            />
            <Input
              label="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              error={errors.confirmPassword}
              required
              placeholder="••••••••"
              className="bg-white/50"
            />
          </div>

          {errors.general && (
            <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg border border-red-100 font-medium">
              {errors.general}
            </div>
          )}

          <div>
            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!isEmailVerified}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-base font-semibold text-white transition-all duration-200 transform ${
                !isEmailVerified
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 hover:-translate-y-0.5'
              }`}
            >
              Create Account
            </Button>
            {!isEmailVerified && (
              <p className="mt-2 text-center text-xs text-gray-400 italic">
                Please verify your email to create an account.
              </p>
            )}
          </div>
        </form>


        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500 underline decoration-indigo-200 underline-offset-4"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
      <div className="mt-8 text-center text-xs text-gray-400 font-serif">
        © {new Date().getFullYear()} To Me, Later. All rights reserved.
      </div>

      <AlertModal
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        onClose={closeAlert}
      />
    </div>
  );
};



export default RegisterPage;
