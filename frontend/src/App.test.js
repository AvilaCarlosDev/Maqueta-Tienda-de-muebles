import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from '@testing-library/react';
import App from './App';
test('renderiza encabezado', () => {
    render(_jsx(App, {}));
    expect(screen.getByText(/Muebles Punto Fijo/i)).toBeInTheDocument();
});
