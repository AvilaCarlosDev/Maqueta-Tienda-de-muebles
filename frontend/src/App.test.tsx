import { render, screen } from '@testing-library/react'
import App from './App'

test('renderiza encabezado', () => {
  render(<App />)
  expect(screen.getByText(/Muebles Punto Fijo/i)).toBeInTheDocument()
})
