"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, Users, Wallet } from "lucide-react"
import type { IncomeTransaction } from "@/lib/types"
import { StatCardSkeleton, TableSkeleton } from "@/components/ui/loading-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate, formatCurrency } from "@/lib/utils"

interface ReceiveTabProps {
  incomeData: IncomeTransaction[]
  isLoading: boolean
}

export function ReceiveTab({ incomeData, isLoading }: ReceiveTabProps) {
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        <StatCardSkeleton count={3} />
        <TableSkeleton rows={5} cols={5} />
      </div>
    )
  }

  if (incomeData.length === 0) {
    return (
      <EmptyState
        icon={DollarSign}
        title="No income transactions"
        description="Income transactions will appear here once payments are recorded."
      />
    )
  }

  const totalIncome = incomeData.reduce((sum, t) => sum + t.amount, 0)
  const totalPayers = new Set(incomeData.map((t) => t.userId)).size
  const averagePayment = incomeData.length > 0 ? totalIncome / incomeData.length : 0

  return (
    <>
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="bg-teal-900/50 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-teal-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Income</p>
              <p className="text-2xl font-bold text-gray-100">{formatCurrency(totalIncome)}</p>
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
              <p className="text-2xl font-bold text-gray-100">{totalPayers}</p>
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
              <p className="text-2xl font-bold text-gray-100">{formatCurrency(averagePayment)}</p>
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
                <TableHead className="text-gray-300">Received From</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Payment Method</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incomeData.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                >
                  <TableCell className="font-medium text-gray-200">{formatDate(transaction.date)}</TableCell>
                  <TableCell className="text-gray-300">{transaction.description}</TableCell>
                  <TableCell className="text-gray-300">{transaction.userName || "Unknown"}</TableCell>
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
