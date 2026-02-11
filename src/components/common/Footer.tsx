import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #f9fafb;
  border-top: 1px solid #e5e7eb;
  padding: 2rem 0;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  
  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Copyright = styled.p`
  color: #6b7280;
  font-size: 0.875rem;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
`;

const Links = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const FooterLink = styled(Link)`
  color: #6b7280;
  font-size: 0.875rem;
  text-decoration: none;
  &:hover {
    color: #111827;
    text-decoration: underline;
  }
`;

export const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <Copyright>
          © {new Date().getFullYear()} To Me, Later. All rights reserved.
        </Copyright>
        <Links>
          <FooterLink to="/privacy">개인정보 처리방침</FooterLink>
        </Links>
      </FooterContent>
    </FooterContainer>
  );
};
