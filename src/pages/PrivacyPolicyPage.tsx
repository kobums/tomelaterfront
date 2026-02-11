import React from 'react';
import styled from '@emotion/styled';

const PageContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  color: #374151;
  line-height: 1.75;
`;

const Header = styled.header`
  margin-bottom: 3rem;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: #111827;
  margin-bottom: 1rem;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
`;

const LastUpdated = styled.p`
  color: #6b7280;
  font-style: italic;
`;

const Section = styled.section`
  margin-bottom: 2.5rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 1rem;
  border-bottom: 2px solid #e5e7eb;
  padding-bottom: 0.5rem;
`;

const Paragraph = styled.p`
  margin-bottom: 1rem;
`;

const List = styled.ul`
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1rem;
`;

const ListItem = styled.li`
  margin-bottom: 0.5rem;
`;

const ContactEmail = styled.a`
  color: #4f46e5;
  text-decoration: underline;
  &:hover {
    color: #4338ca;
  }
`;

const PrivacyPolicyPage: React.FC = () => {
  return (
    <PageContainer>
      <Header>
        <Title>개인정보 처리방침</Title>
        <LastUpdated>최종 수정일: 2026년 2월</LastUpdated>
      </Header>

      <Section>
        <SectionTitle>1. 개요</SectionTitle>
        <Paragraph>
          <strong>To Me, Later</strong>에 오신 것을 환영합니다. 우리는 귀하의 개인정보를 소중히 여기며, 이를 보호하기 위해 최선을 다하고 있습니다. 본 개인정보 처리방침은 귀하가 우리의 웹사이트를 방문할 때 귀하의 개인정보를 어떻게 처리하는지, 그리고 귀하의 권리와 법적 보호에 대해 설명합니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. 수집하는 개인정보 항목</SectionTitle>
        <Paragraph>
          우리는 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다:
        </Paragraph>
        <List>
          <ListItem><strong>신원 데이터</strong>: 이름, 아이디 또는 이와 유사한 식별자.</ListItem>
          <ListItem><strong>연락처 데이터</strong>: 이메일 주소.</ListItem>
          <ListItem><strong>기술 데이터</strong>: IP 주소, 로그인 데이터, 브라우저 유형 및 버전, 시간대 설정 및 위치, 운영 체제 및 플랫폼.</ListItem>
          <ListItem><strong>콘텐츠 데이터</strong>: 귀하가 작성한 미래로 보내는 편지 및 메시지 내용.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>3. 개인정보의 이용 목적</SectionTitle>
        <Paragraph>
          우리는 법적으로 허용된 경우에만 귀하의 개인정보를 사용합니다. 주로 다음과 같은 목적으로 사용됩니다:
        </Paragraph>
        <List>
          <ListItem>회원 가입 및 관리.</ListItem>
          <ListItem>미래 편지 저장 및 발송 서비스 제공.</ListItem>
          <ListItem>사용자 문의 응대 및 관계 관리.</ListItem>
          <ListItem>웹사이트, 서비스, 마케팅 및 고객 경험 개선.</ListItem>
        </List>
      </Section>

      <Section>
        <SectionTitle>4. 데이터 보안</SectionTitle>
        <Paragraph>
          우리는 귀하의 개인정보가 우발적으로 분실, 사용, 무단 접근, 변경 또는 공개되는 것을 방지하기 위해 적절한 보안 조치를 취하고 있습니다. 귀하의 편지는 비공개이며, 귀하가 명시적으로 공개를 선택하지 않는 한 귀하만이 접근할 수 있습니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>5. 정보주체의 권리</SectionTitle>
        <Paragraph>
          귀하는 관련 법령에 따라 언제든지 개인정보의 열람, 정정, 삭제, 처리 정지 요구 등의 권리를 행사할 수 있습니다.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>6. 문의하기</SectionTitle>
        <Paragraph>
          본 개인정보 처리방침에 대해 궁금한 점이 있으시면 아래 이메일로 문의해 주시기 바랍니다: <ContactEmail href="mailto:kobums23@gmail.com">kobums23@gmail.com</ContactEmail>
        </Paragraph>
      </Section>
    </PageContainer>
  );
};

export default PrivacyPolicyPage;
