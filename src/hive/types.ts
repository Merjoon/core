export type IHiveConfig = {
  apiKey: string;
  userId: string;
  workspaceId: string;
}

export enum HiveApiPath {
  Users = 'users',
  Actions = 'actions',
  Projects = 'projects',
}