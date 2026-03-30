"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { History, Star } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { TableSkeleton } from "@/components/ui/loading-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate } from "@/lib/utils"
import type { Confirmation } from "@/lib/types"
import api from "@/lib/api/client"
import { toast } from "sonner"

interface UserHistoryProps {
  userConfirmations: Confirmation[]
  isLoading: boolean
}

export function UserHistory({ userConfirmations, isLoading }: UserHistoryProps) {
  const [mealRatings, setMealRatings] = useState<Record<string, number>>({})
  const [feedback, setFeedback] = useState<Record<string, string>>({})

  const handleRatingChange = (menuItemId: string, rating: number) => {
    setMealRatings({ ...mealRatings, [menuItemId]: rating })
  }

  const handleFeedbackChange = (menuItemId: string, value: string) => {
    setFeedback({ ...feedback, [menuItemId]: value })
  }

  const submitFeedback = async (menuItemId: string) => {
    try {
      await api.post("/api/ratings", {
        menuItemId,
        rating: mealRatings[menuItemId] || 0,
        feedback: feedback[menuItemId] || "",
      })
      toast.success(`Thank you! Rating: ${mealRatings[menuItemId] || 0}/5`)
    } catch {
      toast.error("Failed to submit feedback.")
    }
  }

  if (isLoading) {
    return (
      <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
        <CardHeader className="bg-gray-800/80 border-b border-gray-700">
          <CardTitle className="text-gray-100">My Lunch History</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <TableSkeleton rows={4} cols={4} />
        </CardContent>
      </Card>
    )
  }

  const confirmedMeals = userConfirmations.filter((c) => c.confirmed)

  return (
    <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
      <CardHeader className="bg-gray-800/80 border-b border-gray-700">
        <CardTitle className="text-gray-100">My Lunch History</CardTitle>
        <CardDescription className="text-gray-400">Your past meal confirmations and ratings</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {confirmedMeals.length === 0 ? (
          <EmptyState
            icon={History}
            title="No lunch history"
            description="Your confirmed meals will appear here."
          />
        ) : (
          <div className="space-y-4">
            {confirmedMeals.map((confirmation) => (
              <div
                key={confirmation.id}
                className="border border-gray-700 rounded-lg p-4 bg-gray-800/30 hover:bg-gray-700/30 transition-colors"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="font-medium text-gray-100">Meal on {formatDate(confirmation.date)}</h3>
                    <Badge className="mt-1 bg-green-900 text-green-300 border-green-700">Confirmed</Badge>
                  </div>
                </div>

                <div className="mt-3 space-y-3">
                  <div>
                    <Label className="text-gray-400 text-sm">Rate this meal</Label>
                    <div className="flex items-center gap-1 mt-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => handleRatingChange(confirmation.menuItemId, star)}
                          className="focus:outline-none"
                        >
                          <Star
                            className={`h-5 w-5 cursor-pointer transition-colors ${
                              star <= (mealRatings[confirmation.menuItemId] || 0)
                                ? "text-amber-400 fill-amber-400"
                                : "text-gray-600 hover:text-amber-300"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Textarea
                      placeholder="Share your feedback..."
                      value={feedback[confirmation.menuItemId] || ""}
                      onChange={(e) => handleFeedbackChange(confirmation.menuItemId, e.target.value)}
                      className="border-gray-600 bg-gray-700 text-gray-200 placeholder:text-gray-500 h-20"
                    />
                  </div>

                  <Button
                    size="sm"
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => submitFeedback(confirmation.menuItemId)}
                    disabled={!mealRatings[confirmation.menuItemId]}
                  >
                    Submit Feedback
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
