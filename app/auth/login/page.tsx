import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-teal-400">Technext Dine</h2>
                <p className="mt-2 text-center text-sm text-gray-400">Dining management for your team</p>
            </div>
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <LoginForm />
            </div>
        </div>
    )
}
