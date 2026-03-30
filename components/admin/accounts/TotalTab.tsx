"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, TrendingDown, TrendingUp, Wallet } from "lucide-react"
import type { IncomeTransaction, ExpenseTransaction } from "@/lib/types"
import { StatCardSkeleton, TableSkeleton } from "@/components/ui/loading-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate, formatCurrency } from "@/lib/utils"

interface TotalTabProps {
  incomeData: IncomeTransaction[]
  expenseData: ExpenseTransaction[]
  accountsPeriod: string
  isLoading: boolean
}

export function TotalTab({ incomeData, expenseData, accountsPeriod, isLoading }: TotalTabProps) {
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <StatCardSkeleton count={3} />
        <TableSkeleton rows={5} cols={5} />
      </div>
    )
  }

  const totalIncome = incomeData.reduce((sum, t) => sum + t.amount, 0)
  const totalExpense = expenseData.reduce((sum, t) => sum + t.amount, 0)
  const cashInHand = totalIncome - totalExpense

  const allTransactions = [
    ...incomeData.map((t) => ({ ...t, _type: "income" as const })),
    ...expenseData.map((t) => ({ ...t, _type: "expense" as const })),
  ]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10)

  if (incomeData.length === 0 && expenseData.length === 0) {
    return (
      <EmptyState
        icon={BarChart}
        title="No transactions"
        description="Transaction summary will appear here once income or expenses are recorded."
      />
    )
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
              <p className="text-2xl font-bold text-gray-100">{formatCurrency(totalIncome)}</p>
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
              <p className="text-2xl font-bold text-gray-100">{formatCurrency(totalExpense)}</p>
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
              <p className="text-2xl font-bold text-gray-100">{formatCurrency(cashInHand)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700 mx-4 mb-4">
        <CardHeader className="pb-2">
          <CardTitle className="text-gray-100 text-lg">Recent Transactions</CardTitle>
          <CardDescription className="text-gray-400">
            {`${accountsPeriod.charAt(0).toUpperCase() + accountsPeriod.slice(1)} Overview`}
          </CardDescription>
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
              {allTransactions.length > 0 ? (
                allTransactions.map((transaction) => {
                  const isIncome = transaction._type === "income"
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
                        {isIncome ? "+" : "-"}{formatCurrency(transaction.amount)}
                      </TableCell>
                      <TableCell className="text-gray-300">
                        {isIncome
                          ? `From: ${(transaction as IncomeTransaction).userName || "Unknown"}`
                          : `Category: ${(transaction as ExpenseTransaction).category || "-"}`}
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
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
