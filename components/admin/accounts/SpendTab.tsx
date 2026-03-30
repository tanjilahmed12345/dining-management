"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CreditCard, PieChart, TrendingDown, Wallet } from "lucide-react"
import type { ExpenseTransaction } from "@/lib/types"
import { StatCardSkeleton, TableSkeleton } from "@/components/ui/loading-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate, formatCurrency } from "@/lib/utils"

interface SpendTabProps {
  expenseData: ExpenseTransaction[]
  isLoading: boolean
}

export function SpendTab({ expenseData, isLoading }: SpendTabProps) {
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <StatCardSkeleton count={3} />
        <TableSkeleton rows={5} cols={5} />
      </div>
    )
  }

  if (expenseData.length === 0) {
    return (
      <EmptyState
        icon={CreditCard}
        title="No expense transactions"
        description="Expense transactions will appear here once expenses are recorded."
      />
    )
  }

  const totalExpenses = expenseData.reduce((sum, t) => sum + t.amount, 0)
  const categoryCount = new Set(expenseData.map((t) => t.category)).size
  const averageExpense = expenseData.length > 0 ? totalExpenses / expenseData.length : 0

  return (
    <>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-red-900/50 p-3 rounded-full">
              <TrendingDown className="h-6 w-6 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-100">{formatCurrency(totalExpenses)}</p>
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
              <p className="text-2xl font-bold text-gray-100">{categoryCount}</p>
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
              <p className="text-2xl font-bold text-gray-100">{formatCurrency(averageExpense)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

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
              {expenseData.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                >
                  <TableCell className="font-medium text-gray-200">{formatDate(transaction.date)}</TableCell>
                  <TableCell className="text-gray-300">{transaction.description}</TableCell>
                  <TableCell className="text-gray-300">{transaction.category}</TableCell>
                  <TableCell className="text-gray-300 font-medium">{formatCurrency(transaction.amount)}</TableCell>
                  <TableCell className="text-gray-300">{transaction.paymentMethod}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
