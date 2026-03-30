"use client"

import { useEffect } from "react"
import { useAuth } from "@/components/auth/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield, User } from "lucide-react"

export default function RoleSelectionPage() {
  const { user, setRole, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-400">Technext Dine</h2>
        <h3 className="mt-2 text-center text-xl font-medium text-gray-300">Choose Access Mode</h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 border border-gray-700 py-8 px-6 shadow-lg rounded-lg">
          <p className="text-center text-sm text-gray-400 mb-6">
            Welcome, {user?.username}. Select how you would like to access the system.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => setRole("admin")}
              variant="outline"
              className="h-28 flex flex-col items-center justify-center gap-2 border-gray-600 text-gray-200 hover:bg-teal-900/20 hover:border-teal-500"
            >
              <Shield className="h-8 w-8 text-teal-400" />
              <span className="font-medium">Admin Portal</span>
            </Button>
            <Button
              onClick={() => setRole("user")}
              variant="outline"
              className="h-28 flex flex-col items-center justify-center gap-2 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-500"
            >
              <User className="h-8 w-8 text-gray-400" />
              <span className="font-medium">User Dashboard</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
