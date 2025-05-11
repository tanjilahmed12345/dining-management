"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "./AuthContext"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { useToast } from "@/components/ui/use-toast"
import { RoleSelectionModal } from "./RoleSelectionModal"
import { toast } from "sonner"
import { LoginFormValues, loginSchema } from "@/lib/auth/schemas"
import axios from "axios"
import { useAtom } from "jotai"
import { currentUserAtom, loginAtom } from "@/store/authSlice"

type LoginResponse = {
  user: {
    username: string;
    email: string;
    role: string;
    // Add other user properties as needed
  };
};


export function LoginForm() {
  
  // const { toast } = useToast()
  const [login, setLogin] = useAtom(loginAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  // const [userInfo, setUserInfo] = useState({});

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true)
    try {
      const response = await axios.post<LoginResponse>('/api/login',data);
      const {user} = response.data
      toast("Login Successfull... Welcome back !")
      setLogin(true);
      
      setCurrentUser(user);
      // If user is admin, show role selection modal
      if (user.role === "admin") {
        setShowRoleModal(true)
      } else {
        setCurrentUser(user);
        // Regular users go directly to dashboard
        router.push("/user/dashboard")
      }
    } catch (error) {
      toast("Invalid email or password. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your credentials to access your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="your.email@example.com" {...field} />
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
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
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
          <div className="text-sm text-center">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-teal-600 hover:text-teal-500 font-medium">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>

      {/* Role Selection Modal */}
      {showRoleModal && <RoleSelectionModal onClose={() => setShowRoleModal(false)} />}
    </>
  )
}
