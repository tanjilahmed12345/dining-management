"use client"

import React, { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Edit, Plus, Trash, Star } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { MenuItem } from "@/lib/types"
import { MenuDialog } from "@/components/admin/dialogs/MenuDialog"
import { MealScheduleDialog } from "@/components/admin/dialogs/MealScheduleDialog"
import { CardGridSkeleton } from "@/components/ui/loading-skeleton"
import { EmptyState } from "@/components/ui/empty-state"
import { formatDate } from "@/lib/utils"
import api from "@/lib/api/client"
import { toast } from "sonner"

interface MenuManagementProps {
  menus: MenuItem[]
  isLoading: boolean
  refetch: () => void
}

export function MenuManagement({ menus, isLoading, refetch }: MenuManagementProps) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [dialogType, setDialogType] = useState<"edit" | "new">("new")
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null)
  const [mealScheduleDialogOpen, setMealScheduleDialogOpen] = useState(false)
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    date: "",
    dayOfWeek: "",
    mealType: "",
    active: true,
  })

  const handleEditMenu = (menu: MenuItem) => {
    setEditingMenu(menu)
    setDialogType("edit")
    setDialogOpen(true)
  }

  const handleNewMenu = () => {
    setNewMenu({ name: "", description: "", date: new Date().toISOString().split("T")[0], dayOfWeek: "", mealType: "", active: true })
    setDialogType("new")
    setDialogOpen(true)
  }

  const deleteMenu = async (id: string) => {
    try {
      await api.delete(`/api/menus/${id}`)
      toast.success("Menu deleted.")
      refetch()
    } catch {
      toast.error("Failed to delete menu.")
    }
  }

  const toggleActive = async (menu: MenuItem, checked: boolean) => {
    try {
      await api.put(`/api/menus/${menu.id}`, { ...menu, active: checked })
      refetch()
    } catch {
      toast.error("Failed to update menu status.")
    }
  }

  if (isLoading) {
    return (
      <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
        <CardHeader className="bg-gray-800/80 border-b border-gray-700">
          <CardTitle className="text-gray-100">Menu Management</CardTitle>
          <CardDescription className="text-gray-400">Manage upcoming meals</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <CardGridSkeleton count={4} />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card className="border-gray-700 bg-gray-800/50 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between bg-gray-800/80 border-b border-gray-700">
          <div>
            <CardTitle className="text-gray-100">Menu Management</CardTitle>
            <CardDescription className="text-gray-400">Manage upcoming meals and weekly schedules</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setMealScheduleDialogOpen(true)} className="border-gray-600 text-gray-300 hover:bg-gray-700">
              <Calendar className="h-4 w-4 mr-2" /> Weekly Schedule
            </Button>
            <Button onClick={handleNewMenu} className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-2" /> Add Menu
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {menus.length === 0 ? (
            <EmptyState icon={Calendar} title="No menus scheduled" description="Get started by adding a new menu." actionLabel="Add Menu" onAction={handleNewMenu} />
          ) : (
            <div className="space-y-4">
              {menus.map((menu) => (
                <div key={menu.id} className="flex items-start justify-between border-b border-gray-700 pb-4 hover:bg-gray-700/30 p-2 rounded-lg transition-colors duration-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-100">{menu.name}</h3>
                      <Badge className="bg-gray-700 text-gray-300 border-gray-600">{formatDate(menu.date)}</Badge>
                      <Badge className="bg-gray-700 text-gray-300 border-gray-600">{menu.dayOfWeek}</Badge>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{menu.description}</p>
                    {menu.averageRating && menu.averageRating > 0 && (
                      <div className="flex items-center mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className={`h-3 w-3 ${star <= Math.round(menu.averageRating ?? 0) ? "text-amber-400 fill-amber-400" : "text-gray-600"}`} />
                        ))}
                        <span className="text-gray-400 text-xs ml-2">{menu.averageRating}/5</span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex items-center mr-2">
                      <Label htmlFor={`active-${menu.id}`} className="mr-2 text-sm text-gray-400">
                        {menu.active ? "Meal On" : "Meal Off"}
                      </Label>
                      <Switch id={`active-${menu.id}`} checked={menu.active} onCheckedChange={(checked) => toggleActive(menu, checked)} />
                    </div>
                    <Button variant="outline" size="icon" className="border-gray-600 text-gray-300 hover:bg-gray-700" onClick={() => handleEditMenu(menu)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="border-red-800 text-red-400 hover:bg-red-900/30" onClick={() => deleteMenu(menu.id)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <MenuDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        dialogType={dialogType}
        editingMenu={editingMenu}
        setEditingMenu={setEditingMenu}
        newMenu={newMenu}
        setNewMenu={setNewMenu}
        onSaved={refetch}
      />
      <MealScheduleDialog open={mealScheduleDialogOpen} onOpenChange={setMealScheduleDialogOpen} onSaved={refetch} />
    </>
  )
}
