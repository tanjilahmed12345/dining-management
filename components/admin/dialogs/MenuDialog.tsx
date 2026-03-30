"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Loader2, Save } from "lucide-react"
import type { MenuItem } from "@/lib/types"
import api from "@/lib/api/client"
import { toast } from "sonner"

interface MenuDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  dialogType: "edit" | "new"
  editingMenu: MenuItem | null
  setEditingMenu: React.Dispatch<React.SetStateAction<MenuItem | null>>
  newMenu: { name: string; description: string; date: string; dayOfWeek: string; mealType: string; active: boolean }
  setNewMenu: React.Dispatch<
    React.SetStateAction<{ name: string; description: string; date: string; dayOfWeek: string; mealType: string; active: boolean }>
  >
  onSaved: () => void
}

export function MenuDialog({
  open,
  onOpenChange,
  dialogType,
  editingMenu,
  setEditingMenu,
  newMenu,
  setNewMenu,
  onSaved,
}: MenuDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const saveMenuChanges = async () => {
    setIsSubmitting(true)
    try {
      if (dialogType === "edit" && editingMenu) {
        await api.put(`/api/menus/${editingMenu.id}`, editingMenu)
        toast.success("Menu updated successfully.")
      } else if (dialogType === "new") {
        const date = new Date(newMenu.date)
        const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" })
        await api.post("/api/menus", {
          ...newMenu,
          dayOfWeek,
          mealType: newMenu.name,
        })
        toast.success("New menu created successfully.")
      }
      onOpenChange(false)
      onSaved()
    } catch {
      toast.error("Failed to save menu. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gray-800 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-100">
            {dialogType === "edit" ? "Edit Menu Item" : "Add New Menu Item"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {dialogType === "edit" ? "Make changes to the menu item" : "Add a new menu item for an upcoming day"}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="menu-name" className="text-right text-gray-300">Name</Label>
            <Input
              id="menu-name"
              value={dialogType === "edit" ? editingMenu?.name : newMenu.name}
              onChange={(e) =>
                dialogType === "edit" && editingMenu
                  ? setEditingMenu({ ...editingMenu, name: e.target.value })
                  : setNewMenu({ ...newMenu, name: e.target.value })
              }
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="menu-date" className="text-right text-gray-300">Date</Label>
            <Input
              id="menu-date"
              type="date"
              value={dialogType === "edit" ? editingMenu?.date : newMenu.date}
              onChange={(e) =>
                dialogType === "edit" && editingMenu
                  ? setEditingMenu({ ...editingMenu, date: e.target.value })
                  : setNewMenu({ ...newMenu, date: e.target.value })
              }
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="menu-description" className="text-right text-gray-300">Description</Label>
            <Textarea
              id="menu-description"
              value={dialogType === "edit" ? editingMenu?.description : newMenu.description}
              onChange={(e) =>
                dialogType === "edit" && editingMenu
                  ? setEditingMenu({ ...editingMenu, description: e.target.value })
                  : setNewMenu({ ...newMenu, description: e.target.value })
              }
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="menu-active" className="text-right text-gray-300">Meal Status</Label>
            <div className="col-span-3 flex items-center">
              <Switch
                id="menu-active"
                checked={dialogType === "edit" ? editingMenu?.active !== false : newMenu.active !== false}
                onCheckedChange={(checked) =>
                  dialogType === "edit" && editingMenu
                    ? setEditingMenu({ ...editingMenu, active: checked })
                    : setNewMenu({ ...newMenu, active: checked })
                }
              />
              <span className="ml-2 text-gray-300">
                {(dialogType === "edit" ? editingMenu?.active !== false : newMenu.active !== false) ? "Meal On" : "Meal Off"}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} className="border-gray-600 text-gray-300 hover:bg-gray-700">
            Cancel
          </Button>
          <Button onClick={saveMenuChanges} className="bg-teal-600 hover:bg-teal-700" disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
            {dialogType === "edit" ? "Save Changes" : "Add Menu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
