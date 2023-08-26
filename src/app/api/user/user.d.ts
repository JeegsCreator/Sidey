import { profile, project } from "@prisma/client";

export type Profile = profile & {
  profileToProject: {
    projectId: string;
    userId: string;
    project: project;
  }[];
};
