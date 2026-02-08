import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/auth.service';
import { EMAIL_REGEX, PASSWORD_REGEX, NICKNAME_REGEX } from '../../../util';

export const useRegister = () => {
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
  useEffect(() => {
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

  return {
    email,
    password,
    confirmPassword,
    nickname,
    isLoading,
    alertState,
    closeAlert,
    verificationCode,
    isEmailSent,
    isEmailVerified,
    isSendingCode,
    isVerifyingCode,
    timeLeft,
    errors,
    handleInputChange,
    handleSendCode,
    handleVerifyCode,
    handleSubmit,
    formatTime,
  };
};
