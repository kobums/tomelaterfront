import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';

const slideUp = keyframes`
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
  overflow: hidden;
  transition: all 0.3s;
  animation: ${slideUp} 0.5s ease-out;

  &:hover {
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const GradientBar = styled.div`
  height: 0.5rem;
  background-image: linear-gradient(to right, #6366f1, #a855f7, #ec4899);
`;

const QuestionContent = styled.div`
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const QuestionText = styled.p`
  font-size: 1.5rem;
  color: #1f2937;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  line-height: 1.625;
  text-align: center;
`;

interface QuestionCardProps {
  content: string;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ content }) => {
  return (
    <Card>
      <GradientBar />
      <QuestionContent>
        <QuestionText>"{content}"</QuestionText>
      </QuestionContent>
    </Card>
  );
};
