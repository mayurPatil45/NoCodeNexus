import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation
} from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { Loader2 } from 'lucide-react';

// Import Components
import Header from './layout/Header';
import Footer from './layout/Footer';
import Sidebar from './layout/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import JSONLogicBuilder from './pages/JSONLogicBuilder';
import DBQueryGenerator from './pages/DBQueryGenerator';
import LoanEligibilityBuilder from './pages/LoanEligibilityBuilder';
import NotFound from './pages/NotFound';

// Loading Component
const LoadingSpinner = () => (
  <div className="h-screen w-full flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin" />
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    // Save the attempted URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 ml-64 p-4">
        {children}
      </main>
    </div>
  );
};

// Public Route Component
const PublicRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated && ['/login', '/signup', '/register'].includes(location.pathname)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

// Layout Wrapper Component
const LayoutWrapper = ({ children }) => {
  const location = useLocation();
  const noLayoutRoutes = ['/login', '/signup', '/register'];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col bg-customBg">
      {!hideLayout && <Header />}
      {children}
      {!hideLayout && <Footer />}
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <LayoutWrapper>
            <Routes>
              {/* Public Routes */}
              <Route
                path="/"
                element={
                  <PublicRoute>
                    <Home />
                  </PublicRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <PublicRoute>
                    <About />
                  </PublicRoute>
                }
              />
              <Route
                path="/login"
                element={
                  <PublicRoute>
                    <Login />
                  </PublicRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route
                path="/register"
                element={
                  <PublicRoute>
                    <Register />
                  </PublicRoute>
                }
              />

              {/* Protected Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/jsonbuilder"
                element={
                  <ProtectedRoute>
                    <JSONLogicBuilder />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dbquerygenerator"
                element={
                  <ProtectedRoute>
                    <DBQueryGenerator />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/loan"
                element={
                  <ProtectedRoute>
                    <LoanEligibilityBuilder />
                  </ProtectedRoute>
                }
              />

              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </LayoutWrapper>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;