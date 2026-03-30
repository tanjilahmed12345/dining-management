"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Plus, Users } from "lucide-react"
import { SpecialEventDialog } from "@/components/admin/dialogs/SpecialEventDialog"
import { useSpecialEvents } from "@/lib/hooks/use-events"
import { CardGridSkeleton } from "@/components/ui/loading-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate } from "@/lib/utils"

const statusBadgeStyles: Record<string, string> = {
  upcoming: "bg-amber-900 text-amber-300 border-amber-700",
  ongoing: "bg-teal-900 text-teal-300 border-teal-700",
  completed: "bg-green-900 text-green-300 border-green-700",
}

export function SpecialEvents() {
  const [specialEventDialogOpen, setSpecialEventDialogOpen] = useState(false)
  const { events, isLoading, refetch } = useSpecialEvents()

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
          {isLoading ? (
            <CardGridSkeleton count={3} />
          ) : events.length === 0 ? (
            <EmptyState
              icon={CalendarDays}
              title="No special events scheduled"
              description="Create a special dining event to get started."
              actionLabel="New Event"
              onAction={() => setSpecialEventDialogOpen(true)}
            />
          ) : (
            <div className="space-y-6">
              {events.map((event) => (
                <div key={event.id} className="border border-gray-700 rounded-lg p-4 bg-gray-800/30 shadow-md">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <Badge className={`${statusBadgeStyles[event.status] || statusBadgeStyles.upcoming} mb-2`}>
                        {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                      </Badge>
                      <h3 className="text-xl font-medium text-gray-100">{event.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">{formatDate(event.date)}</p>
                    </div>
                    <div className="flex items-center gap-2 mt-2 md:mt-0">
                      {event.confirmedCount !== undefined && (
                        <Badge className="bg-gray-700 text-gray-300 border-gray-600">
                          <Users className="h-3 w-3 mr-1" />
                          {event.confirmedCount} confirmed
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-gray-300 mb-4">{event.description}</p>
                  {event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag) => (
                        <Badge key={tag} className="bg-gray-700 text-gray-300 border-gray-600">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <SpecialEventDialog open={specialEventDialogOpen} onOpenChange={setSpecialEventDialogOpen} onSaved={refetch} />
    </>
  )
}
