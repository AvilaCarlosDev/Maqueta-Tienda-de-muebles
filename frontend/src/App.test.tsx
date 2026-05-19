import { render, screen } from '@testing-library/react'
import App from './App'

test('renderiza encabezado', async () => {
  render(<App />)
  expect(screen.getByText(/Muebles Punto Fijo/i)).toBeInTheDocument()
  expect(await screen.findByText(/API: offline/i)).toBeInTheDocument()
})
