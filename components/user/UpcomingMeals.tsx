"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle } from "lucide-react"
import { menuItems } from "@/lib/data"
import { toast } from "sonner"
// import { toast } from "@/components/ui/use-toast"

// Simulating framer-motion for animations
const MotionDiv = ({ children, ...props }) => {
  return (
    <div className="transition-all duration-500 ease-in-out" {...props}>
      {children}
    </div>
  )
}

export function UpcomingMeals({ currentUser, userConfirmations, setUserConfirmations }) {
  // Animation for cards
  const [animatedItems, setAnimatedItems] = useState([])

  useEffect(() => {
    // Simulate staggered animation by adding items one by one
    const timer = setTimeout(() => {
      setAnimatedItems(menuItems.map((item) => item.id))
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Function to toggle confirmation
  const toggleConfirmation = (menuItemId: string, date: string) => {
    setUserConfirmations((prev) => {
      const existing = prev.find((c) => c.menuItemId === menuItemId)

      if (existing) {
        // Toggle existing confirmation
        const newConfirmation = !existing.confirmed
        toast(newConfirmation
            ? "You have confirmed your lunch participation."
            : "You have cancelled your lunch confirmation.",
        )
        return prev.map((c) => (c.menuItemId === menuItemId ? { ...c, confirmed: newConfirmation } : c))
      } else {
        // Create new confirmation
        toast("You have confirmed your lunch participation.")
        return [
          ...prev,
          {
            id: `new-${Date.now()}`,
            userId: currentUser.id,
            menuItemId,
            date,
            confirmed: true,
          },
        ]
      }
    })
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {menuItems.map((menuItem, index) => {
        const confirmation = userConfirmations.find((c) => c.menuItemId === menuItem.id)
        const isConfirmed = confirmation?.confirmed || false
        const isAnimated = animatedItems.includes(menuItem.id)
        const isMealActive = menuItem.active !== false // If active is undefined or true, consider it active

        return (
          <MotionDiv
            key={menuItem.id}
            className={`opacity-${isAnimated ? "100" : "0"} translate-y-${isAnimated ? "0" : "4"}`}
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            <Card
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
          </MotionDiv>
        )
      })}
    </div>
  )
}
