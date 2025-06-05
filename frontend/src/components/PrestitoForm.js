import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useCreaPrestitoMutation } from "../services/prestitoApi";
import { Box, Button, TextField, Typography, IconButton, Stack, } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
const PrestitoForm = () => {
    const [creaPrestito, { isLoading, isError }] = useCreaPrestitoMutation();
    const [utente, setUtente] = useState({
        nome: "",
        cognome: "",
        indirizzo: "",
        cellulare: "",
        email: "",
        nomeVolontario: "",
    });
    const [libri, setLibri] = useState([
        { titolo: "", autore: "", numeroInventario: "", collocazione: "" },
    ]);
    const handleUtenteChange = (e) => {
        setUtente({ ...utente, [e.target.name]: e.target.value });
    };
    const handleLibroChange = (index, e) => {
        const nuoviLibri = [...libri];
        nuoviLibri[index][e.target.name] = e.target.value;
        setLibri(nuoviLibri);
    };
    const aggiungiLibro = () => {
        setLibri([...libri, { titolo: "", autore: "", numeroInventario: "", collocazione: "" }]);
    };
    const rimuoviLibro = (index) => {
        const nuoviLibri = libri.filter((_, i) => i !== index);
        setLibri(nuoviLibri);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = { ...utente, libri };
        try {
            const blob = await creaPrestito(payload).unwrap();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `prestito_${utente.nome}_${utente.cognome}.pdf`;
            document.body.appendChild(link);
            link.click();
            link.remove();
        }
        catch (err) {
            if (typeof err === "object" &&
                err !== null &&
                "data" in err &&
                err.data instanceof Blob) {
                const blob = err.data;
                blob.text().then((text) => console.error("❌ Errore dal backend:", text));
            }
            else {
                console.error("⚠️ Errore sconosciuto:", err);
            }
        }
    };
    return (_jsxs(Box, { component: "form", onSubmit: handleSubmit, sx: { maxWidth: 600, m: '2rem auto', p: 2 }, children: [_jsx(Typography, { variant: "h5", textAlign: "center", mb: 2, children: "Registra un Prestito" }), _jsxs(Box, { component: "fieldset", sx: { border: 'none', p: 0, mb: 2 }, children: [_jsx(Typography, { component: "legend", variant: "subtitle1", mb: 1, children: "Dati Utente" }), _jsx(Stack, { spacing: 2, children: Object.entries(utente).map(([key, value]) => (_jsx(TextField, { label: key, id: key, name: key, value: value, onChange: handleUtenteChange, required: true }, key))) })] }), _jsxs(Box, { component: "fieldset", sx: { border: 'none', p: 0, mb: 2 }, children: [_jsx(Typography, { component: "legend", variant: "subtitle1", mb: 1, children: "Libri" }), _jsxs(Stack, { spacing: 2, children: [libri.map((libro, index) => (_jsxs(Box, { sx: { border: '1px solid', p: 2, borderRadius: 1 }, children: [_jsxs(Typography, { variant: "subtitle2", mb: 1, children: ["Libro ", index + 1] }), _jsx(Stack, { spacing: 2, children: Object.entries(libro).map(([key, value]) => (_jsx(TextField, { label: key, id: `${key}-${index}`, name: key, value: value, onChange: (e) => handleLibroChange(index, e), required: true }, key))) }), libri.length > 1 && (_jsx(IconButton, { onClick: () => rimuoviLibro(index), color: "error", sx: { mt: 1 }, children: _jsx(DeleteIcon, {}) }))] }, index))), _jsx(Button, { type: "button", onClick: aggiungiLibro, startIcon: _jsx("span", { children: "\u2795" }), sx: { mt: 1 }, children: "Aggiungi Libro" })] })] }), _jsx(Button, { type: "submit", variant: "contained", disabled: isLoading, fullWidth: true, children: isLoading ? 'Invio in corso...' : 'Salva e Scarica PDF' }), isError && (_jsx(Typography, { color: "error", textAlign: "center", mt: 2, children: "Errore durante il salvataggio." }))] }));
};
export default PrestitoForm;
