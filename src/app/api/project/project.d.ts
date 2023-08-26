import { project } from "@prisma/client";

export enum ProjectState {
  BUILDING = "BUILDING",
  ALPHA = "ALPHA",
  BETA = "BETA",
  LIVE = "LIVE",
  ABANDONED = "ABANDONED",
}

export interface Project extends project {
  profileToProject: {
    profile: Pick<profile, "name" | "username" | "id">;
  }[];
}
