"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, CreditCard, DollarSign, Download, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { DatePicker } from "@/components/ui/DatePicker"
import { format } from "date-fns"
import {
  incomeTransactions,
  expenseTransactions,
  getIncomeTransactionsByPeriod,
  getExpenseTransactionsByPeriod,
} from "@/lib/data"
import { IncomeDialog } from "@/components/admin/dialogs/IncomeDialog"
import { ExpenseDialog } from "@/components/admin/dialogs/ExpenseDialog"
import { ReceiveTab } from "@/components/admin/accounts/ReceiveTab"
import { SpendTab } from "@/components/admin/accounts/SpendTab"
import { TotalTab } from "@/components/admin/accounts/TotalTab"
import { toast } from "sonner"
// import { toast } from "@/components/ui/use-toast"

export function AccountsManagement() {
  const [accountsTab, setAccountsTab] = useState("receive")
  const [accountsPeriod, setAccountsPeriod] = useState("monthly")
  const [incomeData, setIncomeData] = useState([])
  const [expenseData, setExpenseData] = useState([])
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false)
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false)
  const [customDateRange, setCustomDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    endDate: new Date(),
  })
  const [isCustomDateRange, setIsCustomDateRange] = useState(false)

  // Load accounts data based on selected period
  useEffect(() => {
    if (isCustomDateRange) {
      // Format dates for API call
      const startDateStr = format(customDateRange.startDate, "yyyy-MM-dd")
      const endDateStr = format(customDateRange.endDate, "yyyy-MM-dd")

      // Filter transactions by custom date range
      const filteredIncome = incomeTransactions.filter((t) => t.date >= startDateStr && t.date <= endDateStr)
      const filteredExpenses = expenseTransactions.filter((t) => t.date >= startDateStr && t.date <= endDateStr)

      setIncomeData(filteredIncome)
      setExpenseData(filteredExpenses)
    } else {
      // Use predefined periods
      setIncomeData(getIncomeTransactionsByPeriod(accountsPeriod))
      setExpenseData(getExpenseTransactionsByPeriod(accountsPeriod))
    }
  }, [accountsPeriod, isCustomDateRange, customDateRange])

  // Download transactions as PDF
  const downloadTransactions = (type: "income" | "expense") => {
    toast( `The ${type} transactions report has been downloaded as a PDF.` )
  }

  return (
    <>
      <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
        <CardHeader className="bg-gray-800/80 border-b border-gray-700">
          <CardTitle className="text-gray-100">Accounts Management</CardTitle>
          <CardDescription className="text-gray-400">Manage income and expenses</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="receive" className="w-full" onValueChange={setAccountsTab} value={accountsTab}>
            <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 rounded-none border-b border-gray-700">
              <TabsTrigger
                value="receive"
                className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300 rounded-none"
              >
                <DollarSign className="h-4 w-4 mr-2" /> Receive
              </TabsTrigger>
              <TabsTrigger
                value="spend"
                className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300 rounded-none"
              >
                <CreditCard className="h-4 w-4 mr-2" /> Spend
              </TabsTrigger>
              <TabsTrigger
                value="total"
                className="data-[state=active]:bg-teal-600 data-[state=active]:text-white text-gray-300 rounded-none"
              >
                <BarChart className="h-4 w-4 mr-2" /> Total
              </TabsTrigger>
            </TabsList>

            {/* Common filter controls for both tabs */}
            <div className="p-4 bg-gray-800/30 border-b border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300 font-medium">Filter by:</span>
                  <Select
                    value={accountsPeriod}
                    onValueChange={(value) => {
                      setAccountsPeriod(value)
                      setIsCustomDateRange(value === "custom")
                    }}
                  >
                    <SelectTrigger className="w-[150px] border-gray-600 text-gray-300 bg-gray-800">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {isCustomDateRange && (
                  <div className="flex items-center gap-2">
                    {/* <div className="flex items-center gap-2">
                      <span className="text-gray-300 text-sm">From:</span>
                      <DatePicker
                        date={customDateRange.startDate}
                        onSelect={(date) => setCustomDateRange((prev) => ({ ...prev, startDate: date }))}
                        className="border-gray-600 bg-gray-800 text-gray-300"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-300 text-sm">To:</span>
                      <DatePicker
                        date={customDateRange.endDate}
                        onSelect={(date) => setCustomDateRange((prev) => ({ ...prev, endDate: date }))}
                        className="border-gray-600 bg-gray-800 text-gray-300"
                      />
                    </div> */}
                  </div>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700"
                    onClick={() => downloadTransactions(accountsTab === "receive" ? "income" : "expense")}
                  >
                    <Download className="h-4 w-4 mr-1" /> Export PDF
                  </Button>
                  <Button
                    className="bg-teal-600 hover:bg-teal-700"
                    onClick={() => (accountsTab === "receive" ? setIncomeDialogOpen(true) : setExpenseDialogOpen(true))}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    {accountsTab === "receive" ? "Add Income" : "Add Expense"}
                  </Button>
                </div>
              </div>
            </div>

            <TabsContent value="receive" className="p-0">
              <ReceiveTab incomeData={incomeData} />
            </TabsContent>

            <TabsContent value="spend" className="p-0">
              <SpendTab expenseData={expenseData} />
            </TabsContent>

            <TabsContent value="total" className="p-0">
              <TotalTab
                incomeData={incomeData}
                expenseData={expenseData}
                accountsPeriod={accountsPeriod}
                isCustomDateRange={isCustomDateRange}
                customDateRange={customDateRange}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <IncomeDialog open={incomeDialogOpen} onOpenChange={setIncomeDialogOpen} setIncomeData={setIncomeData} />
      <ExpenseDialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen} setExpenseData={setExpenseData} />
    </>
  )
}
