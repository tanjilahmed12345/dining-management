import { jwtDecode } from "jwt-decode"
import type { User, UserRole } from "./schemas"

// Mock function to simulate password hashing
export const hashPassword = (password: string): string => {
  // In a real app, you would use bcrypt here
  return `hashed_${password}`
}

// Mock function to simulate JWT token generation
export const generateToken = (user: Omit<User, "password">): string => {
  // In a real app, you would use a JWT library here
  return btoa(
    JSON.stringify({
      ...user,
      exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    }),
  )
}

// Function to decode JWT token
export const decodeToken = (token: string): (User & { exp: number }) | null => {
  try {
    return jwtDecode(token)
  } catch (error) {
    return null
  }
}

// Function to check if token is expired
export const isTokenExpired = (token: string): boolean => {
  const decoded = decodeToken(token)
  if (!decoded) return true
  return decoded.exp < Date.now()
}

// Function to store token in localStorage
export const storeToken = (token: string): void => {
  localStorage.setItem("auth_token", token)
}

// Function to get token from localStorage
export const getToken = (): string | null => {
  return localStorage.getItem("auth_token")
}

// Function to remove token from localStorage
export const removeToken = (): void => {
  localStorage.removeItem("auth_token")
  localStorage.removeItem("user_role")
}

// Function to store selected role in localStorage
export const storeSelectedRole = (role: UserRole): void => {
  localStorage.setItem("user_role", role)
}

// Function to get selected role from localStorage
export const getSelectedRole = (): UserRole | null => {
  return localStorage.getItem("user_role") as UserRole | null
}

// Mock user database
export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    id: "2",
    name: "Regular User",
    email: "user@example.com",
    role: "user",
  },
]

// Mock function to simulate user registration
export const registerUser = async (userData: Omit<User, "id" | "role"> & { password: string }): Promise<User> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if user already exists
  const existingUser = mockUsers.find((user) => user.email === userData.email)
  if (existingUser) {
    throw new Error("User with this email already exists")
  }

  // Create new user
  const newUser: User = {
    id: Math.random().toString(36).substring(2, 9),
    name: userData.name,
    email: userData.email,
    role: "user", // Default role is user
  }

  // In a real app, you would save the user to a database here

  return newUser
}

// Mock function to simulate user login
export const loginUser = async (credentials: { email: string; password: string }): Promise<{
  user: User
  token: string
}> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Find user by email
  const user = mockUsers.find((user) => user.email === credentials.email)
  if (!user) {
    throw new Error("Invalid email or password")
  }

  // In a real app, you would verify the password hash here

  // Generate token
  const token = generateToken(user)

  return { user, token }
}
