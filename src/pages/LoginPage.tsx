import React from 'react';
import styled from '@emotion/styled';

import { LoginForm } from '../features/auth/components/LoginForm';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: linear-gradient(to bottom right, #eef2ff, #f3e8ff, #fce7f3);
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
`;

const Title = styled.h2`
  margin-top: 0.5rem;
  font-size: 2.25rem;
  font-weight: 700;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  color: #111827;
  letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
  margin-top: 1rem;
  text-align: center;
  color: #4b5563;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-style: italic;
`;

const Footer = styled.div`
  margin-top: 2rem;
  text-align: center;
  font-size: 0.75rem;
  color: #9ca3af;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
`;

const LoginPage: React.FC = () => {
  return (
    <PageContainer>
      <Card>
        <Header>
          <Title>To Me, Later</Title>
          <Subtitle>"Write today, reply next year."</Subtitle>
        </Header>

        <LoginForm />
      </Card>

      <Footer>
        © {new Date().getFullYear()} To Me, Later. All rights reserved.
      </Footer>
    </PageContainer>
  );
};

export default LoginPage;
