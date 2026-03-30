"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, UtensilsCrossed } from "lucide-react"
import { CardGridSkeleton } from "@/components/ui/loading-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate } from "@/lib/utils"
import type { MenuItem, Confirmation } from "@/lib/types"
import { toast } from "sonner"

interface UpcomingMealsProps {
  menus: MenuItem[]
  isLoading: boolean
  userConfirmations: Confirmation[]
  setUserConfirmations: React.Dispatch<React.SetStateAction<Confirmation[]>>
}

export function UpcomingMeals({ menus, isLoading, userConfirmations, setUserConfirmations }: UpcomingMealsProps) {

  const toggleConfirmation = (menuItemId: string, date: string) => {
    setUserConfirmations((prev) => {
      const existing = prev.find((c) => c.menuItemId === menuItemId)

      if (existing) {
        const newConfirmed = !existing.confirmed
        toast(newConfirmed ? "Lunch confirmed!" : "Confirmation cancelled.")
        return prev.map((c) => (c.menuItemId === menuItemId ? { ...c, confirmed: newConfirmed } : c))
      } else {
        toast("Lunch confirmed!")
        return [
          ...prev,
          {
            id: `new-${Date.now()}`,
            userId: "",
            menuItemId,
            date,
            confirmed: true,
          },
        ]
      }
    })
  }

  if (isLoading) {
    return <CardGridSkeleton count={6} />
  }

  if (menus.length === 0) {
    return (
      <EmptyState
        icon={UtensilsCrossed}
        title="No upcoming meals"
        description="Upcoming meal schedules will appear here once menus are published."
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menus.map((menuItem) => {
        const confirmation = userConfirmations.find((c) => c.menuItemId === menuItem.id)
        const isConfirmed = confirmation?.confirmed || false
        const isMealActive = menuItem.active !== false

        return (
          <Card
            key={menuItem.id}
            className={`${isConfirmed ? "border-green-600 bg-gray-800/80" : "border-gray-700 bg-gray-800/50"}
              shadow-lg hover:shadow-xl transition-all duration-300`}
          >
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-gray-100">{menuItem.name}</CardTitle>
                <div className="flex items-center gap-2">
                  {!isMealActive && <Badge className="bg-red-900 text-red-300 border-red-700">Meal Off</Badge>}
                  {isConfirmed && (
                    <Badge className="bg-green-900 text-green-300 border-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" /> Confirmed
                    </Badge>
                  )}
                </div>
              </div>
              <CardDescription className="flex items-center gap-1 text-gray-400">
                <Calendar className="h-3 w-3" />
                {formatDate(menuItem.date)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">{menuItem.description}</p>
            </CardContent>
            <CardFooter>
              <Button
                variant={isConfirmed ? "outline" : "default"}
                className={
                  isConfirmed
                    ? "w-full border-green-600 text-green-400 hover:bg-green-900/20"
                    : "w-full bg-teal-600 hover:bg-teal-700 text-white"
                }
                onClick={() => toggleConfirmation(menuItem.id, menuItem.date)}
                disabled={!isMealActive}
              >
                {isConfirmed ? "Cancel Confirmation" : "Confirm Lunch"}
              </Button>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}
