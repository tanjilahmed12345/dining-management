"use client"
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
import { Save } from "lucide-react"
import { toast } from "sonner"
// import { toast } from "@/components/ui/use-toast"

export function MenuDialog({
  open,
  onOpenChange,
  dialogType,
  editingMenu,
  setEditingMenu,
  newMenu,
  setNewMenu,
  setMenus,
}) {
  // Save menu changes
  const saveMenuChanges = () => {
    if (dialogType === "edit" && editingMenu) {
      setMenus((prev) => prev.map((item) => (item.id === editingMenu.id ? editingMenu : item)))
      toast("The menu has been updated successfully.")
    } else if (dialogType === "new") {
      const newId = `new-${Date.now()}`
      const date = new Date(newMenu.date)
      const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" })

      setMenus((prev) => [
        ...prev,
        {
          ...newMenu,
          id: newId,
          dayOfWeek,
          mealType: newMenu.name,
        },
      ])
      toast("A new menu has been created successfully.")
    }
    onOpenChange(false)
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
            <Label htmlFor="menu-name" className="text-right text-gray-300">
              Name
            </Label>
            <Input
              id="menu-name"
              value={dialogType === "edit" ? editingMenu?.name : newMenu.name}
              onChange={(e) =>
                dialogType === "edit"
                  ? setEditingMenu({ ...editingMenu, name: e.target.value })
                  : setNewMenu({ ...newMenu, name: e.target.value })
              }
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="menu-date" className="text-right text-gray-300">
              Date
            </Label>
            <Input
              id="menu-date"
              type="date"
              value={dialogType === "edit" ? editingMenu?.date : newMenu.date}
              onChange={(e) =>
                dialogType === "edit"
                  ? setEditingMenu({ ...editingMenu, date: e.target.value })
                  : setNewMenu({ ...newMenu, date: e.target.value })
              }
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="menu-description" className="text-right text-gray-300">
              Description
            </Label>
            <Textarea
              id="menu-description"
              value={dialogType === "edit" ? editingMenu?.description : newMenu.description}
              onChange={(e) =>
                dialogType === "edit"
                  ? setEditingMenu({ ...editingMenu, description: e.target.value })
                  : setNewMenu({ ...newMenu, description: e.target.value })
              }
              className="col-span-3 border-gray-600 bg-gray-700 text-gray-200"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="menu-active" className="text-right text-gray-300">
              Meal Status
            </Label>
            <div className="col-span-3 flex items-center">
              <Switch
                id="menu-active"
                checked={dialogType === "edit" ? editingMenu?.active !== false : newMenu.active !== false}
                onCheckedChange={(checked) =>
                  dialogType === "edit"
                    ? setEditingMenu({ ...editingMenu, active: checked })
                    : setNewMenu({ ...newMenu, active: checked })
                }
              />
              <span className="ml-2 text-gray-300">
                {dialogType === "edit"
                  ? editingMenu?.active !== false
                    ? "Meal On"
                    : "Meal Off"
                  : newMenu.active !== false
                    ? "Meal On"
                    : "Meal Off"}
              </span>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button onClick={saveMenuChanges} className="bg-teal-600 hover:bg-teal-700">
            <Save className="h-4 w-4 mr-2" />
            {dialogType === "edit" ? "Save Changes" : "Add Menu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
