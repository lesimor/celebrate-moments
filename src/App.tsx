import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { HomePageCalm } from './pages/HomePageCalm';
import { WeddingPage } from './pages/WeddingPage';
import { FuneralPage } from './pages/FuneralPage';
import { WeddingForm } from './pages/WeddingForm';
import { FuneralForm } from './pages/FuneralForm';
import { EventManager } from './pages/EventManager';
import { LoginPage } from './pages/LoginPage';
import './styles/index.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePageCalm />} />
          <Route path="/wedding/:id" element={<WeddingPage />} />
          <Route path="/funeral/:id" element={<FuneralPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected Routes */}
          <Route path="/wedding/new" element={
            <ProtectedRoute>
              <WeddingForm />
            </ProtectedRoute>
          } />
          <Route path="/wedding/edit/:id" element={
            <ProtectedRoute>
              <WeddingForm />
            </ProtectedRoute>
          } />
          <Route path="/funeral/new" element={
            <ProtectedRoute>
              <FuneralForm />
            </ProtectedRoute>
          } />
          <Route path="/funeral/edit/:id" element={
            <ProtectedRoute>
              <FuneralForm />
            </ProtectedRoute>
          } />
          <Route path="/my-events" element={
            <ProtectedRoute>
              <EventManager />
            </ProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
