import React, { useEffect, useState } from 'react';
import type { Question } from '../types/question';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { useAuthStore } from '../store/useAuthStore';
import { Button } from '../components/ui/Button';

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
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2 animate-fade-in">
          <h1 className="text-4xl font-bold font-serif text-gray-900">
            Today's Question
          </h1>
          <p className="text-gray-500 font-serif italic text-lg">
            {question.month} / {question.day}
          </p>
        </div>

        {/* Question Card (Letter Style) */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden transform transition-all hover:shadow-xl duration-300 animate-slide-up">
          <div className="h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
          <div className="p-10 space-y-6">
            <p className="text-2xl text-gray-800 font-serif leading-relaxed text-center">
              "{question.content}"
            </p>
          </div>
        </div>

        {/* Answer Section */}
        {existingAnswer ? (
          <div className="bg-emerald-50 rounded-xl p-8 border border-emerald-100 shadow-sm text-center animate-fade-in">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100 mb-4">
              <span className="text-2xl">🌿</span>
            </div>
            <h3 className="text-xl font-bold text-emerald-900 mb-3 font-serif">
              Answered
            </h3>
            <p className="text-emerald-800 italic font-serif leading-relaxed">
              "{answer}"
            </p>
            <div className="mt-4 text-xs text-emerald-600 uppercase tracking-wider font-semibold">
              See you next year
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg border border-gray-100 p-8 space-y-6 animate-slide-up"
            style={{ animationDelay: '100ms' }}
          >
            <div className="space-y-4">
              <label
                htmlFor="answer"
                className="block text-sm font-semibold text-gray-700 uppercase tracking-wider"
              >
                Your Answer
              </label>
              <textarea
                id="answer"
                className="w-full px-5 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 min-h-[180px] text-lg leading-relaxed resize-y transition-shadow bg-gray-50 focus:bg-white placeholder-gray-400 font-serif"
                placeholder="Write your thoughts here..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
              />
              <label
                htmlFor="isPublic"
                className="text-sm text-gray-600 cursor-pointer select-none"
              >
                Make this answer public (share with others)
              </label>
            </div>

            <Button
              type="submit"
              isLoading={isSubmitting}
              className="w-full py-4 text-lg font-semibold rounded-xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              Submit to Future Me
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default QuestionPage;
