import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { AlertModal } from '../components/ui/AlertModal';
import { PASSWORD_REGEX } from '../util';

const FindAccountPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'email' | 'password'>('email');
  const [isLoading, setIsLoading] = useState(false);

  // States for Find Email
  const [nickname, setNickname] = useState('');
  const [foundEmail, setFoundEmail] = useState('');

  // States for Reset Password
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const [step, setStep] = useState<'request' | 'verify' | 'reset'>('request');
  const [timeLeft, setTimeLeft] = useState(0);

  // Error/Alert states
  const [error, setError] = useState('');
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

  const showAlert = (title: string, message: string, onClose?: () => void) => {
    setAlertState({ isOpen: true, title, message, onClose });
  };

  const closeAlert = () => {
    if (alertState.onClose) {
      alertState.onClose();
    }
    setAlertState((prev) => ({ ...prev, isOpen: false, onClose: undefined }));
  };

  // Timer effect
  React.useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFindEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const email = await authService.findEmail(nickname);
      setFoundEmail(email);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await authService.sendPasswordResetCode(email);
      setStep('verify');
      setTimeLeft(300);
      showAlert('전송 완료', '비밀번호 재설정 코드가 이메일로 발송되었습니다.');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmNewPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    
    if (!PASSWORD_REGEX.test(newPassword)) {
      setError('비밀번호는 영문과 숫자를 포함하여 8자 이상이어야 합니다.');
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(email, verificationCode, newPassword);
      showAlert('변경 완료', '비밀번호가 성공적으로 변경되었습니다. 로그인해주세요.', () => {
        navigate('/login');
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold font-serif text-gray-900 tracking-tight">
            Account Recovery
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Recover your email or reset your password
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`flex-1 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'email'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => { setActiveTab('email'); setError(''); }}
          >
            이메일 찾기
            {activeTab === 'email' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />
            )}
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium transition-colors relative ${
              activeTab === 'password'
                ? 'text-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => { setActiveTab('password'); setError(''); }}
          >
            비밀번호 찾기
            {activeTab === 'password' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 rounded-t-full" />
            )}
          </button>
        </div>

        <div className="min-h-[300px]">
          {activeTab === 'email' ? (
            <div className="space-y-6 animate-fadeIn">
              {!foundEmail ? (
                <form onSubmit={handleFindEmail} className="space-y-4">
                  <p className="text-sm text-gray-600 mb-4">
                    가입 시 사용한 닉네임을 입력해 주세요.
                  </p>
                  <Input
                    label="Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="Enter your nickname"
                    required
                    className="bg-white/50"
                  />
                  {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100"
                  >
                    이메일 찾기
                  </Button>
                </form>
              ) : (
                <div className="text-center py-6 space-y-6 animate-slideUp">
                  <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto text-indigo-600">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">회원님의 이메일</h3>
                    <p className="mt-2 text-xl font-bold text-indigo-600 font-mono tracking-wide">
                      {foundEmail}
                    </p>
                  </div>
                  <Button
                    onClick={() => navigate('/login')}
                    variant="outline"
                    className="w-full bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                  >
                    로그인하러 가기
                  </Button>

                  <button 
                    onClick={() => { setFoundEmail(''); setNickname(''); }}
                    className="text-sm text-gray-500 underline"
                  >
                    다시 찾기
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6 animate-fadeIn">
              {step === 'request' && (
                <form onSubmit={handleSendResetCode} className="space-y-4">
                   <p className="text-sm text-gray-600 mb-4">
                    가입 시 사용한 이메일을 입력해 주세요.<br/>
                    비밀번호 재설정 코드를 발송해 드립니다.
                  </p>
                  <Input
                    label="Email Address"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="bg-white/50"
                  />
                  {error && <p className="text-sm text-red-500 font-medium">{error}</p>}
                  <Button
                    type="submit"
                    isLoading={isLoading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100"
                  >
                    인증 코드 받기
                  </Button>

                </form>
              )}

              {step === 'verify' && (
                <form onSubmit={handleResetPassword} className="space-y-4 animate-slideUp">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600 text-xs">{email}</span>
                    <button 
                      type="button" 
                      onClick={() => setStep('request')}
                      className="text-xs text-indigo-500 underline"
                    >
                      변경
                    </button>
                  </div>
                  
                  <Input
                    label="Verification Code"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="6 digits"
                    required
                    maxLength={6}
                    className="bg-white/50"
                  />
                  
                  {timeLeft > 0 && (
                    <p className="text-xs text-pink-600 font-mono text-right">
                      남은 시간: {formatTime(timeLeft)}
                    </p>
                  )}

                  <div className="border-t border-gray-100 my-4 pt-4">
                    <Input
                      label="New Password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                      required
                      className="bg-white/50 mb-4"
                    />
                    <Input
                      label="Confirm New Password"
                      type="password"
                      value={confirmNewPassword}
                      onChange={(e) => setConfirmNewPassword(e.target.value)}
                      placeholder="Confirm new password"
                      required
                      className="bg-white/50"
                    />
                  </div>

                  {error && <p className="text-sm text-red-500 font-medium">{error}</p>}

                  <Button
                    type="submit"
                    isLoading={isLoading}
                    disabled={timeLeft === 0}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-100"
                  >
                    비밀번호 변경하기
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>

        <div className="mt-8 text-center pt-6 border-t border-gray-100">
           <Link
            to="/login"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors flex items-center justify-center space-x-1"
          >
            <span>←</span>
            <span>Back to Login</span>
          </Link>
        </div>
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

export default FindAccountPage;
