"use client"

import { useAuth } from "./AuthContext"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/store/authSlice"
import { setAdminCurrentRole } from "@/app/actions/admin.action"


interface RoleSelectionModalProps {
  onClose: () => void
}

export function RoleSelectionModal({ onClose }: RoleSelectionModalProps) {

  const router = useRouter()
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const handleRoleSelect = async (role: "admin" | "user") => {
    setCurrentUser({ ...currentUser, role: role });
    await setAdminCurrentRole({ ...currentUser, role: role });
    onClose()

    if (role === "admin") {
      router.push("/admin/dashboard")
    } else {
      router.push("/user/dashboard")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Select Access Mode</DialogTitle>
          <DialogDescription>Choose how you would like to access the system</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2 hover:bg-teal-50 hover:border-teal-500"
            onClick={() => handleRoleSelect("admin")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-teal-600"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="font-medium">Access as Admin</span>
          </Button>
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2 hover:bg-teal-50 hover:border-teal-500"
            onClick={() => handleRoleSelect("user")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-8 w-8 text-teal-600"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span className="font-medium">Access as User</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
