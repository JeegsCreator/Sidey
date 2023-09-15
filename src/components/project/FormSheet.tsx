"use client";

import { PenIcon } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useState } from "react";
import ButtonIcon from "../shared/ButtonIcon";
import { Project } from "@/app/api/project/project";
import EditFormProject from "./EditForm";

type ProjectFormSheetProps = {
  project: Project;
};

const ProjectFormSheet = ({ project }: ProjectFormSheetProps) => {
  const [open, setOpen] = useState(false);

  const closeSheet = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger>
        <ButtonIcon
          Icon={PenIcon}
          size={12}
          variant="ghost"
          className="text-slate-400 opacity-0 invisible group-hover:opacity-100 group-hover:visible"
        />
      </SheetTrigger>
      <SheetContent className="h-full sm:max-h-full" side="bottom">
        <SheetHeader>
          <SheetTitle>Edit Project</SheetTitle>

          <EditFormProject project={project} closeSheet={closeSheet} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default ProjectFormSheet;
