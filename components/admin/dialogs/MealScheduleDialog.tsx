"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Save } from "lucide-react"
import type { MenuItem } from "@/lib/types"
import { toast } from "sonner"

interface MealScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  setMenus: React.Dispatch<React.SetStateAction<MenuItem[]>>
}

export function MealScheduleDialog({ open, onOpenChange, setMenus }: MealScheduleDialogProps) {
  const [mealSchedule, setMealSchedule] = useState<Record<string, string>>({
    Monday: "Chicken Roast",
    Tuesday: "Mutton",
    Wednesday: "Beef",
    Thursday: "Fish",
    Friday: "No meal scheduled",
    Saturday: "No meal scheduled",
    Sunday: "No meal scheduled",
  })

  const saveMealSchedule = () => {
    onOpenChange(false)

    setMenus((prev) =>
      prev.map((menu) => {
        if (menu.dayOfWeek && mealSchedule[menu.dayOfWeek]) {
          const isDefaultMenu = [
            "Chicken Roast",
            "Mutton",
            "Beef",
            "Fish",
            "No meal scheduled",
            "Weekend - No Meal",
          ].includes(menu.name)

          if (isDefaultMenu) {
            const newMealType = mealSchedule[menu.dayOfWeek]
            let newDescription = ""

            switch (newMealType) {
              case "Chicken Roast":
                newDescription =
                  "Delicious roasted chicken with herbs, served with roasted vegetables and mashed potatoes"
                break
              case "Mutton":
                newDescription =
                  "Slow-cooked mutton curry with aromatic spices, served with steamed rice and naan bread"
                break
              case "Beef":
                newDescription = "Tender beef stew with root vegetables, served with fresh bread and garden salad"
                break
              case "Fish":
                newDescription =
                  "Grilled fish fillet with lemon butter sauce, served with steamed vegetables and rice pilaf"
                break
              default:
                newDescription = "No meal scheduled for this day"
            }

            return {
              ...menu,
              name: newMealType === "No meal scheduled" ? `${menu.dayOfWeek} - No Meal` : newMealType,
              description: newDescription,
              mealType: newMealType,
            }
          }
        }
        return menu
      }),
    )

    toast("The weekly meal schedule has been updated successfully.")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Weekly Meal Schedule</DialogTitle>
          <DialogDescription className="text-gray-400">
            Set the default meal type for each day of the week
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {Object.keys(mealSchedule).map((day) => (
            <div key={day} className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={`meal-${day}`} className="text-right text-gray-300">
                {day}
              </Label>
              <div className="col-span-2">
                <Select
                  value={mealSchedule[day]}
                  onValueChange={(value) => setMealSchedule({ ...mealSchedule, [day]: value })}
                >
                  <SelectTrigger id={`meal-${day}`} className="border-gray-600 bg-gray-700 text-gray-200">
                    <SelectValue placeholder="Select meal type" />
                  </SelectTrigger>
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
                <Switch
                  id={`active-${day}`}
                  checked={mealSchedule[day] !== "No meal scheduled"}
                  disabled={mealSchedule[day] === "No meal scheduled"}
                />
                <span className="ml-2 text-sm text-gray-400">
                  {mealSchedule[day] !== "No meal scheduled" ? "On" : "Off"}
                </span>
              </div>
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button onClick={saveMealSchedule} className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-2" />
            Save Schedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
