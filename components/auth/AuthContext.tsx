"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import type { UserRole } from "@/lib/auth/schemas"
import axios from "axios"

interface AuthUser {
  id: string
  username: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<AuthUser>
  signup: (username: string, email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setRole: (role: UserRole) => void
  selectedRole: UserRole | null
  isLoading: boolean
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user_data")
      if (userData) {
        const parsed = JSON.parse(userData)
        if (parsed && parsed.email) {
          setUser(parsed)
        }
      }
      const savedRole = localStorage.getItem("selected_role") as UserRole | null
      if (savedRole) {
        setSelectedRole(savedRole)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("user_data")
      localStorage.removeItem("selected_role")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const login = async (email: string, password: string): Promise<AuthUser> => {
    setIsLoading(true)
    try {
      const response = await axios.post("/api/login", { email, password })
      const { user: userData } = response.data

      const authUser: AuthUser = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        role: userData.role,
      }

      localStorage.setItem("user_data", JSON.stringify(authUser))
      setUser(authUser)
      return authUser
    } finally {
      setIsLoading(false)
    }
  }

  const signup = async (username: string, email: string, password: string): Promise<void> => {
    setIsLoading(true)
    try {
      await axios.post("/api/users", { username, email, password })
    } finally {
      setIsLoading(false)
    }
  }

  const logout = async () => {
    try {
      await axios.post("/api/logout")
    } catch (error) {
      console.error("Logout API error:", error)
    }
    localStorage.removeItem("user_data")
    localStorage.removeItem("selected_role")
    setUser(null)
    setSelectedRole(null)
    router.push("/auth/login")
  }

  const setRole = (role: UserRole) => {
    setSelectedRole(role)
    localStorage.setItem("selected_role", role)
    if (role === "admin") {
      router.push("/admin/dashboard")
    } else {
      router.push("/user/dashboard")
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        setRole,
        selectedRole,
        isLoading,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
