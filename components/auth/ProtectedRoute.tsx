"use client"

import type React from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./AuthContext"
import type { UserRole } from "@/lib/auth/schemas"

interface ProtectedRouteProps {
  children: React.ReactNode
  requiredRole?: UserRole | UserRole[]
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, selectedRole, isLoading, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/auth/login")
        return
      }
      if (user?.role === "admin" && !selectedRole) {
        return
      }
      if (requiredRole) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
        if (!selectedRole || !roles.includes(selectedRole)) {
          if (selectedRole === "admin") {
            router.push("/admin/dashboard")
          } else {
            router.push("/user/dashboard")
          }
        }
      }
    }
  }, [isLoading, isAuthenticated, user, selectedRole, requiredRole, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  if (!isAuthenticated) return null
  if (user?.role === "admin" && !selectedRole) return <>{children}</>

  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]
    if (!selectedRole || !roles.includes(selectedRole)) return null
  }

  return <>{children}</>
}
