"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BarChart, Download, Star } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getConfirmedUsersByDate, getAverageRatingForMenuItem } from "@/lib/data"
import { toast } from "sonner"

// import { toast } from "@/components/ui/use-toast"

export function HistoryView({ menus }) {
  const [historyPeriod, setHistoryPeriod] = useState("weekly")

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
  }

  // Download confirmed users list as PDF
  const downloadConfirmedUsers = (date: string) => {
    toast("The participant list has been downloaded as a PDF.")
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
              toast(
               `The ${historyPeriod} report has been downloaded as a PDF.`
              )
            }}
          >
            <Download className="h-4 w-4 mr-1" /> Export PDF
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
            <h3 className="font-medium text-gray-100 mb-4 flex items-center">
              <BarChart className="h-5 w-5 mr-2 text-teal-400" />
              {historyPeriod === "weekly" ? "Weekly" : historyPeriod === "monthly" ? "Monthly" : "Yearly"} Participation
              Summary
            </h3>

            <div className="relative h-60 bg-gray-900 rounded-lg p-4 mb-4">
              <div className="absolute bottom-0 left-0 w-full h-full flex items-end justify-around px-4 pb-4">
                {/* Simulated chart bars */}
                <div
                  className="w-1/7 bg-teal-500 rounded-t-md"
                  style={{ height: "65%", transition: "height 1s ease-out" }}
                ></div>
                <div
                  className="w-1/7 bg-teal-500 rounded-t-md"
                  style={{ height: "80%", transition: "height 1s ease-out" }}
                ></div>
                <div
                  className="w-1/7 bg-teal-500 rounded-t-md"
                  style={{ height: "45%", transition: "height 1s ease-out" }}
                ></div>
                <div
                  className="w-1/7 bg-teal-500 rounded-t-md"
                  style={{ height: "90%", transition: "height 1s ease-out" }}
                ></div>
                <div
                  className="w-1/7 bg-teal-500 rounded-t-md"
                  style={{ height: "70%", transition: "height 1s ease-out" }}
                ></div>
                {historyPeriod === "weekly" && (
                  <>
                    <div
                      className="w-1/7 bg-teal-500 rounded-t-md"
                      style={{ height: "60%", transition: "height 1s ease-out" }}
                    ></div>
                    <div
                      className="w-1/7 bg-teal-500 rounded-t-md"
                      style={{ height: "50%", transition: "height 1s ease-out" }}
                    ></div>
                  </>
                )}
              </div>
              <div className="absolute bottom-0 left-0 w-full flex justify-around px-4 text-xs text-gray-400">
                {historyPeriod === "weekly" ? (
                  <>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                  </>
                ) : historyPeriod === "monthly" ? (
                  <>
                    <div>Week 1</div>
                    <div>Week 2</div>
                    <div>Week 3</div>
                    <div>Week 4</div>
                    <div>Week 5</div>
                  </>
                ) : (
                  <>
                    <div>Jan</div>
                    <div>Feb</div>
                    <div>Mar</div>
                    <div>Apr</div>
                    <div>May</div>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700">
                <p className="text-sm text-gray-400 mb-1">Total Participants</p>
                <p className="text-2xl font-bold text-gray-100">
                  {historyPeriod === "weekly" ? "32" : historyPeriod === "monthly" ? "128" : "1,540"}
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700">
                <p className="text-sm text-gray-400 mb-1">Average Daily</p>
                <p className="text-2xl font-bold text-gray-100">
                  {historyPeriod === "weekly" ? "4.6" : historyPeriod === "monthly" ? "4.3" : "4.2"}
                </p>
              </div>
              <div className="bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700">
                <p className="text-sm text-gray-400 mb-1">Most Popular Day</p>
                <p className="text-2xl font-bold text-gray-100">
                  {historyPeriod === "weekly" ? "Thursday" : historyPeriod === "monthly" ? "Week 2" : "March"}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 shadow-sm">
            <h3 className="font-medium text-gray-100 mb-4">Detailed History</h3>
            <Table>
              <TableHeader className="bg-gray-800/80">
                <TableRow className="border-gray-700">
                  <TableHead className="text-gray-300">Date</TableHead>
                  <TableHead className="text-gray-300">Menu Item</TableHead>
                  <TableHead className="text-gray-300">Participants</TableHead>
                  <TableHead className="text-gray-300">Rating</TableHead>
                  <TableHead className="text-gray-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {menus.slice(0, 5).map((menu) => {
                  const confirmedUsers = getConfirmedUsersByDate(menu.date)
                  const avgRating = getAverageRatingForMenuItem(menu.id)
                  return (
                    <TableRow
                      key={menu.id}
                      className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                    >
                      <TableCell className="font-medium text-gray-200">{formatDate(menu.date)}</TableCell>
                      <TableCell className="text-gray-300">{menu.name}</TableCell>
                      <TableCell className="text-gray-300">{confirmedUsers.length}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-3 w-3 ${
                                star <= Math.round(avgRating || 0) ? "text-amber-400 fill-amber-400" : "text-gray-600"
                              }`}
                            />
                          ))}
                          <span className="text-gray-400 text-xs ml-2">{avgRating || "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-gray-600 text-gray-300 hover:bg-gray-700"
                          onClick={() => downloadConfirmedUsers(menu.date)}
                        >
                          <Download className="h-3 w-3 mr-1" /> Download PDF
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
