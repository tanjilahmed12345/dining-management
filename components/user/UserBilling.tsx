"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, CheckCircle, DollarSign, Clock, Receipt } from "lucide-react"
import { bills } from "@/lib/data"
// import { toast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function UserBilling({ currentUser }) {
  // Get user's bill
  const userBill = bills.find((b) => b.userId === currentUser.id)

  // Mock payment history data
  const paymentHistory = [
    {
      id: "pay-1",
      date: "2025-03-15",
      amount: 120,
      method: "Credit Card",
      status: "Completed",
    },
    {
      id: "pay-2",
      date: "2025-02-12",
      amount: 96,
      method: "Bank Transfer",
      status: "Completed",
    },
    {
      id: "pay-3",
      date: "2025-01-10",
      amount: 108,
      method: "Mobile Payment",
      status: "Completed",
    },
  ]

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
      <CardHeader className="bg-gray-800/80 border-b border-gray-700">
        <CardTitle className="text-gray-100">Billing Information</CardTitle>
        <CardDescription className="text-gray-400">Your current billing status and payment history</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {userBill ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <Calendar className="h-4 w-4" />
                  <span>Billing Period</span>
                </div>
                <p className="font-medium text-gray-100">
                  {userBill.month}/{userBill.year}
                </p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <CheckCircle className="h-4 w-4" />
                  <span>Meals Consumed</span>
                </div>
                <p className="font-medium text-gray-100">{userBill.mealCount} meals</p>
              </div>
              <div className="bg-gray-800 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-700">
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                  <DollarSign className="h-4 w-4" />
                  <span>Total Amount</span>
                </div>
                <p className="font-medium text-gray-100">৳{userBill.amount.toFixed(2)}</p>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-100">Payment Status</p>
                  <Badge
                    className={
                      userBill.paid
                        ? "bg-green-900 text-green-300 border-green-700"
                        : "bg-red-900 text-red-300 border-red-700"
                    }
                  >
                    {userBill.paid ? "Paid" : "Unpaid"}
                  </Badge>
                </div>
                {!userBill.paid && (
                  <Button
                    className="bg-teal-600 hover:bg-teal-700 transition-all duration-300 transform hover:scale-105"
                    onClick={() => {
                      toast({
                        title: "Payment Initiated",
                        description: "You will be redirected to the payment gateway.",
                      })
                    }}
                  >
                    Pay Now
                  </Button>
                )}
              </div>
            </div>

            {/* Payment History */}
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
                      <TableHead className="text-gray-300">Payment Method</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Receipt</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paymentHistory.map((payment) => (
                      <TableRow
                        key={payment.id}
                        className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                      >
                        <TableCell className="font-medium text-gray-200">{formatDate(payment.date)}</TableCell>
                        <TableCell className="text-gray-300">৳{payment.amount.toFixed(2)}</TableCell>
                        <TableCell className="text-gray-300">{payment.method}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-900 text-green-300 border-green-700">{payment.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-teal-400 hover:text-teal-300 hover:bg-gray-700/50"
                            onClick={() => {
                              toast({
                                title: "Receipt Downloaded",
                                description: `Receipt for payment on ${formatDate(payment.date)} has been downloaded.`,
                              })
                            }}
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
          </div>
        ) : (
          <p className="text-gray-400 text-center py-8">No billing information available.</p>
        )}
      </CardContent>
    </Card>
  )
}
