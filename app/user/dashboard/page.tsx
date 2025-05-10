"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UserHeader } from "@/components/user/UserHeader"
import { UpcomingMeals } from "@/components/user/UpcomingMeals"
import { UserHistory } from "@/components/user/UserHistory"
import { UserBilling } from "@/components/user/UserBilling"
import { users, confirmations } from "@/lib/data"

export default function UserDashboard() {
  // Mock current user (in a real app, this would come from authentication)
  const currentUser = users[0]

  // State for lunch confirmations
  const [userConfirmations, setUserConfirmations] = useState(confirmations.filter((c) => c.userId === currentUser.id))
  const [activeTab, setActiveTab] = useState("upcoming")

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <UserHeader currentUser={currentUser} />

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
              currentUser={currentUser}
              userConfirmations={userConfirmations}
              setUserConfirmations={setUserConfirmations}
            />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <UserHistory currentUser={currentUser} userConfirmations={userConfirmations} />
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <UserBilling currentUser={currentUser} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
