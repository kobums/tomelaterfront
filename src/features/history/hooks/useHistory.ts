import { useState, useEffect, useCallback } from 'react';
import type { Answer } from '../../../types/answer';
import { AnswerService } from '../../../services/answer.service';
import { useAuthStore } from '../../../store/useAuthStore';

export const useHistory = () => {
  const { user } = useAuthStore();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<Answer | null>(null);
  
  // Pagination State
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const fetchAnswers = useCallback(async (pageNum: number, append: boolean = false) => {
    if (!user) return;
    
    setIsLoading(true);
    try {
      const response = await AnswerService.getMyAnswers(user.id, pageNum, 10); // Default size 10
      
      setAnswers(prev => append ? [...prev, ...response.content] : response.content);
      setPage(response.page);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
      setHasMore(!response.last);
      
    } catch (error) {
      console.error('Failed to fetch history', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  // Initial Load
  useEffect(() => {
    if (user) {
      window.scrollTo(0, 0);
      fetchAnswers(0, false);
    } else {
      setAnswers([]);
    }
  }, [user, fetchAnswers]);

  const loadMore = () => {
    if (!isLoading && hasMore) {
      fetchAnswers(page + 1, true);
    }
  };

  return {
    answers,
    isLoading,
    selectedLetter,
    setSelectedLetter,
    page,
    totalPages,
    totalElements,
    hasMore,
    loadMore
  };
};
