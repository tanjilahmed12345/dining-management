"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, DollarSign, Clock, Receipt } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useUserBill } from "@/lib/hooks/use-billing"
import { useAuth } from "@/components/auth/AuthContext"
import { StatCardSkeleton, TableSkeleton } from "@/components/ui/loading-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate, formatCurrency } from "@/lib/utils"
import { toast } from "sonner"

export function UserBilling() {
  const { user } = useAuth()
  const { bill, payments, isLoading } = useUserBill(user?.id)

  if (isLoading) {
    return (
      <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
        <CardHeader className="bg-gray-800/80 border-b border-gray-700">
          <CardTitle className="text-gray-100">Billing Information</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <StatCardSkeleton count={3} />
          <TableSkeleton rows={3} cols={5} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
      <CardHeader className="bg-gray-800/80 border-b border-gray-700">
        <CardTitle className="text-gray-100">Billing Information</CardTitle>
        <CardDescription className="text-gray-400">Your current billing status and payment history</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {!bill ? (
          <EmptyState
            icon={Receipt}
            title="No billing information"
            description="Your billing details will appear here once meals are recorded."
          />
        ) : (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>Billing Period</span>
                </div>
                <p className="font-medium text-gray-100">{bill.month}/{bill.year}</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span>Meals Consumed</span>
                </div>
                <p className="font-medium text-gray-100">{bill.mealCount} meals</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span>Total Amount</span>
                </div>
                <p className="font-medium text-gray-100">{formatCurrency(bill.amount)}</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-100">Payment Status</p>
                  <Badge
                    className={
                      bill.paid
                        ? "bg-green-900 text-green-300 border-green-700"
                        : "bg-red-900 text-red-300 border-red-700"
                    }
                  >
                    {bill.paid ? "Paid" : "Unpaid"}
                  </Badge>
                </div>
                {!bill.paid && (
                  <Button
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => toast("Payment feature coming soon.")}
                  >
                    Pay Now
                  </Button>
                )}
              </div>
            </div>

            {payments.length > 0 && (
              <div className="mt-6">
                <h3 className="text-gray-100 font-medium mb-4 flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-teal-400" />
                  Payment History
                </h3>
                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                  <Table>
                    <TableHeader className="bg-gray-800/80">
                      <TableRow className="border-gray-700">
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300">Amount</TableHead>
                        <TableHead className="text-gray-300">Method</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Receipt</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow
                          key={payment.id}
                          className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                        >
                          <TableCell className="font-medium text-gray-200">{formatDate(payment.date)}</TableCell>
                          <TableCell className="text-gray-300">{formatCurrency(payment.amount)}</TableCell>
                          <TableCell className="text-gray-300">{payment.method}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-900 text-green-300 border-green-700">{payment.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-teal-400 hover:text-teal-300 hover:bg-gray-700/50"
                              onClick={() => toast(`Receipt download coming soon.`)}
                            >
                              <Receipt className="h-4 w-4 mr-1" /> Download
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
