"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingDown, TrendingUp, Wallet } from "lucide-react"
import { getUserById } from "@/lib/data"
import { format } from "date-fns"

export function TotalTab({ incomeData, expenseData, accountsPeriod, isCustomDateRange, customDateRange }) {
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 mb-6">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-teal-900/50 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-teal-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Received</p>
              <p className="text-2xl font-bold text-gray-100">
                ৳{incomeData.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-red-900/50 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Spent</p>
              <p className="text-2xl font-bold text-gray-100">
                ৳{expenseData.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-emerald-900/50 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Cash in Hand</p>
              <p className="text-2xl font-bold text-gray-100">
                ৳
                {(
                  incomeData.reduce((sum, t) => sum + t.amount, 0) - expenseData.reduce((sum, t) => sum + t.amount, 0)
                ).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bar Chart for Income vs Expenses */}
      <Card className="bg-gray-800 border-gray-700 mx-4 mb-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-100 text-lg">Income vs Expenses</CardTitle>
          <CardDescription className="text-gray-400">
            {isCustomDateRange
              ? `${format(customDateRange.startDate, "MMM d, yyyy")} - ${format(customDateRange.endDate, "MMM d, yyyy")}`
              : `${accountsPeriod.charAt(0).toUpperCase() + accountsPeriod.slice(1)} Overview`}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="w-full h-80 relative">
            {/* Simple bar chart visualization */}
            <div className="absolute inset-0 flex items-end justify-around px-4 pb-10">
              {/* Generate bars based on the period - simplified for clarity */}
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex gap-2 items-end justify-center w-1/6">
                  <div
                    className="w-8 bg-teal-500 rounded-t-md transition-all duration-500"
                    style={{ height: `${Math.random() * 70 + 30}%` }}
                  ></div>
                  <div
                    className="w-8 bg-red-500 rounded-t-md transition-all duration-500"
                    style={{ height: `${Math.random() * 70 + 20}%` }}
                  ></div>
                  <div
                    className="absolute bottom-0 text-xs text-gray-400 text-center w-1/6"
                    style={{ left: `${(i * 100) / 6 + 100 / 12}%` }}
                  >
                    {format(new Date(new Date().setMonth(new Date().getMonth() - 5 + i)), "MMM")}
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="absolute bottom-0 left-0 w-full flex justify-center items-center pb-1">
              <div className="flex items-center gap-6 mt-2">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-teal-500 rounded-sm"></div>
                  <span className="text-xs text-gray-300">Income</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                  <span className="text-xs text-gray-300">Expenses</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card className="bg-gray-800 border-gray-700 mx-4 mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-100 text-lg">Recent Transactions</CardTitle>
          <CardDescription className="text-gray-400">Combined view of income and expenses</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-gray-800/80">
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">Date</TableHead>
                <TableHead className="text-gray-300">Description</TableHead>
                <TableHead className="text-gray-300">Type</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* Combine and sort income and expense data */}
              {[...incomeData, ...expenseData]
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                .slice(0, 10) // Show only the 10 most recent transactions
                .map((transaction) => {
                  const isIncome = "userId" in transaction
                  return (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                    >
                      <TableCell className="font-medium text-gray-200">{formatDate(transaction.date)}</TableCell>
                      <TableCell className="text-gray-300">{transaction.description}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            isIncome
                              ? "bg-teal-900 text-teal-300 border-teal-700"
                              : "bg-red-900 text-red-300 border-red-700"
                          }
                        >
                          {isIncome ? "Income" : "Expense"}
                        </Badge>
                      </TableCell>
                      <TableCell className={`font-medium ${isIncome ? "text-teal-400" : "text-red-400"}`}>
                        {isIncome ? "+" : "-"}৳{transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {isIncome
                          ? `From: ${getUserById(transaction.userId)?.name || "Unknown"}`
                          : `Category: ${transaction.category}`}
                      </TableCell>
                    </TableRow>
                  )
                })}
              {incomeData.length === 0 && expenseData.length === 0 && (
                <TableRow className="border-gray-700">
                  <TableCell colSpan={5} className="text-center text-gray-400 py-4">
                    No transactions found for the selected period.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  )
}
