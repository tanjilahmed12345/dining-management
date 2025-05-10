"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, TrendingDown, Wallet } from "lucide-react"

export function SpendTab({ expenseData }) {
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <>
      {/* Summary cards */}
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-red-900/50 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-100">
                ৳{expenseData.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-amber-900/50 p-3 rounded-full">
              <PieChart className="h-6 w-6 text-amber-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Categories</p>
              <p className="text-2xl font-bold text-gray-100">{new Set(expenseData.map((t) => t.category)).size}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-emerald-900/50 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Average Expense</p>
              <p className="text-2xl font-bold text-gray-100">
                ৳
                {expenseData.length > 0
                  ? (expenseData.reduce((sum, t) => sum + t.amount, 0) / expenseData.length).toFixed(2)
                  : "0.00"}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions table */}
      <div className="p-4 pt-0">
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-800/80">
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Description</TableHead>
                <TableHead className="text-gray-300">Category</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expenseData.length > 0 ? (
                expenseData.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                  >
                    <TableCell className="font-medium text-gray-200">{formatDate(transaction.date)}</TableCell>
                    <TableCell className="text-gray-300">{transaction.description}</TableCell>
                    <TableCell className="text-gray-300">{transaction.category}</TableCell>
                    <TableCell className="text-gray-300 font-medium">৳{transaction.amount.toFixed(2)}</TableCell>
                    <TableCell className="text-gray-300">{transaction.paymentMethod}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow className="border-gray-700">
                  <TableCell colSpan={6} className="text-center text-gray-400 py-4">
                    No expense transactions found for the selected period.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
