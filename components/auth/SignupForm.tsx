"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { signupSchema, type SignupFormValues } from "@/lib/auth/schemas"
import { useAuth } from "./AuthContext"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

export function SignupForm() {
    const { signup } = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: { username: "", email: "", password: "", confirmPassword: "" },
    })

    async function onSubmit(values: SignupFormValues) {
        setIsLoading(true)
        try {
            await signup(values.username, values.email, values.password)
            toast.success("Account created! You can now log in.")
            router.push("/auth/login")
        } catch (err: unknown) {
            const message = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
            toast.error(message || "Something went wrong. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card className="w-full bg-gray-800 border-gray-700">
            <CardHeader>
                <CardTitle className="text-2xl text-gray-100">Create Account</CardTitle>
                <CardDescription className="text-gray-400">Enter your information to get started</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" className="border-gray-600 bg-gray-700 text-gray-200 placeholder:text-gray-500" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="john@example.com" className="border-gray-600 bg-gray-700 text-gray-200 placeholder:text-gray-500" {...field} />
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-300">Confirm Password</FormLabel>
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
                                    Creating account...
                                </span>
                            ) : (
                                "Create Account"
                            )}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
                <div className="text-sm text-center text-gray-400">
                    Already have an account?{" "}
                    <Link href="/auth/login" className="text-teal-400 hover:text-teal-300 font-medium">
                        Sign in
                    </Link>
                </div>
            </CardFooter>
        </Card>
    )
}
