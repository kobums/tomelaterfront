import React from 'react';
import styled from '@emotion/styled';
import type { Answer } from '../../../types/answer';

const Card = styled.div`
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid #f3f4f6;
  overflow: hidden;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }
`;

const GradientBar = styled.div`
  height: 0.25rem;
  background-image: linear-gradient(to right, #818cf8, #c084fc);
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 500;
  background-color: #f3f4f6;
  color: #1f2937;
`;

const DateText = styled.span`
  font-size: 0.75rem;
  color: #9ca3af;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
`;

const PreviewText = styled.div`
  font-size: 0.875rem;
  color: #4b5563;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  line-height: 1.625;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const CardFooter = styled.div`
  padding-top: 1rem;
  border-top: 1px solid #f9fafb;
`;

const ReadButton = styled.button`
  color: #4f46e5;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  background: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: color 0.15s;

  &:hover {
    color: #3730a3;
  }
`;

const QuestionText = styled.div`
  font-size: 0.875rem;
  font-weight: 600;
`;

interface HistoryCardProps {
  answer: Answer;
  onSelect: (answer: Answer) => void;
}

export const HistoryCard: React.FC<HistoryCardProps> = ({ answer, onSelect }) => {
  return (
    <Card>
      <GradientBar />
      <CardContent>
        <CardHeader>
          <StatusBadge>{answer.ispublic === 2 ? 'Public' : 'Private'}</StatusBadge>
          <DateText>{new Date(answer.createdat).toLocaleDateString()}</DateText>
        </CardHeader>

        {answer.extra?.question?.content && (
          <QuestionText>{answer.extra.question.content}</QuestionText>
        )}

        <PreviewText>"{answer.content}"</PreviewText>

        <CardFooter>
          <ReadButton onClick={() => onSelect(answer)}>
            Read full letter <span style={{ marginLeft: '0.25rem' }}>&rarr;</span>
          </ReadButton>
        </CardFooter>
      </CardContent>
    </Card>
  );
};
