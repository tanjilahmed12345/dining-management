"use client"

import { useState } from "react"
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Save } from "lucide-react"
import api from "@/lib/api/client"
import { toast } from "sonner"

interface IncomeDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSaved: () => void
}

export function IncomeDialog({ open, onOpenChange, onSaved }: IncomeDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [form, setForm] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    userId: "",
    amount: 0,
    paymentMethod: "Cash",
  })

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await api.post("/api/transactions/income", { ...form, amount: Number(form.amount) })
      toast.success("Income recorded successfully.")
      setForm({ date: new Date().toISOString().split("T")[0], description: "", userId: "", amount: 0, paymentMethod: "Cash" })
      onOpenChange(false)
      onSaved()
    } catch {
      toast.error("Failed to record income.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Add Income</DialogTitle>
          <DialogDescription className="text-gray-400">Record a new income transaction</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-gray-300">Date</Label>
            <Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} className="col-span-3 border-gray-600 bg-gray-700 text-gray-200" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-gray-300">Description</Label>
            <Input placeholder="e.g., Monthly bill payment" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="col-span-3 border-gray-600 bg-gray-700 text-gray-200" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-gray-300">User ID</Label>
            <Input placeholder="Paste user ID" value={form.userId} onChange={(e) => setForm({ ...form, userId: e.target.value })} className="col-span-3 border-gray-600 bg-gray-700 text-gray-200" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-gray-300">Amount</Label>
            <Input type="number" placeholder="0.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })} className="col-span-3 border-gray-600 bg-gray-700 text-gray-200" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right text-gray-300">Method</Label>
            <Select value={form.paymentMethod} onValueChange={(v) => setForm({ ...form, paymentMethod: v })}>
              <SelectTrigger className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"><SelectValue /></SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Mobile Payment">Mobile Payment</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">Cancel</Button>
          <Button onClick={handleSubmit} className="bg-teal-600 hover:bg-teal-700" disabled={!form.description || !form.amount || !form.userId || isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            Save Income
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
