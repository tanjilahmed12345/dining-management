"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "./AuthContext"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RoleSelectionModal } from "./RoleSelectionModal"
import { toast } from "sonner"
import { LoginFormValues, loginSchema } from "@/lib/auth/schemas"
import { useAtom } from "jotai"
import { currentUserAtom, loginAtom } from "@/lib/atoms/auth"
import { Loader2 } from "lucide-react"

export function LoginForm() {
  const { login } = useAuth()
  const [, setLogin] = useAtom(loginAtom)
  const [, setCurrentUser] = useAtom(currentUserAtom)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    try {
      const user = await login(data.email, data.password)
      toast.success("Welcome back!")
      setLogin(true)
      setCurrentUser({ id: user.id, username: user.username, email: user.email, role: user.role })

      if (user.role === "admin") {
        setShowRoleModal(true)
      } else {
        router.push("/user/dashboard")
      }
    } catch {
      toast.error("Invalid email or password.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className="w-full bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-gray-100">Login</CardTitle>
          <CardDescription className="text-gray-400">Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" className="border-gray-600 bg-gray-700 text-gray-200 placeholder:text-gray-500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-300">Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="••••••" className="border-gray-600 bg-gray-700 text-gray-200 placeholder:text-gray-500" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-center text-gray-400">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-teal-400 hover:text-teal-300 font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>

      {showRoleModal && <RoleSelectionModal onClose={() => setShowRoleModal(false)} />}
    </>
  )
}
