export enum ProjectState {
  BUILDING = "BUILDING",
  ALPHA = "ALPHA",
  BETA = "BETA",
  LIVE = "LIVE",
  ABANDONED = "ABANDONED",
}

export type Project = {
  id: number;
  name: string;
  description: string;
  state: ProjectState;
  likes: number;
  figmaLink: string | null;
  githubLink: string | null;
  projectLink: string | null;
  createdAt: string;
};
