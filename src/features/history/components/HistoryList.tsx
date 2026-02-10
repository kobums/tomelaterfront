import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { Answer } from '../../../types/answer';
import { HistoryCard } from './HistoryCard';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';

const Grid = styled.div`
  display: grid;
  gap: 1.5rem;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 5rem 0;
  background-color: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #f3f4f6;
`;

const EmptyText = styled.p`
  color: #6b7280;
  font-size: 1.125rem;
  margin-bottom: 1rem;
`;

const WriteLink = styled(Link)`
  color: #4f46e5;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    color: #4338ca;
  }
`;

const Sentinel = styled.div`
  height: 20px;
  width: 100%;
`;

interface HistoryListProps {
  answers: Answer[];
  onSelect: (answer: Answer) => void;
  // Infinite Scroll Props
  hasMore: boolean;
  onLoadMore: () => void;
  isLoading: boolean;
}

export const HistoryList: React.FC<HistoryListProps> = ({ 
  answers, 
  onSelect,
  hasMore,
  onLoadMore,
  isLoading
}) => {
  const ref = useIntersectionObserver({
    onIntersect: onLoadMore,
    enabled: hasMore && !isLoading,
  });

  if (answers.length === 0 && !isLoading) {
    return (
      <EmptyState>
        <EmptyText>You haven't written any letters yet.</EmptyText>
        <WriteLink to="/">Write your first letter today &rarr;</WriteLink>
      </EmptyState>
    );
  }

  return (
    <>
      <Grid>
        {answers.map((answer) => (
          <HistoryCard key={answer.id} answer={answer} onSelect={onSelect} />
        ))}
      </Grid>

      {/* Infinite Scroll Sentinel */}
      <Sentinel ref={ref}>
        {isLoading && hasMore && <p style={{textAlign: 'center', color: '#6b7280'}}>Loading more...</p>}
      </Sentinel>
    </>
  );
};
