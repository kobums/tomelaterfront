import React, { useEffect, useState } from 'react';
import type { Answer } from '../types/answer';
import { AnswerService } from '../services/answer.service';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';

const HistoryPage: React.FC = () => {
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold font-serif text-gray-900">
            My Letter Box
          </h1>
          <p className="text-gray-500 font-serif italic">
            Messages sent to your future self
          </p>
        </div>

        {answers.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg mb-4">
              You haven't written any letters yet.
            </p>
            <Link
              to="/"
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              Write your first letter today &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {answers.map((answer) => (
              <div
                key={answer.id}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="h-1 bg-gradient-to-r from-indigo-400 to-purple-400"></div>
                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {answer.ispublic === 2 ? 'Public' : 'Private'}
                    </span>
                    <span className="text-xs text-gray-400 font-serif">
                      {new Date(answer.createdat).toLocaleDateString()}
                    </span>
                  </div>

                  {/* Answer Preview */}
                  <div className="prose prose-sm max-w-none text-gray-600 font-serif line-clamp-4 leading-relaxed">
                    "{answer.content}"
                  </div>

                  <div className="pt-4 border-t border-gray-50">
                    <button
                      onClick={() => setSelectedLetter(answer)}
                      className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors flex items-center"
                    >
                      Read full letter <span className="ml-1">&rarr;</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Letter Modal */}
        {selectedLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
            <div
              className="relative w-full max-w-2xl bg-[#fdfbf7] rounded-lg shadow-2xl overflow-hidden animate-slide-up transform"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Paper Texture Overlay */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/paper.png')]"></div>

              {/* Decorative Stamp/Seal area */}
              <div className="absolute top-8 right-8 w-16 h-16 border-2 border-indigo-100 rounded-full flex items-center justify-center opacity-40">
                <span className="text-indigo-200 text-3xl">🕊️</span>
              </div>

              <div className="p-10 sm:p-16 space-y-8">
                <div className="space-y-2 border-b border-indigo-50 pb-6">
                  <div className="text-indigo-400 text-sm font-serif italic">
                    Written on
                  </div>
                  <div className="text-2xl font-serif text-gray-800">
                    {new Date(selectedLetter.createdat).toLocaleDateString(
                      'en-US',
                      {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        weekday: 'long',
                      },
                    )}
                  </div>
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 font-serif leading-loose first-letter:text-4xl first-letter:font-bold first-letter:mr-1 first-letter:float-left whitespace-pre-wrap">
                    {selectedLetter.content}
                  </p>
                </div>

                <div className="pt-12 flex justify-between items-end">
                  <div className="space-y-1">
                    <div className="text-xs text-gray-400 uppercase tracking-widest font-sans">
                      Status
                    </div>
                    <div className="text-sm font-serif italic text-gray-600">
                      {selectedLetter.ispublic === 2
                        ? 'Shared with the world'
                        : 'Kept for myself'}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedLetter(null)}
                    className="px-6 py-2 bg-white border border-gray-200 text-gray-600 rounded-full hover:bg-gray-50 transition-colors font-medium shadow-sm"
                  >
                    Close Letter
                  </button>
                </div>
              </div>

              {/* Bottom Decorative Edge */}
              <div className="h-1 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100"></div>
            </div>
            {/* Click outside to close */}
            <div
              className="absolute inset-0 -z-10"
              onClick={() => setSelectedLetter(null)}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};


export default HistoryPage;
