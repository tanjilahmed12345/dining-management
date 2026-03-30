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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save } from "lucide-react"
import { toast } from "sonner"

interface SpecialEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SpecialEventDialog({ open, onOpenChange }: SpecialEventDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, setFormState] = useState({
    name: "",
    date: "",
    type: "",
    description: "",
    participants: "",
  })

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // TODO: Replace with API call
      onOpenChange(false)
      toast("The special event has been created successfully.")
      setFormState({ name: "", date: "", type: "", description: "", participants: "" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Create Special Event</DialogTitle>
          <DialogDescription className="text-gray-400">
            Plan a special dining event for your organization
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-name" className="text-right text-gray-300">
              Event Name
            </Label>
            <Input
              id="event-name"
              placeholder="Enter event name"
              value={formState.name}
              onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-date" className="text-right text-gray-300">
              Date
            </Label>
            <Input
              id="event-date"
              type="date"
              value={formState.date}
              onChange={(e) => setFormState({ ...formState, date: e.target.value })}
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-type" className="text-right text-gray-300">
              Event Type
            </Label>
            <Select
              value={formState.type}
              onValueChange={(value) => setFormState({ ...formState, type: value })}
            >
              <SelectTrigger id="event-type" className="col-span-3 border-gray-600 bg-gray-700 text-gray-200">
                <SelectValue placeholder="Select event type" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectItem value="celebration">Celebration</SelectItem>
                <SelectItem value="team-building">Team Building</SelectItem>
                <SelectItem value="holiday">Holiday</SelectItem>
                <SelectItem value="product-launch">Product Launch</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-description" className="text-right text-gray-300">
              Description
            </Label>
            <Textarea
              id="event-description"
              placeholder="Describe the event"
              value={formState.description}
              onChange={(e) => setFormState({ ...formState, description: e.target.value })}
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="event-participants" className="text-right text-gray-300">
              Participants
            </Label>
            <Select
              value={formState.participants}
              onValueChange={(value) => setFormState({ ...formState, participants: value })}
            >
              <SelectTrigger id="event-participants" className="col-span-3 border-gray-600 bg-gray-700 text-gray-200">
                <SelectValue placeholder="Select participants" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectItem value="all">All Staff</SelectItem>
                <SelectItem value="engineering">Engineering Team</SelectItem>
                <SelectItem value="marketing">Marketing Team</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="custom">Custom Selection</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            className="bg-teal-600 hover:bg-teal-700"
            onClick={handleSubmit}
            disabled={!formState.name || !formState.date || isSubmitting}
          >
            {isSubmitting ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
