import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useAuthStore } from './store/useAuthStore';
import { authService } from './services/auth.service';
import { AlertModal } from './components/ui/AlertModal';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuestionPage from './pages/QuestionPage';
import HistoryPage from './pages/HistoryPage';
import FindAccountPage from './pages/FindAccountPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import { Footer } from './components/common/Footer';

function App() {
  const { isAuthenticated, logout, user } = useAuthStore();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isWithdrawing, setIsWithdrawing] = useState(false);
  const [withdrawError, setWithdrawError] = useState('');
  const location = useLocation();

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // 회원 탈퇴: 계정과 모든 답변을 삭제한 뒤 로그인 정보를 지운다.
  // (logout 후에는 라우트 가드가 /login 으로 보낸다.)
  const handleWithdraw = async () => {
    if (!user) return;
    setIsWithdrawing(true);
    try {
      await authService.withdraw(user.id);
      setIsWithdrawOpen(false);
      logout();
    } catch (e) {
      setIsWithdrawOpen(false);
      setWithdrawError(e instanceof Error ? e.message : '회원 탈퇴에 실패했습니다.');
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans flex flex-col">
      {/* Navigation Bar */}
      {isAuthenticated && (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              
              {/* Mobile Menu Button (Left) */}
              <div className="flex items-center md:hidden">
                <button
                  onClick={toggleMenu}
                  className="p-2 -ml-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>

              {/* Logo (Center on mobile, Left on desktop) */}
              <div className="flex-1 flex justify-center md:justify-start md:flex-none">
                <Link
                  to="/question"
                  className="text-xl font-bold font-serif text-gray-900 hover:text-indigo-600 transition-colors"
                >
                  To Me, Later
                </Link>
              </div>

              {/* Desktop Navigation (Center) */}
              <div className="hidden md:flex flex-1 justify-center space-x-8">
                <Link
                  to="/question"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/question' 
                      ? 'text-indigo-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Today
                </Link>

                <Link
                  to="/history"
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/history' 
                      ? 'text-indigo-600' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  My Letters
                </Link>
              </div>

              {/* Desktop Sign Out (Right) */}
              <div className="hidden md:flex items-center">
                <button
                  onClick={() => setIsWithdrawOpen(true)}
                  className="px-3 py-2 rounded-full text-xs font-medium text-gray-400 hover:text-red-500 transition-colors"
                >
                  Delete Account
                </button>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 border border-transparent hover:border-gray-200 transition-all"
                >
                  Sign Out
                </button>
              </div>

              {/* Mobile Spacer (Right) to balance Layout */}
              <div className="w-10 md:hidden"></div> 
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-100 shadow-lg animate-fade-in">
              <div className="px-4 pt-2 pb-4 space-y-1">
                <Link
                  to="/question"
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    location.pathname === '/question'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Today
                </Link>
                <Link
                  to="/history"
                  className={`block px-3 py-3 rounded-md text-base font-medium ${
                    location.pathname === '/history'
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Letters
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 rounded-md text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                >
                  Sign Out
                </button>
                <button
                  onClick={() => {
                    setIsWithdrawOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-3 rounded-md text-sm font-medium text-gray-400 hover:text-red-500 hover:bg-gray-50"
                >
                  Delete Account
                </button>
              </div>
            </div>
          )}
        </nav>
      )}

      <main className="flex-grow">
        <Routes>
          <Route
            path="/login"
            element={
              !isAuthenticated ? <LoginPage /> : <Navigate to="/question" replace />
            }
          />
          <Route
            path="/register"
            element={
              !isAuthenticated ? (
                <RegisterPage />
              ) : (
                <Navigate to="/question" replace />
              )
            }
          />

          <Route
            path="/question"
            element={
              isAuthenticated ? <QuestionPage /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/history"
            element={
              isAuthenticated ? <HistoryPage /> : <Navigate to="/login" replace />
            }
          />
          
          <Route path="/privacy" element={<PrivacyPolicyPage />} />
          
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/question" : "/login"} replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/find-account" element={<FindAccountPage />} />
        </Routes>
      </main>

      <Footer />

      <AlertModal
        isOpen={isWithdrawOpen}
        title="회원 탈퇴"
        message="탈퇴하면 계정과 작성한 모든 답변이 영구적으로 삭제되며 복구할 수 없습니다. 정말 탈퇴하시겠습니까?"
        confirmText="탈퇴하기"
        isConfirming={isWithdrawing}
        onConfirm={handleWithdraw}
        onClose={() => {
          if (!isWithdrawing) setIsWithdrawOpen(false);
        }}
      />
      <AlertModal
        isOpen={!!withdrawError}
        title="회원 탈퇴"
        message={withdrawError}
        onClose={() => setWithdrawError('')}
      />
    </div>
  );
}

export default App;
