import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
export default function App() {
    const [apiStatus, setApiStatus] = React.useState('checking...');
    React.useEffect(() => {
        fetch('/api/health')
            .then(r => r.json())
            .then(d => setApiStatus(`${d.status} - ${d.service} v${d.version}`))
            .catch(() => setApiStatus('offline'));
    }, []);
    return (_jsxs("div", { className: "container py-5", children: [_jsxs("header", { className: "mb-4", children: [_jsx("h1", { className: "display-5 fw-bold", children: "Muebles Punto Fijo" }), _jsx("p", { className: "lead", children: "Cat\u00E1logo moderno y seguro con Vite + React + TS" }), _jsxs("span", { className: "badge text-bg-secondary", children: ["API: ", apiStatus] })] }), _jsx("main", { children: _jsx("div", { className: "row g-3", children: _jsx("div", { className: "col-12 col-md-6 col-lg-4", children: _jsx("div", { className: "card h-100 shadow-sm", children: _jsxs("div", { className: "card-body", children: [_jsx("h5", { className: "card-title", children: "Ejemplo de Producto" }), _jsx("p", { className: "card-text", children: "Arquitectura saneada, dependencias actualizadas y sin vulnerabilidades seg\u00FAn npm audit." }), _jsx("button", { className: "btn btn-primary", children: "A\u00F1adir al carrito" })] }) }) }) }) })] }));
}
