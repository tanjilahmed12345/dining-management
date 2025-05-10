"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { User, UserRole } from "@/lib/auth/schemas"

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<User>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  setRole: (role: UserRole) => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would validate the token with your backend
        const token = localStorage.getItem("auth_token")
        if (token) {
          // Mock decoding the token to get user info
          // In a real app, you'd verify this token with your backend
          const userData = JSON.parse(localStorage.getItem("user_data") || "{}")
          if (userData && userData.id) {
            setUser(userData)
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error)
        localStorage.removeItem("auth_token")
        localStorage.removeItem("user_data")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<User> => {
    setLoading(true)
    try {
      // In a real app, this would be an API call to your backend
      // Mock login for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check credentials (mock)
      if (email === "admin@example.com" && password === "password") {
        const userData: User = {
          id: "1",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        }

        // Store auth data
        localStorage.setItem("auth_token", "mock_jwt_token")
        localStorage.setItem("user_data", JSON.stringify(userData))

        setUser(userData)
        return userData
      } else if (email === "user@example.com" && password === "password") {
        const userData: User = {
          id: "2",
          name: "Regular User",
          email: "user@example.com",
          role: "user",
        }

        // Store auth data
        localStorage.setItem("auth_token", "mock_jwt_token")
        localStorage.setItem("user_data", JSON.stringify(userData))

        setUser(userData)
        return userData
      } else {
        throw new Error("Invalid credentials")
      }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    setLoading(true)
    try {
      // In a real app, this would be an API call to your backend
      // Mock signup for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check if email already exists (mock)
      if (email === "admin@example.com" || email === "user@example.com") {
        throw new Error("Email already in use")
      }

      // Success - in a real app, the user would be created in your database
      return
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user_data")
    localStorage.removeItem("selected_role")
    setUser(null)
    router.push("/auth/login")
  }

  const setRole = (role: UserRole) => {
    if (user && user.role === "admin") {
      localStorage.setItem("selected_role", role)
      if (role === "admin") {
        router.push("/admin/dashboard")
      } else {
        router.push("/user/dashboard")
      }
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, setRole, loading }}>{children}</AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
