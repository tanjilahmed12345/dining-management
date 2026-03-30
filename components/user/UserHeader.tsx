"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth/AuthContext"
import { LogOut } from "lucide-react"

export function UserHeader() {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">User Dashboard</h1>
        <p className="text-gray-300">
          {user?.username ? `Welcome back, ${user.username}` : "Your dining overview"}
        </p>
      </div>
      <Button
        onClick={logout}
        className="mt-4 md:mt-0 bg-teal-600 hover:bg-teal-700 text-white border-none transition-colors"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Log Out
      </Button>
    </div>
  )
}
