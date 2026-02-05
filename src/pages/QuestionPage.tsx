import React, { useEffect, useState } from 'react';
import { Question } from '../models/question';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const QuestionPage: React.FC = () => {
  const { user } = useAuthStore();
  const [question, setQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [existingAnswer, setExistingAnswer] = useState<boolean>(false);

  useEffect(() => {
    fetchDailyQuestion();
  }, []);

  const fetchDailyQuestion = async () => {
    try {
      const q = await QuestionService.getDailyQuestion();
      setQuestion(q);
      if (user && q) {
        checkExistingAnswer(user.id, q.id);
      }
    } catch (error) {
      console.error('Failed to fetch daily question', error);
    }
  };

  const checkExistingAnswer = async (uid: number, qid: number) => {
    const ans = await AnswerService.getAnswerForQuestion(uid, qid);
    if (ans) {
      setExistingAnswer(true);
      setAnswer(ans.content);
    }
  };

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

  if (!question) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading Today's Question...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Today's Question
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
        <p className="text-xl text-gray-700 font-medium mb-4 text-center">
          {question.content}
        </p>
        <div className="text-sm text-gray-500 text-center">
          {question.month} / {question.day}
        </div>
      </div>

      {existingAnswer ? (
        <div className="bg-green-50 rounded-lg p-6 text-center">
          <h3 className="text-lg font-medium text-green-800 mb-2">
            You've answered this question!
          </h3>
          <p className="text-gray-600 italic">"{answer}"</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <textarea
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[150px]"
              placeholder="Write your answer here..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isPublic"
              checked={isPublic}
              onChange={(e) => setIsPublic(e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="isPublic" className="text-sm text-gray-700">
              Make this answer public?
            </label>
          </div>

          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Submit Answer
          </Button>
        </form>
      )}
    </div>
  );
};

export default QuestionPage;
