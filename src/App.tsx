import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
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
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wedding/new" element={<WeddingForm />} />
        <Route path="/wedding/:id" element={<WeddingPage />} />
        <Route path="/funeral/new" element={<FuneralForm />} />
        <Route path="/funeral/:id" element={<FuneralPage />} />
        <Route path="/my-events" element={<EventManager />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
