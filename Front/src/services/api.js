import axios from 'axios'

// baseURL relativa: en dev pasa por el proxy de Vite (ver vite.config.js),
// evitando CORS. Funciona sin importar el puerto en que arranque Vite.
const API = axios.create({ baseURL: '/api' })

// El token vive en el AuthContext (React state), NO en localStorage.
// AuthContext llama a setAuthToken() para inyectarlo en cada petición.
let authToken = null

export const setAuthToken = (token) => {
  authToken = token
}

API.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`
  }
  return config
})

export default API
