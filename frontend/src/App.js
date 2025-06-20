import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from "react-router-dom";
import { Chatbot } from 'chatbot-widget';
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import PrestitoForm from "./components/PrestitoForm";
import LibriInGiro from "./LibriInGiro";
import 'chatbot-widget/dist/Chatbot.css';
function App() {
    return (_jsxs("div", { children: [_jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/libri-in-giro", element: _jsx(LibriInGiro, {}) }), _jsx(Route, { path: "/registra-prestito", element: _jsx(PrestitoForm, {}) })] }), _jsx(Chatbot, { apiUrl: "http://localhost:5005", avatarUrl: "/chatbot-avatar.png" })] }));
}
export default App;
