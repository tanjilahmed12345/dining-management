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
      // If not authenticated, redirect to login
      if (!isAuthenticated) {
        router.push("/auth/login")
        return
      }

      // If authenticated but no role is selected (admin case)
      if (user?.role === "admin" && !selectedRole) {
        // Stay on the current page, the role selection modal will appear
        return
      }

      // If role is required and user doesn't have it
      if (requiredRole) {
        const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

        if (!selectedRole || !roles.includes(selectedRole)) {
          // Redirect based on the user's actual role
          if (selectedRole === "admin") {
            router.push("/admin/dashboard")
          } else {
            router.push("/user/dashboard")
          }
        }
      }
    }
  }, [isLoading, isAuthenticated, user, selectedRole, requiredRole, router])

  // Show nothing while checking authentication
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>
  }

  // If not authenticated, don't render children
  if (!isAuthenticated) {
    return null
  }

  // If admin without selected role, render children (to show the role selection modal)
  if (user?.role === "admin" && !selectedRole) {
    return <>{children}</>
  }

  // If role is required, check if user has it
  if (requiredRole) {
    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole]

    if (!selectedRole || !roles.includes(selectedRole)) {
      return null
    }
  }

  // Otherwise, render children
  return <>{children}</>
}
