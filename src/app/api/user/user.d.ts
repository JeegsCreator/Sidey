import { Project } from "../project/project";

export type User = {
  avatarUrl: string | null;
  id: string;
  links: string[] | null;
  name: string | null;
  twitterUser: string | null;
  username: string;
  avatarUrl: string | null;
  profileToProject: {
    projectId: string;
    userId: string;
    project: Project;
  }[];
};
