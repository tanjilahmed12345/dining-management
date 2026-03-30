import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-800 p-4 rounded-full mb-4">
        <Icon className="h-10 w-10 text-gray-500" />
      </div>
      <h3 className="text-lg font-medium text-gray-300 mb-1">{title}</h3>
      <p className="text-sm text-gray-400 text-center max-w-sm mb-6">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="bg-teal-600 hover:bg-teal-700">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
