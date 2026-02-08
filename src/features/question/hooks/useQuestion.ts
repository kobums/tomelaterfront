import { useState, useEffect, useCallback } from 'react';
import type { Question } from '../../../types/question';
import { QuestionService } from '../../../services/question.service';
import { AnswerService } from '../../../services/answer.service';
import { useAuthStore } from '../../../store/useAuthStore';

export const useQuestion = () => {
  const { user } = useAuthStore();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [existingAnswer, setExistingAnswer] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchDailyQuestion = useCallback(async () => {
    try {
      setIsLoading(true);
      const q = await QuestionService.getDailyQuestion();
      setQuestion(q);
      if (user && q) {
        await checkExistingAnswer(user.id, q.id);
      }
    } catch (error) {
      console.error('Failed to fetch daily question', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const checkExistingAnswer = async (uid: number, qid: number) => {
    try {
      const ans = await AnswerService.getAnswerForQuestion(uid, qid);
      if (ans) {
        setExistingAnswer(true);
        setAnswer(ans.content);
        setIsPublic(ans.ispublic === 2);
      }
    } catch (error) {
      console.error('Failed to check existing answer', error);
    }
  };

  useEffect(() => {
    fetchDailyQuestion();
  }, [fetchDailyQuestion]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !question) return;

    setIsSubmitting(true);
    try {
      await AnswerService.createAnswer({
        uid: user.id,
        qid: question.id,
        content: answer,
        ispublic: isPublic,
      });
      setExistingAnswer(true);
      alert('Answer submitted successfully!');
    } catch (error) {
      console.error('Failed to submit answer', error);
      alert('Failed to submit answer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    question,
    answer,
    setAnswer,
    isSubmitting,
    isPublic,
    setIsPublic,
    existingAnswer,
    isLoading,
    handleSubmit,
  };
};
