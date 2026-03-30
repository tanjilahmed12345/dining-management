"use client"

import { useState } from "react"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save } from "lucide-react"
import api from "@/lib/api/client"
import { toast } from "sonner"

interface SpecialEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function SpecialEventDialog({ open, onOpenChange, onSaved }: SpecialEventDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    name: "", date: "", type: "", description: "", participants: "",
  })

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await api.post("/api/special-events", {
        name: form.name,
        date: form.date,
        type: form.type,
        description: form.description,
        tags: form.participants ? [form.participants] : [],
      })
      toast.success("Special event created successfully.")
      setForm({ name: "", date: "", type: "", description: "", participants: "" })
      onOpenChange(false)
      onSaved()
    } catch {
      toast.error("Failed to create event.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Create Special Event</DialogTitle>
          <DialogDescription className="text-gray-400">Plan a special dining event for your organization</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-gray-300">Event Name</Label>
            <Input placeholder="Enter event name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="col-span-3 border-gray-600 bg-gray-700 text-gray-200" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-gray-300">Date</Label>
            <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="col-span-3 border-gray-600 bg-gray-700 text-gray-200" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-gray-300">Event Type</Label>
            <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
              <SelectTrigger className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"><SelectValue placeholder="Select event type" /></SelectTrigger>
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
            <Label className="text-right text-gray-300">Description</Label>
            <Textarea placeholder="Describe the event" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="col-span-3 border-gray-600 bg-gray-700 text-gray-200" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-gray-300">Participants</Label>
            <Select value={form.participants} onValueChange={(v) => setForm({ ...form, participants: v })}>
              <SelectTrigger className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"><SelectValue placeholder="Select participants" /></SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectItem value="All Staff">All Staff</SelectItem>
                <SelectItem value="Engineering">Engineering Team</SelectItem>
                <SelectItem value="Marketing">Marketing Team</SelectItem>
                <SelectItem value="Management">Management</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700" disabled={!form.name || !form.date || isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Create Event
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
