import React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { FindAccountForm } from '../features/auth/components/FindAccountForm';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #f0f9ff, #f3e8ff, #fce7f3);
  padding: 3rem 1rem;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const Card = styled.div`
  width: 100%;
  max-width: 28rem;
  background-color: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(4px);
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.5);
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 1.875rem;
  font-weight: 700;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  color: #111827;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #4b5563;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  padding-top: 1.5rem;
  border-top: 1px solid #f3f4f6;
`;

const BackLink = styled(Link)`
  font-size: 0.875rem;
  color: #6b7280;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s;
  &:hover {
    color: #111827;
  }
`;

const FindAccountPage: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Header>
          <Title>Account Recovery</Title>
          <Subtitle>Recover your email or reset your password</Subtitle>
        </Header>

        <FindAccountForm />

        <Footer>
           <BackLink to="/login">
            <span>←</span>
            <span>Back to Login</span>
          </BackLink>
        </Footer>
      </Card>
    </PageContainer>
  );
};

export default FindAccountPage;
