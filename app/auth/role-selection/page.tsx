"use client"

import { useEffect } from "react"
import { useAuth } from "@/components/auth/AuthContext"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function RoleSelectionPage() {
  const { user, setRole, loading } = useAuth()
  const router = useRouter()

  // Redirect if user is not admin or already loaded
  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-600">Technext Dine</h2>
        <h3 className="mt-2 text-center text-xl font-medium text-gray-900">Choose Access Mode</h3>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-4">
            <p className="text-center text-sm text-gray-600">
              Welcome, {user?.name}. Please select how you would like to access the system.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => setRole("admin")} className="w-full bg-teal-600 hover:bg-teal-700">
                Admin Portal
              </Button>

              <Button onClick={() => setRole("user")} className="w-full bg-gray-600 hover:bg-gray-700">
                User Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
