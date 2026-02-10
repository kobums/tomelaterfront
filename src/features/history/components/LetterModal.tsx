import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import type { Answer } from '../../../types/answer';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  animation: ${fadeIn} 0.2s ease-out;
`;

const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 42rem;
  background-color: #fdfbf7;
  border-radius: 0.5rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  animation: ${slideUp} 0.3s ease-out;
`;

const PaperTexture = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.03;
  pointer-events: none;
  background-image: url('https://www.transparenttextures.com/patterns/paper.png');
`;

const Stamp = styled.div`
  position: absolute;
  top: 2rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  border: 2px solid #e0e7ff;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.4;
  color: #c7d2fe;
  font-size: 1.875rem;
`;

const ModalBody = styled.div`
  padding: 2.5rem;
  @media (min-width: 640px) {
    padding: 4rem;
  }
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const LetterHeader = styled.div`
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eef2ff;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const LetterLabel = styled.div`
  color: #818cf8;
  font-size: 0.875rem;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-style: italic;
`;

const LetterDate = styled.div`
  font-size: 1.5rem;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  color: #1f2937;
`;

const LetterContent = styled.div`
  font-size: 1.125rem;
`;

const LetterText = styled.p`
  color: #374151;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  line-height: 2;
  white-space: pre-wrap;

  &::first-letter {
    font-size: 2.25rem;
    font-weight: 700;
    margin-right: 0.25rem;
    float: left;
    line-height: 1;
  }
`;

const QuestionText = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 0.5rem;
`;

const LetterFooter = styled.div`
  padding-top: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const StatusInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const StatusLabel = styled.div`
  font-size: 0.75rem;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
`;

const StatusValue = styled.div`
  font-size: 0.875rem;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-style: italic;
  color: #4b5563;
`;

const CloseButton = styled.button`
  padding: 0.5rem 1.5rem;
  background-color: white;
  border: 1px solid #e5e7eb;
  color: #4b5563;
  border-radius: 9999px;
  font-weight: 500;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #f9fafb;
  }
`;

const ModalEdge = styled.div`
  height: 0.25rem;
  background-image: linear-gradient(to right, #e0e7ff, #f3e8ff, #fce7f3);
`;

interface LetterModalProps {
  letter: Answer;
  onClose: () => void;
}

export const LetterModal: React.FC<LetterModalProps> = ({ letter, onClose }) => {
  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <PaperTexture />
        <Stamp>
          <span>🕊️</span>
        </Stamp>

        <ModalBody>
          <LetterHeader>
            <LetterLabel>Written on</LetterLabel>
            <LetterDate>
              {new Date(letter.createdat).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </LetterDate>
            {letter.extra?.question?.content && (
                <QuestionText>{letter.extra.question.content}</QuestionText>
              )}
          </LetterHeader>

          <div className="prose prose-lg max-w-none">
            <LetterContent>
              <LetterText>{letter.content}</LetterText>
            </LetterContent>
          </div>

          <LetterFooter>
            <StatusInfo>
              <StatusLabel>Status</StatusLabel>
              <StatusValue>
                {letter.ispublic === 2 ? 'Shared with the world' : 'Kept for myself'}
              </StatusValue>
            </StatusInfo>
            <CloseButton onClick={onClose}>Close Letter</CloseButton>
          </LetterFooter>
        </ModalBody>

        <ModalEdge />
      </ModalContent>
    </ModalBackdrop>
  );
};
