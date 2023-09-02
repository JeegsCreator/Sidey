import { project, update } from "@prisma/client";

export enum ProjectState {
  BUILDING = "BUILDING",
  ALPHA = "ALPHA",
  BETA = "BETA",
  LIVE = "LIVE",
  ABANDONED = "ABANDONED",
}

export interface Update extends update {}

export interface UpdateWithProject extends update {
  project: project;
}

export interface Project extends project {
  profileToProject: {
    profile: Pick<profile, "name" | "username" | "id">;
  }[];
}
