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

export enum HiveApiVersion {
  Version1 = 'v1',
  Version2 = 'v2',
}