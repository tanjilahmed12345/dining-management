"use client"

import React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { MenuItem } from "@/lib/types"
import { useParticipants } from "@/lib/hooks/use-participants"
import { CardGridSkeleton } from "@/components/ui/loading-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate } from "@/lib/utils"
import { toast } from "sonner"

interface ParticipantsManagementProps {
  menus: MenuItem[]
  isLoading: boolean
}

function MealParticipants({ menu }: { menu: MenuItem }) {
  const { participants, isLoading } = useParticipants(menu.date)

  const confirmedParticipants = participants.filter((p) => p.confirmed)

  return (
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
            {confirmedParticipants.length} confirmed
          </Badge>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
            onClick={() => {
              toast("Download will be available when connected to backend.")
            }}
          >
            <Download className="h-3 w-3 mr-1" /> Download PDF
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-gray-800 rounded-lg border border-gray-700 p-8">
          <div className="flex items-center justify-center">
            <div className="bg-gray-700 animate-pulse rounded h-4 w-48" />
          </div>
        </div>
      ) : (
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
              {confirmedParticipants.length > 0 ? (
                confirmedParticipants.map((participant) => (
                  <TableRow
                    key={participant.id}
                    className="hover:bg-gray-700/50 transition-colors duration-200 border-gray-700"
                  >
                    <TableCell className="font-medium text-gray-200">{participant.userName || "Unknown"}</TableCell>
                    <TableCell className="text-gray-300">{participant.userEmail || "-"}</TableCell>
                    <TableCell>
                      <Badge className="bg-green-900 text-green-300 border-green-700">Confirmed</Badge>
                    </TableCell>
                    <TableCell>
                      <Select
                        defaultValue={participant.adminApproval ? "Yes" : "No"}
                        onValueChange={(value) => {
                          toast(`Meal for ${participant.userName || "user"} has been ${value === "Yes" ? "approved" : "canceled"}.`)
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
      )}
    </div>
  )
}

export function ParticipantsManagement({ menus, isLoading }: ParticipantsManagementProps) {
  if (isLoading) {
    return (
      <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
        <CardHeader className="bg-gray-800/80 border-b border-gray-700">
          <CardTitle className="text-gray-100">Lunch Participants</CardTitle>
          <CardDescription className="text-gray-400">View and manage lunch confirmations</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <CardGridSkeleton count={3} />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
      <CardHeader className="bg-gray-800/80 border-b border-gray-700">
        <CardTitle className="text-gray-100">Lunch Participants</CardTitle>
        <CardDescription className="text-gray-400">View and manage lunch confirmations</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        {menus.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No menus available"
            description="Participants will appear here once menus are scheduled."
          />
        ) : (
          <div className="space-y-6">
            {menus.map((menu) => (
              <MealParticipants key={menu.id} menu={menu} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
