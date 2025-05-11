"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function UserHeader({ currentUser }) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-100">User Dashboard</h1>
        <p className="text-gray-300">Welcome back, {currentUser.name}</p>
      </div>
      <Link href="/" className="mt-4 md:mt-0">
        <Button className="bg-[#179295] hover:bg-[#0e7c7f] text-white border-none transition-colors">
          {/* <ArrowLeft className="h-4 w-4 mr-2" />  */}
          Log Out
        </Button>
      </Link>
    </div>
  )
}
