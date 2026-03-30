"use client"

import { useState } from "react"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save } from "lucide-react"
import api from "@/lib/api/client"
import { toast } from "sonner"

interface MealScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

const descriptions: Record<string, string> = {
  "Chicken Roast": "Delicious roasted chicken with herbs, served with roasted vegetables and mashed potatoes",
  "Mutton": "Slow-cooked mutton curry with aromatic spices, served with steamed rice and naan bread",
  "Beef": "Tender beef stew with root vegetables, served with fresh bread and garden salad",
  "Fish": "Grilled fish fillet with lemon butter sauce, served with steamed vegetables and rice pilaf",
}

export function MealScheduleDialog({ open, onOpenChange, onSaved }: MealScheduleDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [mealSchedule, setMealSchedule] = useState<Record<string, string>>({
    Monday: "Chicken Roast",
    Tuesday: "Mutton",
    Wednesday: "Beef",
    Thursday: "Fish",
    Friday: "No meal scheduled",
    Saturday: "No meal scheduled",
    Sunday: "No meal scheduled",
  })

  const saveMealSchedule = async () => {
    setIsSubmitting(true)
    try {
      const today = new Date()
      const promises = Object.entries(mealSchedule)
        .filter(([, mealType]) => mealType !== "No meal scheduled")
        .map(([day, mealType]) => {
          const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
          const targetDayIndex = daysOfWeek.indexOf(day)
          const currentDayIndex = today.getDay()
          let daysUntil = targetDayIndex - currentDayIndex
          if (daysUntil <= 0) daysUntil += 7
          const date = new Date(today)
          date.setDate(today.getDate() + daysUntil)

          return api.post("/api/menus", {
            name: mealType,
            description: descriptions[mealType] || "",
            date: date.toISOString().split("T")[0],
            dayOfWeek: day,
            mealType,
            active: true,
          })
        })

      await Promise.all(promises)
      toast.success("Weekly meal schedule saved successfully.")
      onOpenChange(false)
      onSaved()
    } catch {
      toast.error("Failed to save meal schedule.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Weekly Meal Schedule</DialogTitle>
          <DialogDescription className="text-gray-400">Set the default meal type for each day of the week</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {Object.keys(mealSchedule).map((day) => (
            <div key={day} className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right text-gray-300">{day}</Label>
              <div className="col-span-2">
                <Select value={mealSchedule[day]} onValueChange={(value) => setMealSchedule({ ...mealSchedule, [day]: value })}>
                  <SelectTrigger className="border-gray-600 bg-gray-700 text-gray-200"><SelectValue /></SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                    <SelectItem value="Chicken Roast">Chicken Roast</SelectItem>
                    <SelectItem value="Mutton">Mutton</SelectItem>
                    <SelectItem value="Beef">Beef</SelectItem>
                    <SelectItem value="Fish">Fish</SelectItem>
                    <SelectItem value="No meal scheduled">No meal scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center">
                <Switch checked={mealSchedule[day] !== "No meal scheduled"} disabled />
                <span className="ml-2 text-sm text-gray-400">
                  {mealSchedule[day] !== "No meal scheduled" ? "On" : "Off"}
                </span>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">Cancel</Button>
          <Button onClick={saveMealSchedule} className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
