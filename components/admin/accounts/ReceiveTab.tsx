"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, Users, Wallet } from "lucide-react"
import { getUserById } from "@/lib/data"

export function ReceiveTab({ incomeData }) {
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
            <div className="bg-teal-900/50 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-teal-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Income</p>
              <p className="text-2xl font-bold text-gray-100">
                ৳{incomeData.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-blue-900/50 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Payers</p>
              <p className="text-2xl font-bold text-gray-100">{new Set(incomeData.map((t) => t.userId)).size}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-purple-900/50 p-3 rounded-full">
              <Wallet className="h-6 w-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Average Payment</p>
              <p className="text-2xl font-bold text-gray-100">
                ৳
                {incomeData.length > 0
                  ? (incomeData.reduce((sum, t) => sum + t.amount, 0) / incomeData.length).toFixed(2)
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
                <TableHead className="text-gray-300">Received From</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeData.length > 0 ? (
                incomeData.map((transaction) => {
                  const user = getUserById(transaction.userId)
                  return (
                    <TableRow
                      key={transaction.id}
                      className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                    >
                      <TableCell className="font-medium text-gray-200">{formatDate(transaction.date)}</TableCell>
                      <TableCell className="text-gray-300">{transaction.description}</TableCell>
                      <TableCell className="text-gray-300">{user?.name || "Unknown"}</TableCell>
                      <TableCell className="text-gray-300 font-medium">৳{transaction.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-gray-300">{transaction.paymentMethod}</TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow className="border-gray-700">
                  <TableCell colSpan={6} className="text-center text-gray-400 py-4">
                    No income transactions found for the selected period.
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
