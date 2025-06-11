import { Routes, Route } from 'react-router-dom';
import { Chatbot } from 'chatbot-widget';
import Navbar from './components/Navbar';
import Home from './components/Home';
import PrestitoForm from './components/PrestitoForm';
import LibriInGiro from './LibriInGiro';
import AdminLogin from './components/AdminLogin';
import ProtectedRoute from './context/ProtectedRoute';
import 'chatbot-widget/dist/Chatbot.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/libri-in-giro"
          element={
            <ProtectedRoute>
              <LibriInGiro />
            </ProtectedRoute>
          }
        />
        <Route
          path="/registra-prestito"
          element={
            <ProtectedRoute>
              <PrestitoForm />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* Chatbot persistente in tutte le pagine */}
      <Chatbot apiUrl="http://localhost:5005" avatarUrl="/chatbot-avatar.png" />
    </div>
  );
}



export default App;