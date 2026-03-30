"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserHeader } from "@/components/user/UserHeader"
import { UpcomingMeals } from "@/components/user/UpcomingMeals"
import { UserHistory } from "@/components/user/UserHistory"
import { UserBilling } from "@/components/user/UserBilling"
import { useMenus } from "@/lib/hooks/use-menus"
import { useAuth } from "@/components/auth/AuthContext"
import type { Confirmation } from "@/lib/types"

export default function UserDashboard() {
  useAuth()
  const { menus, isLoading: menusLoading } = useMenus()
  const [userConfirmations, setUserConfirmations] = useState<Confirmation[]>([])
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <UserHeader />

        <Tabs defaultValue="upcoming" className="w-full" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid w-full grid-cols-3 bg-gray-800">
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300"
            >
              Upcoming Meals
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300"
            >
              My History
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300"
            >
              Billing
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <UpcomingMeals
              menus={menus}
              isLoading={menusLoading}
              userConfirmations={userConfirmations}
              setUserConfirmations={setUserConfirmations}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <UserHistory userConfirmations={userConfirmations} isLoading={menusLoading} />
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <UserBilling />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
