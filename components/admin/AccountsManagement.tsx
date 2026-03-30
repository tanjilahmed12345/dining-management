"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart, CreditCard, DollarSign, Download, Filter, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useIncomeTransactions, useExpenseTransactions } from "@/lib/hooks/use-accounts"
import { IncomeDialog } from "@/components/admin/dialogs/IncomeDialog"
import { ExpenseDialog } from "@/components/admin/dialogs/ExpenseDialog"
import { ReceiveTab } from "@/components/admin/accounts/ReceiveTab"
import { SpendTab } from "@/components/admin/accounts/SpendTab"
import { TotalTab } from "@/components/admin/accounts/TotalTab"
import { toast } from "sonner"

export function AccountsManagement() {
  const [accountsTab, setAccountsTab] = useState("receive")
  const [accountsPeriod, setAccountsPeriod] = useState<"weekly" | "monthly" | "yearly">("monthly")
  const [incomeDialogOpen, setIncomeDialogOpen] = useState(false)
  const [expenseDialogOpen, setExpenseDialogOpen] = useState(false)

  const {
    transactions: incomeData,
    isLoading: incomeLoading,
    refetch: refetchIncome,
  } = useIncomeTransactions(accountsPeriod)

  const {
    transactions: expenseData,
    isLoading: expenseLoading,
    refetch: refetchExpense,
  } = useExpenseTransactions(accountsPeriod)

  const downloadTransactions = (type: "income" | "expense") => {
    toast(`The ${type} transactions report has been downloaded as a PDF.`)
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

            <div className="p-4 bg-gray-800/30 border-b border-gray-700">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-300 font-medium">Filter by:</span>
                  <Select
                    value={accountsPeriod}
                    onValueChange={(value: string) => {
                      setAccountsPeriod(value as "weekly" | "monthly" | "yearly")
                    }}
                  >
                    <SelectTrigger className="w-[150px] border-gray-600 text-gray-300 bg-gray-800">
                      <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

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
              <ReceiveTab incomeData={incomeData} isLoading={incomeLoading} />
            </TabsContent>

            <TabsContent value="spend" className="p-0">
              <SpendTab expenseData={expenseData} isLoading={expenseLoading} />
            </TabsContent>

            <TabsContent value="total" className="p-0">
              <TotalTab
                incomeData={incomeData}
                expenseData={expenseData}
                accountsPeriod={accountsPeriod}
                isLoading={incomeLoading || expenseLoading}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <IncomeDialog open={incomeDialogOpen} onOpenChange={setIncomeDialogOpen} onSaved={refetchIncome} />
      <ExpenseDialog open={expenseDialogOpen} onOpenChange={setExpenseDialogOpen} onSaved={refetchExpense} />
    </>
  )
}
