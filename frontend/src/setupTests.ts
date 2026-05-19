import '@testing-library/jest-dom'

Object.defineProperty(globalThis, 'fetch', {
  value: () => Promise.reject(new Error('offline')),
  writable: true,
})
