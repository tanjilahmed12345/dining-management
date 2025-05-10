"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getConfirmedUsersByDate } from "@/lib/data"
import { toast } from "sonner"
// import { toast } from "@/components/ui/use-toast"

// Simulating framer-motion for animations
const MotionDiv = ({ children, ...props }) => {
  return (
    <div className="transition-all duration-500 ease-in-out" {...props}>
      {children}
    </div>
  )
}

export function ParticipantsManagement({ menus }) {
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
    const confirmedUsers = getConfirmedUsersByDate(date)
    const menuItem = menus.find((m) => m.date === date)

    // In a real implementation, we would use a library like jsPDF
    // This is a simulation of PDF generation
    const generatePDF = () => {
      // Create a hidden element to display the content
      const element = document.createElement("div")
      element.style.position = "absolute"
      element.style.left = "-9999px"
      document.body.appendChild(element)

      // Format the content for PDF
      element.innerHTML = `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h1 style="color: #333; text-align: center;">Confirmed Participants</h1>
        <h2 style="color: #555; text-align: center;">${menuItem?.name} - ${formatDate(date)}</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr style="background-color: #f2f2f2;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Name</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Email</th>
            </tr>
          </thead>
          <tbody>
            ${confirmedUsers
              .map(
                (user) => `
              <tr>
                <td style="border: 1px solid #ddd; padding: 8px;">${user.name}</td>
                <td style="border: 1px solid #ddd; padding: 8px;">${user.email}</td>
              </tr>
            `,
              )
              .join("")}
          </tbody>
        </table>
        <p style="margin-top: 20px; color: #777; text-align: center;">
          Generated on ${new Date().toLocaleString()}
        </p>
      </div>
    `

      // In a real implementation, we would use jsPDF to convert this to PDF
      // For this simulation, we'll create a data URL that represents a PDF
      const pdfBlob = new Blob([`%PDF-1.4\n%âãÏÓ\n${element.innerHTML}\n%%EOF`], { type: "application/pdf" })
      const url = URL.createObjectURL(pdfBlob)

      // Clean up
      document.body.removeChild(element)

      return url
    }

    // Generate the PDF and trigger download
    const pdfUrl = generatePDF()
    const a = document.createElement("a")
    a.setAttribute("href", pdfUrl)
    a.setAttribute("download", `confirmed-users-${date}.pdf`)
    a.click()

    // Clean up the URL object
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 100)

    toast( "The participant list has been downloaded as a PDF.")
  }

  return (
    <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
      <CardHeader className="bg-gray-800/80 border-b border-gray-700">
        <CardTitle className="text-gray-100">Lunch Participants</CardTitle>
        <CardDescription className="text-gray-400">View and manage lunch confirmations</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {menus.map((menu, index) => {
            const confirmedUsers = getConfirmedUsersByDate(menu.date)

            return (
              <MotionDiv
                key={menu.id}
                className="opacity-100"
                style={{
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <div className="border border-gray-700 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 bg-gray-800/30">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div>
                      <h3 className="font-medium text-gray-100">{menu.name}</h3>
                      <p className="text-sm text-gray-400">
                        {formatDate(menu.date)} ({menu.dayOfWeek})
                      </p>
                    </div>
                    <div className="flex items-center mt-2 md:mt-0">
                      <Badge className="mr-2 bg-gray-700 text-gray-300 border-gray-600">
                        <Users className="h-3 w-3 mr-1" />
                        {confirmedUsers.length} confirmed
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-700"
                        onClick={() => downloadConfirmedUsers(menu.date)}
                      >
                        <Download className="h-3 w-3 mr-1" /> Download PDF
                      </Button>
                    </div>
                  </div>

                  <div className="overflow-x-auto bg-gray-800 rounded-lg border border-gray-700">
                    <Table>
                      <TableHeader className="bg-gray-800/80">
                        <TableRow className="border-gray-700">
                          <TableHead className="text-gray-300">Name</TableHead>
                          <TableHead className="text-gray-300">Email</TableHead>
                          <TableHead className="text-gray-300">Status</TableHead>
                          <TableHead className="text-gray-300">Admin Approval</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {confirmedUsers.length > 0 ? (
                          confirmedUsers.map((user) => (
                            <TableRow
                              key={user.id}
                              className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                            >
                              <TableCell className="font-medium text-gray-200">{user.name}</TableCell>
                              <TableCell className="text-gray-300">{user.email}</TableCell>
                              <TableCell>
                                <Badge className="bg-green-900 text-green-300 border-green-700">Confirmed</Badge>
                              </TableCell>
                              <TableCell>
                                <Select
                                  defaultValue="Yes"
                                  onValueChange={(value) => {
                                    // In a real app, this would update the database
                                    toast( `Meal for ${user.name} has been ${value === "Yes" ? "approved" : "canceled"}.`)
                                  }}
                                >
                                  <SelectTrigger className="w-[80px] h-8 border-gray-600 bg-gray-700 text-gray-200">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent className="bg-gray-800 border-gray-700 text-gray-200">
                                    <SelectItem value="Yes">Yes</SelectItem>
                                    <SelectItem value="No">No</SelectItem>
                                  </SelectContent>
                                </Select>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow className="border-gray-700">
                            <TableCell colSpan={4} className="text-center text-gray-400 py-4">
                              No confirmed participants yet
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </MotionDiv>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
