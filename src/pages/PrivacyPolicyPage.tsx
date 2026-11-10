import React, { useEffect } from 'react';
import styled from '@emotion/styled';

// 개인정보 처리방침은 gowoobro.com 에서 통합 관리한다. /privacy 는 그쪽으로 보낸다.
const PRIVACY_URL = 'https://gowoobro.com/ko/app/1/privacy';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #374151;
  line-height: 1.75;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1rem;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
`;

const PolicyLink = styled.a`
  color: #4f46e5;
  text-decoration: underline;
  &:hover {
    color: #4338ca;
  }
`;

const PrivacyPolicyPage: React.FC = () => {
  useEffect(() => {
    window.location.replace(PRIVACY_URL);
  }, []);

  return (
    <PageContainer>
      <Title>개인정보 처리방침</Title>
      <p>
        개인정보 처리방침 페이지로 이동합니다. 자동으로 이동하지 않으면{' '}
        <PolicyLink href={PRIVACY_URL}>여기</PolicyLink>를 눌러주세요.
      </p>
    </PageContainer>
  );
};

export default PrivacyPolicyPage;
