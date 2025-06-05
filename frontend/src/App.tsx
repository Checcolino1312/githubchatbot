import { Routes, Route } from "react-router-dom";
import { Chatbot } from 'chatbot-widget';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PrestitoForm from "./components/PrestitoForm";
import LibriInGiro from "./LibriInGiro";
import 'chatbot-widget/dist/Chatbot.css';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/libri-in-giro" element={<LibriInGiro />} />
        <Route path="/registra-prestito" element={<PrestitoForm />} />
      </Routes>
      {/* Chatbot persistente in tutte le pagine */}
      <Chatbot apiUrl="http://localhost:5005" avatarUrl="/chatbot-avatar.png" />
    </div>
  );
}



export default App;