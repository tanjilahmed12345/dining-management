"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, History } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MenuItem } from "@/lib/types"
import { TableSkeleton } from "@/components/ui/loading-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

interface HistoryViewProps {
  menus: MenuItem[]
  isLoading: boolean
}

export function HistoryView({ menus, isLoading }: HistoryViewProps) {
  const [historyPeriod, setHistoryPeriod] = useState("weekly")

  if (isLoading) {
    return (
      <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
        <CardHeader className="bg-gray-800/80 border-b border-gray-700">
          <CardTitle className="text-gray-100">History View</CardTitle>
          <CardDescription className="text-gray-400">View participation history by period</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <TableSkeleton rows={5} cols={5} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between bg-gray-800/80 border-b border-gray-700">
        <div>
          <CardTitle className="text-gray-100">History View</CardTitle>
          <CardDescription className="text-gray-400">View participation history by period</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Select value={historyPeriod} onValueChange={setHistoryPeriod}>
            <SelectTrigger className="w-[180px] border-gray-600 text-gray-300 bg-gray-800">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={() => {
              toast(`The ${historyPeriod} report has been downloaded as a PDF.`)
            }}
          >
            <Download className="h-4 w-4 mr-1" /> Export PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {menus.length === 0 ? (
          <EmptyState
            icon={History}
            title="No history available"
            description="Meal history will appear here once meals have been served."
          />
        ) : (
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
            <h3 className="font-medium text-gray-100 mb-4">Detailed History</h3>
            <Table>
              <TableHeader className="bg-gray-800/80">
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Menu Item</TableHead>
                  <TableHead className="text-gray-300">Day</TableHead>
                  <TableHead className="text-gray-300">Status</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menus.map((menu) => (
                  <TableRow
                    key={menu.id}
                    className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                  >
                    <TableCell className="font-medium text-gray-200">{formatDate(menu.date)}</TableCell>
                    <TableCell className="text-gray-300">{menu.name}</TableCell>
                    <TableCell className="text-gray-300">{menu.dayOfWeek}</TableCell>
                    <TableCell className="text-gray-300">{menu.active ? "Active" : "Inactive"}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => toast("Download will be available when connected to backend.")}
                      >
                        <Download className="h-3 w-3 mr-1" /> Download PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
