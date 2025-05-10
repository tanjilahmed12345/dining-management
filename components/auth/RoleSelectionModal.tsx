"use client"

import { useAuth } from "./AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function RoleSelectionModal() {
  const { selectRole, user } = useAuth()

  if (!user || user.role !== "admin") {
    return null
  }

  return (
    <Card className="w-[350px] shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Select Access Mode</CardTitle>
        <CardDescription>You have admin privileges. Choose how you want to access the system.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          You can switch between modes at any time by logging out and back in.
        </p>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full" variant="default" onClick={() => selectRole("admin")}>
          Access as Admin
        </Button>
        <Button className="w-full" variant="outline" onClick={() => selectRole("user")}>
          Access as User
        </Button>
      </CardFooter>
    </Card>
  )
}
