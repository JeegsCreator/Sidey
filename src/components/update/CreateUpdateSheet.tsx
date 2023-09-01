"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CreateUpdateForm from "../updates/CreteUpdateForm";
import { useState } from "react";

type CreateUpdateSheetProps = {
  projectId: number | string;
};

const CreateUpdateSheet = ({ projectId }: CreateUpdateSheetProps) => {
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <Button className="flex gap-2">
          <PlusIcon size={18} /> Add Update
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[40vw] sm:max-w-[40vw]">
        <SheetHeader>
          <SheetTitle>Add update</SheetTitle>
          <SheetDescription>
            Let&apos;s share your last updates!
          </SheetDescription>
          <CreateUpdateForm projectId={projectId} closeSheet={closeSheet} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default CreateUpdateSheet;
