"use client"

import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAtom } from "jotai"
import { currentUserAtom } from "@/lib/atoms/auth"
import { setAdminCurrentRole } from "@/app/actions/admin.action"
import { Shield, User } from "lucide-react"

interface RoleSelectionModalProps {
  onClose: () => void
}

export function RoleSelectionModal({ onClose }: RoleSelectionModalProps) {
  const router = useRouter()
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom)

  const handleRoleSelect = async (role: "admin" | "user") => {
    setCurrentUser({ ...currentUser, role })
    await setAdminCurrentRole({ ...currentUser, role })
    onClose()

    if (role === "admin") {
      router.push("/admin/dashboard")
    } else {
      router.push("/user/dashboard")
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-100">Select Access Mode</DialogTitle>
          <DialogDescription className="text-gray-400">Choose how you would like to access the system</DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2 border-gray-600 text-gray-200 hover:bg-teal-900/20 hover:border-teal-500"
            onClick={() => handleRoleSelect("admin")}
          >
            <Shield className="h-8 w-8 text-teal-400" />
            <span className="font-medium">Access as Admin</span>
          </Button>
          <Button
            variant="outline"
            className="h-32 flex flex-col items-center justify-center gap-2 border-gray-600 text-gray-200 hover:bg-gray-700 hover:border-gray-500"
            onClick={() => handleRoleSelect("user")}
          >
            <User className="h-8 w-8 text-gray-400" />
            <span className="font-medium">Access as User</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
