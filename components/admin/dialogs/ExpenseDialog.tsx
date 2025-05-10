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
import { toast } from "sonner"
// import { toast } from "@/components/ui/use-toast"

export function ExpenseDialog({ open, onOpenChange, setExpenseData }) {
  const [newExpenseTransaction, setNewExpenseTransaction] = useState({
    date: new Date().toISOString().split("T")[0],
    description: "",
    amount: 0,
    category: "Groceries",
    paymentMethod: "Cash",
  })

  // Add new expense transaction
  const addExpenseTransaction = () => {
    // In a real app, this would send data to the server
    const newTransaction = {
      id: `expense-${Date.now()}`,
      date: newExpenseTransaction.date,
      description: newExpenseTransaction.description,
      amount: Number(newExpenseTransaction.amount),
      category: newExpenseTransaction.category,
      paymentMethod: newExpenseTransaction.paymentMethod,
    }

    // Add to the beginning of the array (newest first)
    setExpenseData((prev) => [newTransaction, ...prev])

    // Reset form
    setNewExpenseTransaction({
      date: new Date().toISOString().split("T")[0],
      description: "",
      amount: 0,
      category: "Groceries",
      paymentMethod: "Cash",
    })

    onOpenChange(false)

    toast(`Successfully recorded ${newTransaction.amount} for ${newTransaction.description}` )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-100">Add Expense</DialogTitle>
          <DialogDescription className="text-gray-400">Record a new expense transaction</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expense-date" className="text-right text-gray-300">
              Date
            </Label>
            <Input
              id="expense-date"
              type="date"
              value={newExpenseTransaction.date}
              onChange={(e) => setNewExpenseTransaction({ ...newExpenseTransaction, date: e.target.value })}
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expense-description" className="text-right text-gray-300">
              Description
            </Label>
            <Input
              id="expense-description"
              placeholder="e.g., Grocery shopping"
              value={newExpenseTransaction.description}
              onChange={(e) => setNewExpenseTransaction({ ...newExpenseTransaction, description: e.target.value })}
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expense-category" className="text-right text-gray-300">
              Category
            </Label>
            <Select
              value={newExpenseTransaction.category}
              onValueChange={(value) => setNewExpenseTransaction({ ...newExpenseTransaction, category: value })}
            >
              <SelectTrigger id="expense-category" className="col-span-3 border-gray-600 bg-gray-700 text-gray-200">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectItem value="Groceries">Groceries</SelectItem>
                <SelectItem value="Utilities">Utilities</SelectItem>
                <SelectItem value="Staff">Staff</SelectItem>
                <SelectItem value="Equipment">Equipment</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Miscellaneous">Miscellaneous</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expense-amount" className="text-right text-gray-300">
              Amount
            </Label>
            <Input
              id="expense-amount"
              type="number"
              placeholder="0.00"
              value={newExpenseTransaction.amount}
              onChange={(e) => setNewExpenseTransaction({ ...newExpenseTransaction, amount: e.target.value })}
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="expense-payment-method" className="text-right text-gray-300">
              Payment Method
            </Label>
            <Select
              value={newExpenseTransaction.paymentMethod}
              onValueChange={(value) => setNewExpenseTransaction({ ...newExpenseTransaction, paymentMethod: value })}
            >
              <SelectTrigger
                id="expense-payment-method"
                className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
              >
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                <SelectItem value="Cash">Cash</SelectItem>
                <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                <SelectItem value="Credit Card">Credit Card</SelectItem>
                <SelectItem value="Company Card">Company Card</SelectItem>
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
            onClick={addExpenseTransaction}
            className="bg-teal-600 hover:bg-teal-700"
            disabled={!newExpenseTransaction.description || !newExpenseTransaction.amount}
          >
            <Save className="h-4 w-4 mr-2" />
            Save Expense
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
