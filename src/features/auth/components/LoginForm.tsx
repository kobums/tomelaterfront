import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { useLogin } from '../hooks/useLogin';

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

const ForgotPasswordLink = styled(Link)`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4f46e5;
  text-decoration: none;
  &:hover {
    color: #4338ca;
  }
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

const Divider = styled.div`
  margin-top: 2rem;
  position: relative;
`;

const DividerLine = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  & > div {
    width: 100%;
    border-top: 1px solid #e5e7eb;
  }
`;

const DividerText = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0.875rem;
  & > span {
    padding: 0 1rem;
    background-color: transparent; // Ensure text is legible over line if bg matches card
    color: #6b7280;
    font-weight: 500;
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  display: inline-flex;
  justify-content: center;
  padding: 0.75rem 1rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: white;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  cursor: not-allowed;
  opacity: 0.6;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f9fafb;
  }
`;

const SignUpText = styled.p`
  font-size: 0.875rem;
  color: #4b5563;
`;

const SignUpLink = styled(Link)`
  font-weight: 500;
  color: #4f46e5;
  text-decoration: underline;
  text-decoration-color: #c7d2fe;
  text-underline-offset: 4px;
  &:hover {
    color: #4338ca;
  }
`;

export const LoginForm: React.FC = () => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    handleSubmit,
  } = useLogin();

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="you@example.com"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
          />
        </InputGroup>

        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <ForgotPasswordLink to="/find-account">
            Forgot your password?
          </ForgotPasswordLink>
        </div>

        {error && <ErrorBanner>{error}</ErrorBanner>}

        <div>
          <Button
            type="submit"
            isLoading={isLoading}
            style={{ width: '100%', padding: '0.75rem 1rem', fontSize: '1rem', fontWeight: 600, borderRadius: '0.75rem' }}
          >
            Sign In
          </Button>
        </div>
      </Form>

      <div style={{ marginTop: '2rem' }}>
        <Divider>
          <DividerLine>
            <div />
          </DividerLine>
          <DividerText>
            <span>Or continue with</span>
          </DividerText>
        </Divider>

        <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr', gap: '0.75rem' }}>
          <GoogleButton disabled>
            Google (Coming Soon)
          </GoogleButton>
        </div>
      </div>

      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <SignUpText>
          Don't have an account?{' '}
          <SignUpLink to="/register">
            Sign Up
          </SignUpLink>
        </SignUpText>
      </div>
    </>
  );
};
