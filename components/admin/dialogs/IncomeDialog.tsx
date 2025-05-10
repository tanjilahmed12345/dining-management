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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save } from "lucide-react"
import { users, getUserById } from "@/lib/data"
import { toast } from "sonner"
// import { toast } from "@/components/ui/use-toast"

export function IncomeDialog({ open, onOpenChange, setIncomeData }) {
  const [newIncomeTransaction, setNewIncomeTransaction] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    userId: "",
    amount: 0,
    paymentMethod: "Cash",
  })

  // Add new income transaction
  const addIncomeTransaction = () => {
    // In a real app, this would send data to the server
    const newTransaction = {
      id: `income-${Date.now()}`,
      date: newIncomeTransaction.date,
      description: newIncomeTransaction.description,
      userId: newIncomeTransaction.userId,
      amount: Number(newIncomeTransaction.amount),
      paymentMethod: newIncomeTransaction.paymentMethod,
    }

    // Add to the beginning of the array (newest first)
    setIncomeData((prev) => [newTransaction, ...prev])

    // Reset form
    setNewIncomeTransaction({
      date: new Date().toISOString().split("T")[0],
      description: "",
      userId: "",
      amount: 0,
      paymentMethod: "Cash",
    })

    onOpenChange(false)

    toast(
     `Successfully recorded ${newTransaction.amount} from ${getUserById(newTransaction.userId)?.name || "Unknown"}`)
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
            <Label htmlFor="income-date" className="text-right text-gray-300">
              Date
            </Label>
            <Input
              id="income-date"
              type="date"
              value={newIncomeTransaction.date}
              onChange={(e) => setNewIncomeTransaction({ ...newIncomeTransaction, date: e.target.value })}
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="income-description" className="text-right text-gray-300">
              Description
            </Label>
            <Input
              id="income-description"
              placeholder="e.g., Monthly bill payment"
              value={newIncomeTransaction.description}
              onChange={(e) => setNewIncomeTransaction({ ...newIncomeTransaction, description: e.target.value })}
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="income-user" className="text-right text-gray-300">
              Received From
            </Label>
            <Select
              value={newIncomeTransaction.userId}
              onValueChange={(value) => setNewIncomeTransaction({ ...newIncomeTransaction, userId: value })}
            >
              <SelectTrigger id="income-user" className="col-span-3 border-gray-600 bg-gray-700 text-gray-200">
                <SelectValue placeholder="Select user" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                {users.map((user) => (
                  <SelectItem key={user.id} value={user.id}>
                    {user.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="income-amount" className="text-right text-gray-300">
              Amount
            </Label>
            <Input
              id="income-amount"
              type="number"
              placeholder="0.00"
              value={newIncomeTransaction.amount}
              onChange={(e) => setNewIncomeTransaction({ ...newIncomeTransaction, amount: e.target.value })}
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="income-payment-method" className="text-right text-gray-300">
              Payment Method
            </Label>
            <Select
              value={newIncomeTransaction.paymentMethod}
              onValueChange={(value) => setNewIncomeTransaction({ ...newIncomeTransaction, paymentMethod: value })}
            >
              <SelectTrigger
                id="income-payment-method"
                className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
              >
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
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
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            onClick={addIncomeTransaction}
            className="bg-teal-600 hover:bg-teal-700"
            disabled={!newIncomeTransaction.description || !newIncomeTransaction.userId || !newIncomeTransaction.amount}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Income
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
