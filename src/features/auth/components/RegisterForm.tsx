import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { AlertModal } from '../../../components/ui/AlertModal';
import { useRegister } from '../hooks/useRegister';

const slideUp = keyframes`
  from { transform: translateY(10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Form = styled.form`
  margin-top: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const EmailVerificationGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const EmailInputRow = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.5rem;
`;

const SendCodeButton = styled.button`
  height: 42px;
  padding: 0 1rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: white;
  background-color: #4f46e5;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.1), 0 2px 4px -1px rgba(79, 70, 229, 0.06);
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  border: none;
  cursor: pointer;

  &:hover:not(:disabled) {
    background-color: #4338ca;
  }
  &:active:not(:disabled) {
    transform: scale(0.95);
  }
  &:disabled {
    background-color: #e5e7eb;
    color: #9ca3af;
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const VerificationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${slideUp} 0.3s ease-out;
`;

const VerifyButton = styled(Button)`
  padding-left: 1.5rem;
  padding-right: 1.5rem;
  height: 42px;
  white-space: nowrap;
  background-color: #4f46e5;
  color: white;
  font-weight: 700;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(199, 210, 254, 0.5);
  &:hover:not(:disabled) {
    box-shadow: 0 20px 25px -5px rgba(199, 210, 254, 0.5);
  }
`;

const TimerBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.375rem 0.625rem;
  background-color: rgba(253, 242, 248, 0.5);
  border-radius: 0.5rem;
  border: 1px solid rgba(252, 231, 243, 0.5);
`;

const TimerText = styled.span`
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.875rem;
  font-weight: 700;
  color: #db2777;
`;

const VerifiedMessage = styled.div`
  font-size: 0.75rem;
  color: #059669;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0 0.25rem;
`;

const ErrorBanner = styled.div`
  color: #ef4444;
  font-size: 0.875rem;
  text-align: center;
  background-color: #fef2f2;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid #fee2e2;
  font-weight: 500;
`;

const SignInText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

const SignInLink = styled(Link)`
  font-weight: 500;
  color: #4f46e5;
  text-decoration: underline;
  text-decoration-color: #c7d2fe;
  text-underline-offset: 4px;
  &:hover {
    color: #4338ca;
  }
`;

export const RegisterForm: React.FC = () => {
  const {
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
  } = useRegister();

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            label="Nickname"
            type="text"
            value={nickname}
            onChange={(e) => handleInputChange('nickname', e.target.value)}
            error={errors.nickname}
            required
            placeholder="Your name"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
          
          <EmailVerificationGroup>
            <EmailInputRow>
              <div style={{ flex: 1 }}>
                <Input
                  label="Email Address"
                  type="email"
                  value={email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                  disabled={isEmailVerified}
                  placeholder="you@example.com"
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                />
              </div>
              {!isEmailVerified && (
                <SendCodeButton
                  type="button"
                  onClick={handleSendCode}
                  disabled={isSendingCode || !email || (!!errors.email && email.length > 0)}
                >
                  {isSendingCode ? (
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : isEmailSent ? 'Resend' : 'Send Code'}
                </SendCodeButton>
              )}
            </EmailInputRow>
            {errors.email && <p style={{ fontSize: '0.75rem', color: '#ef4444', padding: '0 0.25rem' }}>{errors.email}</p>}
          </EmailVerificationGroup>

          {isEmailSent && !isEmailVerified && (
            <VerificationSection>
              <EmailInputRow>
                <div style={{ flex: 1 }}>
                  <Input
                    label="Verification Code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => handleInputChange('verificationCode', e.target.value)}
                    placeholder="6 digits"
                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                    maxLength={6}
                  />
                </div>
                <VerifyButton
                  type="button"
                  onClick={handleVerifyCode}
                  isLoading={isVerifyingCode}
                  disabled={verificationCode.length !== 6 || timeLeft === 0}
                >
                  Verify
                </VerifyButton>
              </EmailInputRow>
              
              {errors.verificationCode && (
                <p style={{ fontSize: '0.75rem', color: '#ef4444', padding: '0 0.25rem' }}>{errors.verificationCode}</p>
              )}

              {timeLeft > 0 && (
                <TimerBadge>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>⏰</span>
                    <span style={{ fontSize: '0.6875rem', fontWeight: 500, color: '#be185d' }}>인증 유효시간</span>
                  </div>
                  <TimerText>
                    {formatTime(timeLeft)}
                  </TimerText>
                </TimerBadge>
              )}
            </VerificationSection>
          )}

          {isEmailVerified && (
            <VerifiedMessage>
              <span>✓</span>
              <span>이메일 인증이 완료되었습니다.</span>
            </VerifiedMessage>
          )}

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={errors.password}
            required
            placeholder="••••••••"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <Input
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            error={errors.confirmPassword}
            required
            placeholder="••••••••"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
        </InputGroup>

        {errors.general && <ErrorBanner>{errors.general}</ErrorBanner>}

        <div>
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!isEmailVerified}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: '0.75rem',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
              backgroundColor: !isEmailVerified ? '#d1d5db' : undefined,
              cursor: !isEmailVerified ? 'not-allowed' : undefined,
              color: 'white',
            }}
          >
            Create Account
          </Button>
          {!isEmailVerified && (
            <p style={{ marginTop: '0.5rem', textAlign: 'center', fontSize: '0.75rem', color: '#9ca3af', fontStyle: 'italic' }}>
              Please verify your email to create an account.
            </p>
          )}
        </div>
      </Form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <SignInText>
          Already have an account?{' '}
          <SignInLink to="/login">
            Sign In
          </SignInLink>
        </SignInText>
      </div>

      <AlertModal
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        onClose={closeAlert}
      />
    </>
  );
};
