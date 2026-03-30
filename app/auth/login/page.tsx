import { LoginForm } from "@/components/auth/LoginForm"
import { UtensilsCrossed } from "lucide-react"

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-teal-600/20 p-3 rounded-full">
                        <UtensilsCrossed className="h-10 w-10 text-teal-400" />
                    </div>
                </div>
                <h1 className="text-3xl font-extrabold text-teal-400">Technext Dine</h1>
                <p className="mt-1 text-sm text-gray-400">Dining management for your team</p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
                <LoginForm />
            </div>
        </div>
    )
}
