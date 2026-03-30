"use client"

import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import { currentUserAtom, loginAtom } from "@/lib/atoms/auth"
import { deleteAdminCurrentRole } from "@/app/actions/admin.action"
import { useAuth } from "@/components/auth/AuthContext"

export function AdminHeader() {
  const { logout } = useAuth()
  const [, setLogin] = useAtom(loginAtom)
  const [currentUser] = useAtom(currentUserAtom)

  const userLogOutHandle = async () => {
    setLogin(false)
    await deleteAdminCurrentRole(currentUser)
    await logout()
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">Admin Dashboard</h1>
        <p className="text-gray-300">Manage dining system</p>
      </div>
      <Button
        onClick={userLogOutHandle}
        className="mt-4 md:mt-0 bg-[#179295] hover:bg-[#0e7c7f] text-white border-none transition-colors"
      >
        Log Out
      </Button>
    </div>
  )
}
