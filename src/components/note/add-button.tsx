import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "~/components/ui/tooltip";

export function AddButton() {
  return (
    <Dialog >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button asChild className="fixed bottom-3 ml-3 rounded-full px-2 py-2">
              <DialogTrigger>
                <Plus />
              </DialogTrigger>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Create a new note</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent className="overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
