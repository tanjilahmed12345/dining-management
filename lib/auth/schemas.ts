import { z } from "zod"

// User signup schema
export const signupSchema = z
    .object({
        username: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(3, "Password must be at least 3 characters"),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    })

// User login schema
export const loginSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(1, "Password is required"),
})

// Types derived from schemas
export type SignupFormValues = z.infer<typeof signupSchema>
export type LoginFormValues = z.infer<typeof loginSchema>

// User role type
export type UserRole = "user" | "admin"

// User type
export type User = {
    id: string
    name: string
    email: string
    role: UserRole
}
