import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { AlertModal } from '../../../components/ui/AlertModal';
import { useFindAccount } from '../hooks/useFindAccount';

const slideUp = keyframes`
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const TabList = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  padding: 0.25rem;
  background-color: #f3f4f6;
  border-radius: 0.75rem;
  border-bottom: 1px solid #e5e7eb;
`;

const TabButton = styled.button<{ isActive: boolean }>`
  flex: 1;
  padding: 0.5rem 0;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  transition: all 0.2s;
  border: none;
  cursor: pointer;
  position: relative;
  
  ${({ isActive }) =>
    isActive
      ? `
        color: #4f46e5;
        background-color: white;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      `
      : `
        color: #6b7280;
        background-color: transparent;
        &:hover {
          color: #374151;
        }
      `}
`;

const TabIndicator = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #4f46e5;
  border-top-left-radius: 9999px;
  border-top-right-radius: 9999px;
`;

const ContentContainer = styled.div`
  min-height: 300px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  animation: ${slideUp} 0.3s ease-out;
`;

const Description = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  font-size: 0.875rem;
  color: #ef4444;
  font-weight: 500;
`;

const ResultContainer = styled.div`
  text-align: center;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: ${slideUp} 0.3s ease-out;
`;

const IconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: #e0e7ff;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: #4f46e5;
`;

const ResultEmail = styled.p`
  margin-top: 0.5rem;
  font-size: 1.25rem;
  font-weight: 700;
  color: #4f46e5;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  letter-spacing: 0.025em;
`;

const RetryButton = styled.button`
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: underline;
  border: none;
  background: none;
  cursor: pointer;
  &:hover {
    color: #374151;
  }
`;

const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const EmailDisplay = styled.span`
  font-size: 0.75rem;
  color: #4b5563;
`;

const ChangeButton = styled.button`
  font-size: 0.75rem;
  color: #6366f1;
  text-decoration: underline;
  border: none;
  background: none;
  cursor: pointer;
`;

const TimerText = styled.p`
  font-size: 0.75rem;
  color: #db2777;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  text-align: right;
`;

export const FindAccountForm: React.FC = () => {
  const {
    navigate,
    activeTab,
    handleTabChange,
    isLoading,
    nickname,
    setNickname,
    foundEmail,
    handleFindEmail,
    resetFindEmailState,
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
    error,
    alertState,
    closeAlert,
  } = useFindAccount();

  return (
    <>
      <TabList>
        <TabButton
          isActive={activeTab === 'email'}
          onClick={() => handleTabChange('email')}
        >
          이메일 찾기
          {activeTab === 'email' && <TabIndicator />}
        </TabButton>
        <TabButton
          isActive={activeTab === 'password'}
          onClick={() => handleTabChange('password')}
        >
          비밀번호 찾기
          {activeTab === 'password' && <TabIndicator />}
        </TabButton>
      </TabList>

      <ContentContainer>
        {activeTab === 'email' ? (
          <div style={{ animation: `${slideUp} 0.3s ease-out` }}>
            {!foundEmail ? (
              <Form onSubmit={handleFindEmail}>
                <Description>
                  가입 시 사용한 닉네임을 입력해 주세요.
                </Description>
                <Input
                  label="Nickname"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="Enter your nickname"
                  required
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button
                  type="submit"
                  isLoading={isLoading}
                  style={{ width: '100%', borderRadius: '0.75rem' }}
                >
                  이메일 찾기
                </Button>
              </Form>
            ) : (
              <ResultContainer>
                <IconWrapper>
                  <svg style={{ width: '2rem', height: '2rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </IconWrapper>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#111827' }}>회원님의 이메일</h3>
                  <ResultEmail>
                    {foundEmail}
                  </ResultEmail>
                </div>
                <Button
                  onClick={() => navigate('/login')}
                  variant="outline"
                  style={{ width: '100%', backgroundColor: 'white' }}
                >
                  로그인하러 가기
                </Button>

                <RetryButton onClick={resetFindEmailState}>
                  다시 찾기
                </RetryButton>
              </ResultContainer>
            )}
          </div>
        ) : (
          <div style={{ animation: `${slideUp} 0.3s ease-out` }}>
            {step === 'request' && (
              <Form onSubmit={handleSendResetCode}>
                 <Description>
                  가입 시 사용한 이메일을 입력해 주세요.<br/>
                  비밀번호 재설정 코드를 발송해 드립니다.
                </Description>
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <Button
                  type="submit"
                  isLoading={isLoading}
                  style={{ width: '100%', borderRadius: '0.75rem' }}
                >
                  인증 코드 받기
                </Button>
              </Form>
            )}

            {step === 'verify' && (
              <Form onSubmit={handleResetPassword}>
                <FlexBetween>
                  <EmailDisplay>{email}</EmailDisplay>
                  <ChangeButton type="button" onClick={resetPasswordStep}>
                    변경
                  </ChangeButton>
                </FlexBetween>
                
                <Input
                  label="Verification Code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="6 digits"
                  required
                  maxLength={6}
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                />
                
                {timeLeft > 0 && (
                  <TimerText>
                    남은 시간: {formatTime(timeLeft)}
                  </TimerText>
                )}

                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '1rem', marginTop: '0.5rem' }}>
                  <Input
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password"
                    required
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', marginBottom: '1rem' }}
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                  />
                </div>

                {error && <ErrorMessage>{error}</ErrorMessage>}

                <Button
                  type="submit"
                  isLoading={isLoading}
                  disabled={timeLeft === 0}
                  style={{ width: '100%', borderRadius: '0.75rem' }}
                >
                  비밀번호 변경하기
                </Button>
              </Form>
            )}
          </div>
        )}
      </ContentContainer>

      <AlertModal
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        onClose={closeAlert}
      />
    </>
  );
};
