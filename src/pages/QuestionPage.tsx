import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { useQuestion } from '../features/question/hooks/useQuestion';
import { QuestionCard } from '../features/question/components/QuestionCard';
import { AnswerSection } from '../features/question/components/AnswerSection';

// Keyframes
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// Styled Components
const PageContainer = styled.div`
  min-height: calc(100vh - 4rem);
  background-color: #f9fafb;
  padding: 3rem 1rem;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const ContentWrapper = styled.div`
  max-width: 42rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Header = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Title = styled.h1`
  font-size: 2.25rem;
  font-weight: 700;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  color: #111827;
`;

const DateText = styled.p`
  color: #6b7280;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-style: italic;
  font-size: 1.125rem;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const QuestionPage: React.FC = () => {
  const {
    question,
    answer,
    setAnswer,
    isSubmitting,
    isPublic,
    setIsPublic,
    existingAnswer,
    isLoading,
    handleSubmit,
  } = useQuestion();

  if (isLoading || !question) {
    return (
      <LoadingContainer>
        Loading Today's Question...
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        {/* Header */}
        <Header>
          <Title>
            Today's Question
          </Title>
          <DateText>
            {question.month} / {question.day}
          </DateText>
        </Header>

        {/* Question Card (Letter Style) */}
        <QuestionCard content={question.content} />

        {/* Answer Section */}
        <AnswerSection
          existingAnswer={existingAnswer}
          answer={answer}
          setAnswer={setAnswer}
          isPublic={isPublic}
          setIsPublic={setIsPublic}
          isSubmitting={isSubmitting}
          handleSubmit={handleSubmit}
        />
      </ContentWrapper>
    </PageContainer>
  );
};

export default QuestionPage;
