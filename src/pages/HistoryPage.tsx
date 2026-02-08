import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

import { useHistory } from '../features/history/hooks/useHistory';
import { HistoryList } from '../features/history/components/HistoryList';
import { LetterModal } from '../features/history/components/LetterModal';

// Keyframes
const spin = keyframes`
  to { transform: rotate(360deg); }
`;

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
  max-width: 56rem;
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
  font-size: 1.875rem;
  font-weight: 700;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  color: #111827;
`;

const Subtitle = styled.p`
  color: #6b7280;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-style: italic;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f9fafb;
`;

const Spinner = styled.div`
  height: 3rem;
  width: 3rem;
  border-radius: 9999px;
  border-bottom: 2px solid #4f46e5;
  animation: ${spin} 1s linear infinite;
`;

const HistoryPage: React.FC = () => {
  const { answers, isLoading, selectedLetter, setSelectedLetter } = useHistory();

  if (isLoading) {
    return (
      <LoadingContainer>
        <Spinner />
      </LoadingContainer>
    );
  }

  return (
    <PageContainer>
      <ContentWrapper>
        <Header>
          <Title>
            My Letter Box
          </Title>
          <Subtitle>
            Messages sent to your future self
          </Subtitle>
        </Header>

        <HistoryList answers={answers} onSelect={setSelectedLetter} />

        {/* Letter Modal */}
        {selectedLetter && (
          <LetterModal
            letter={selectedLetter}
            onClose={() => setSelectedLetter(null)}
          />
        )}
      </ContentWrapper>
    </PageContainer>
  );
};

export default HistoryPage;
