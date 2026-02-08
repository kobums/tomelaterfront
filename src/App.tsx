import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import QuestionPage from './pages/QuestionPage';
import HistoryPage from './pages/HistoryPage';
import FindAccountPage from './pages/FindAccountPage';



function App() {
  const { isAuthenticated, logout } = useAuthStore();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      {/* Navigation Bar */}
      {isAuthenticated && (
        <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link
                  to="/question"
                  className="text-xl font-bold font-serif text-gray-900 hover:text-indigo-600 transition-colors"
                >
                  To Me, Later
                </Link>
                <div className="hidden md:flex space-x-4">
                  <Link
                    to="/question"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Today
                  </Link>

                  <Link
                    to="/history"
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    My Letters
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={logout}
                  className="ml-4 px-4 py-2 rounded-full text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100/50 border border-transparent hover:border-gray-200 transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      <main className="py-6">
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
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/question" : "/login"} replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
          <Route path="/find-account" element={<FindAccountPage />} />
        </Routes>


      </main>
    </div>
  );
}

export default App;
