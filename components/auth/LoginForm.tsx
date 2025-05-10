"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { loginSchema, type LoginFormValues } from "@/lib/auth/schemas"
import { useAuth } from "./AuthContext"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
// import { toast } from "@/components/ui/use-toast"

export function LoginForm() {
  const { login } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true)
    try {
      const user = await login(values.email, values.password)

      toast(`Welcome back, ${user.name}!`)

      // Redirect based on user role
      if (user.role === "admin") {
        // Admin users will see the role selection modal
        // The modal will handle redirection
      } else {
        // Regular users go straight to the user dashboard
        router.push("/user/dashboard")
      }
    } catch (error) {
      toast( "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-md space-y-6 p-6 bg-white rounded-lg shadow-md">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome Back</h1>
        <p className="text-gray-500">Enter your credentials to access your account</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="john@example.com" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-end">
            <Link href="#" className="text-sm font-medium text-teal-600 hover:text-teal-500">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>
      </Form>
      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link href="/auth/signup" className="font-medium text-teal-600 hover:text-teal-500">
          Create an account
        </Link>
      </div>
    </div>
  )
}
