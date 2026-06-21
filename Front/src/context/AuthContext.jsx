import { createContext, useContext, useState, useCallback } from 'react'
import { setAuthToken } from '../services/api'

const AuthContext = createContext(null)

// Decodifica el payload del JWT sin librerías externas (solo para mostrar datos).
const decodeToken = (token) => {
  try {
    const payload = token.split('.')[1]
    return JSON.parse(atob(payload))
  } catch {
    return null
  }
}

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [usuario, setUsuario] = useState(null)

  const login = useCallback((nuevoToken) => {
    setAuthToken(nuevoToken)
    setToken(nuevoToken)
    setUsuario(decodeToken(nuevoToken))
  }, [])

  const logout = useCallback(() => {
    setAuthToken(null)
    setToken(null)
    setUsuario(null)
  }, [])

  return (
    <AuthContext.Provider value={{ token, usuario, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
