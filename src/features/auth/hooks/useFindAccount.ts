import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../../services/auth.service';
import { EMAIL_REGEX, PASSWORD_REGEX } from '../../../util';

export type TabType = 'email' | 'password';
export type ResetStep = 'request' | 'verify';

export const useFindAccount = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('email');
  const [isLoading, setIsLoading] = useState(false);

  // States for Find Email
  const [nickname, setNickname] = useState('');
  const [foundEmail, setFoundEmail] = useState('');

  // States for Reset Password
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const [step, setStep] = useState<ResetStep>('request');
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
  useEffect(() => {
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

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setError('');
    // Optional: Reset states when switching tabs if desired
  };

  const handleFindEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const emailResult = await authService.findEmail(nickname);
      setFoundEmail(emailResult);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResetCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!EMAIL_REGEX.test(email)) {
      setError('유효하지 않은 이메일 형식입니다.');
      return;
    }

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

  const resetFindEmailState = () => {
    setFoundEmail('');
    setNickname('');
  };

  const resetPasswordStep = () => {
    setStep('request');
  };

  return {
    navigate,
    activeTab,
    handleTabChange,
    isLoading,
    // Find Email
    nickname,
    setNickname,
    foundEmail,
    handleFindEmail,
    resetFindEmailState,
    // Reset Password
    email,
    setEmail,
    verificationCode,
    setVerificationCode,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    step,
    timeLeft,
    handleSendResetCode,
    handleResetPassword,
    resetPasswordStep,
    formatTime,
    // Common
    error,
    alertState,
    closeAlert,
  };
};
