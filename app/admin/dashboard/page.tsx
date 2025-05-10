"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AdminHeader } from "@/components/admin/AdminHeader"
import { MenuManagement } from "@/components/admin/MenuManagement"
import { ParticipantsManagement } from "@/components/admin/ParticipantsManagement"
import { HistoryView } from "@/components/admin/HistoryView"
import { BillingManagement } from "@/components/admin/BillingManagement"
import { SpecialEvents } from "@/components/admin/SpecialEvents"
import { AccountsManagement } from "@/components/admin/AccountsManagement"
import { menuItems } from "@/lib/data"

export default function AdminDashboard() {
  // State for menu items - shared across components
  const [menus, setMenus] = useState(menuItems)

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <AdminHeader />

        <Tabs defaultValue="menu" className="w-full">
          <TabsList className="grid w-full grid-cols-6 bg-gray-800">
            <TabsTrigger
              value="menu"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300"
            >
              Menu Management
            </TabsTrigger>
            <TabsTrigger
              value="participants"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300"
            >
              Participants
            </TabsTrigger>
            <TabsTrigger
              value="history"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300"
            >
              History
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300"
            >
              Billing
            </TabsTrigger>
            <TabsTrigger
              value="events"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300"
            >
              Special Events
            </TabsTrigger>
            <TabsTrigger
              value="accounts"
              className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300"
            >
              Accounts
            </TabsTrigger>
          </TabsList>

          <TabsContent value="menu" className="mt-6">
            <MenuManagement menus={menus} setMenus={setMenus} />
          </TabsContent>

          <TabsContent value="participants" className="mt-6">
            <ParticipantsManagement menus={menus} />
          </TabsContent>

          <TabsContent value="history" className="mt-6">
            <HistoryView menus={menus} />
          </TabsContent>

          <TabsContent value="billing" className="mt-6">
            <BillingManagement />
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <SpecialEvents />
          </TabsContent>

          <TabsContent value="accounts" className="mt-6">
            <AccountsManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
