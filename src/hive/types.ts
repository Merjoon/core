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

export interface IHiveUser {
  'id': string;
  'fullName': string;
  'email': string;
  'profile': {
    'firstName': string;
    'lastName': string;
  };
}

export interface IHiveAction {
  'id': string;
  'title': string;
  'simpleId': number;
  'workspace': string;
  'assignees': string[];
  'projectId': string;
  'archived': boolean;
  'deleted': boolean;
  'description': string;
  'createdAt': string;
  'modifiedAt': string;
  'createdBy': string;
  'modifiedBy': string;
  'followingUserIds': string[];
  'milestone': boolean;
  'status': string;
  'checkedDate': string;
  'completedBy': string;
  'hasSubactions': boolean;
  'labels': string[];
  'agileStoryPoints': number;
}

export interface IHiveProject {
  'id': string;
  'workspace': string;
  'name': string;
  'description': string;
  'startDate': string;
  'endDate': string;
  'accessOption': string;
  'sharingType': string;
  'members': string[];
  'template': boolean;
  'createdAt': string;
  'modifiedAt': string;
  'createdBy': string;
  'modifiedBy': string;
  'color': string;
  'parentProject': string;
  'budget': number;
  'archived': boolean;
  'simpleId': number;
}