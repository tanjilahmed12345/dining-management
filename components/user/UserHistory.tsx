"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle, MessageCircle, Star } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
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

export function UserHistory({ currentUser, userConfirmations }) {
  const [mealRatings, setMealRatings] = useState({})
  const [feedback, setFeedback] = useState({})

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Check if a date is current or past
  const isCurrentOrPastDate = (dateString) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const itemDate = new Date(dateString)
    return itemDate <= today
  }

  // Handle rating change
  const handleRatingChange = (menuItemId, rating) => {
    setMealRatings({
      ...mealRatings,
      [menuItemId]: rating,
    })
  }

  // Handle feedback change
  const handleFeedbackChange = (menuItemId, value) => {
    setFeedback({
      ...feedback,
      [menuItemId]: value,
    })
  }

  // Submit rating and feedback
  const submitFeedback = (menuItemId) => {
    // In a real app, this would send data to the server
    toast( `Thank you for your feedback! Your rating: ${mealRatings[menuItemId] || 0}/5`,
    )
  }

  return (
    <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
      <CardHeader className="bg-gray-800/80 border-b border-gray-700">
        <CardTitle className="text-gray-100">My Lunch History</CardTitle>
        <CardDescription className="text-gray-400">Your past meal confirmations and ratings</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {userConfirmations.length > 0 ? (
            userConfirmations.map((confirmation, index) => {
              const menuItem = menuItems.find((m) => m.id === confirmation.menuItemId)
              if (!menuItem) return null

              // Only show rating for current or past dates
              const canRate = isCurrentOrPastDate(menuItem.date)

              return (
                <MotionDiv
                  key={confirmation.id}
                  className="opacity-100"
                  style={{
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="border border-gray-700 rounded-lg p-4 hover:bg-gray-700/30 transition-colors duration-200">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium text-gray-100">{menuItem.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(menuItem.date)}</span>
                        </div>
                      </div>
                      <Badge
                        className={
                          confirmation.confirmed
                            ? "bg-green-900 text-green-300 border-green-700"
                            : "bg-gray-700 text-gray-300 border-gray-600"
                        }
                      >
                        {confirmation.confirmed ? (
                          <>
                            <CheckCircle className="h-3 w-3 mr-1" /> Confirmed
                          </>
                        ) : (
                          "Cancelled"
                        )}
                      </Badge>
                    </div>

                    {/* Rating and feedback section - only for confirmed meals on current or past dates */}
                    {confirmation.confirmed && canRate && (
                      <div className="mt-4 pt-3 border-t border-gray-700">
                        <div className="flex flex-col md:flex-row gap-4">
                          {/* Star rating */}
                          <div className="flex-1">
                            <Label className="text-gray-300 flex items-center mb-2">
                              <Star className="h-4 w-4 mr-1 text-amber-400" /> Rate this meal
                            </Label>
                            <div className="flex items-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  key={star}
                                  type="button"
                                  onClick={() => handleRatingChange(menuItem.id, star)}
                                  className="focus:outline-none"
                                >
                                  <Star
                                    className={`h-6 w-6 ${
                                      star <= (mealRatings[menuItem.id] || 0)
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-gray-600"
                                    } hover:text-amber-300 transition-colors`}
                                  />
                                </button>
                              ))}
                              <span className="ml-2 text-amber-400 font-medium">{mealRatings[menuItem.id] || 0}/5</span>
                            </div>
                          </div>

                          {/* Feedback */}
                          <div className="flex-1">
                            <Label className="text-gray-300 flex items-center mb-2">
                              <MessageCircle className="h-4 w-4 mr-1 text-teal-400" /> Feedback
                            </Label>
                            <Textarea
                              placeholder="Share your thoughts about this meal..."
                              value={feedback[menuItem.id] || ""}
                              onChange={(e) => handleFeedbackChange(menuItem.id, e.target.value)}
                              className="bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-500 mb-2"
                            />
                          </div>
                        </div>

                        {/* Submit button */}
                        <Button
                          className="mt-2 bg-teal-600 hover:bg-teal-700 w-full md:w-auto"
                          onClick={() => submitFeedback(menuItem.id)}
                        >
                          Submit Feedback
                        </Button>
                      </div>
                    )}
                  </div>
                </MotionDiv>
              )
            })
          ) : (
            <p className="text-gray-400 text-center py-8">No lunch history available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
