import React from 'react'

export default function App() {
  const [apiStatus, setApiStatus] = React.useState<string>('checking...')

  React.useEffect(() => {
    fetch('/api/health')
      .then(r => r.json())
      .then(d => setApiStatus(`${d.status} - ${d.service} v${d.version}`))
      .catch(() => setApiStatus('offline'))
  }, [])

  return (
    <div className="container py-5">
      <header className="mb-4">
        <h1 className="display-5 fw-bold">Muebles Punto Fijo</h1>
        <p className="lead">Catálogo moderno y seguro con Vite + React + TS</p>
        <span className="badge text-bg-secondary">API: {apiStatus}</span>
      </header>
      <main>
        <div className="row g-3">
          <div className="col-12 col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Ejemplo de Producto</h5>
                <p className="card-text">Arquitectura saneada, dependencias actualizadas y sin vulnerabilidades según npm audit.</p>
                <button className="btn btn-primary">Añadir al carrito</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
