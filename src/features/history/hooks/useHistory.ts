import { useState, useEffect } from 'react';
import type { Answer } from '../../../types/answer';
import { AnswerService } from '../../../services/answer.service';
import { useAuthStore } from '../../../store/useAuthStore';

export const useHistory = () => {
  const { user } = useAuthStore();
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<Answer | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        if (user) {
          const data = await AnswerService.getMyAnswers(user.id);
          setAnswers(data);
        }
      } catch (error) {
        console.error('Failed to fetch history', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchHistory();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return {
    answers,
    isLoading,
    selectedLetter,
    setSelectedLetter,
  };
};
