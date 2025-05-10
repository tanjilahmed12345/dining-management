"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Edit, MessageCircle, Plus, Users } from "lucide-react"
import { SpecialEventDialog } from "@/components/admin/dialogs/SpecialEventDialog"
import { toast } from "sonner"
// import { toast } from "@/components/ui/use-toast"

export function SpecialEvents() {
  const [specialEventDialogOpen, setSpecialEventDialogOpen] = useState(false)

  return (
    <>
      <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between bg-gray-800/80 border-b border-gray-700">
          <div>
            <CardTitle className="text-gray-100">Special Events</CardTitle>
            <CardDescription className="text-gray-400">Plan and manage special dining events</CardDescription>
          </div>
          <Button
            onClick={() => setSpecialEventDialogOpen(true)}
            className="bg-teal-600 hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
          >
            <Plus className="h-4 w-4 mr-2" /> New Event
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/30 shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <Badge className="bg-amber-900 text-amber-300 border-amber-700 mb-2">Upcoming</Badge>
                  <h3 className="text-xl font-medium text-gray-100">Company Anniversary Lunch</h3>
                  <p className="text-sm text-gray-400 mt-1">May 15, 2025</p>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Badge className="bg-gray-700 text-gray-300 border-gray-600">
                    <Users className="h-3 w-3 mr-1" />
                    24 confirmed
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      toast("Reminder has been sent to all participants.")
                    }}
                  >
                    <Bell className="h-3 w-3 mr-1" /> Send Reminder
                  </Button>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Special catered lunch to celebrate our company's 5th anniversary. Premium menu with multiple options.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">Catering</Badge>
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">Special Menu</Badge>
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">All Staff</Badge>
              </div>
            </div>

            <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/30 shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <Badge className="bg-teal-900 text-teal-300 border-teal-700 mb-2">Planning</Badge>
                  <h3 className="text-xl font-medium text-gray-100">Summer Team Building BBQ</h3>
                  <p className="text-sm text-gray-400 mt-1">June 20, 2025</p>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Badge className="bg-gray-700 text-gray-300 border-gray-600">
                    <Users className="h-3 w-3 mr-1" />
                    12 confirmed
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      toast( "Editing Summer Team Building BBQ event.")
                    }}
                  >
                    <Edit className="h-3 w-3 mr-1" /> Edit Event
                  </Button>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Outdoor BBQ lunch for the engineering team. Team building activities included.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">Outdoor</Badge>
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">BBQ</Badge>
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">Engineering Team</Badge>
              </div>
            </div>

            <div className="border border-gray-700 rounded-lg p-4 bg-gray-800/30 shadow-md">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                <div>
                  <Badge className="bg-green-900 text-green-300 border-green-700 mb-2">Completed</Badge>
                  <h3 className="text-xl font-medium text-gray-100">New Product Launch Celebration</h3>
                  <p className="text-sm text-gray-400 mt-1">April 10, 2025</p>
                </div>
                <div className="flex items-center gap-2 mt-2 md:mt-0">
                  <Badge className="bg-gray-700 text-gray-300 border-gray-600">
                    <Users className="h-3 w-3 mr-1" />
                    32 attended
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => {
                      toast( "Viewing feedback for Product Launch event.")
                    }}
                  >
                    <MessageCircle className="h-3 w-3 mr-1" /> View Feedback
                  </Button>
                </div>
              </div>
              <p className="text-gray-300 mb-4">
                Celebration lunch for the successful launch of our new product line. Catered with premium options.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">Product Launch</Badge>
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">Catering</Badge>
                <Badge className="bg-gray-700 text-gray-300 border-gray-600">All Staff</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <SpecialEventDialog open={specialEventDialogOpen} onOpenChange={setSpecialEventDialogOpen} />
    </>
  )
}
