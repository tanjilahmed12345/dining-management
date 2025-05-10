"use client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Edit } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { bills, users } from "@/lib/data"
import { toast } from "sonner"
// import { toast } from "@/components/ui/use-toast"

export function BillingManagement() {
  return (
    <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between bg-gray-800/80 border-b border-gray-700">
        <div>
          <CardTitle className="text-gray-100">Billing Management</CardTitle>
          <CardDescription className="text-gray-400">Manage user billing</CardDescription>
        </div>
        <div className="flex gap-2">
          <Input placeholder="Search users..." className="max-w-xs border-gray-600 text-gray-300 bg-gray-800" />
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={() => {
              toast("The billing report has been downloaded as a PDF")
            }}
          >
            <Download className="h-4 w-4 mr-2" /> Export PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-800/80">
              <TableRow className="border-gray-700">
                <TableHead className="text-gray-300">User</TableHead>
                <TableHead className="text-gray-300">Period</TableHead>
                <TableHead className="text-gray-300">Meals</TableHead>
                <TableHead className="text-gray-300">Amount</TableHead>
                <TableHead className="text-gray-300">Status</TableHead>
                <TableHead className="text-gray-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bills.map((bill) => {
                const user = users.find((u) => u.id === bill.userId)
                if (!user) return null

                return (
                  <TableRow
                    key={bill.id}
                    className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                  >
                    <TableCell className="font-medium text-gray-200">{user.name}</TableCell>
                    <TableCell className="text-gray-300">
                      {bill.month}/{bill.year}
                    </TableCell>
                    <TableCell className="text-gray-300">{bill.mealCount}</TableCell>
                    <TableCell className="text-gray-300">৳{bill.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          bill.paid
                            ? "bg-green-900 text-green-300 border-green-700"
                            : "bg-red-900 text-red-300 border-red-700"
                        }
                      >
                        {bill.paid ? "Paid" : "Unpaid"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => {
                          toast(`Editing billing for ${user.name}` )
                        }}
                      >
                        <Edit className="h-3 w-3 mr-1" /> Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
