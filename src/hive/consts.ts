import {IMerjoonTransformConfig} from "../common/types";

export const TRANSFORM_CONFIG: IMerjoonTransformConfig = {
  collections: {
    id: 'UUID("id")',
    remote_id: 'id',
    name: 'name',
    description: 'description',
    remote_created_at: 'createdAt',
    remote_modified_at: 'modifiedAt',
  },
  users: {
    id: 'UUID("id")',
    remote_id: 'id',
    name: 'fullName',
    email_address: 'email',
  },
  tasks: {
    id: 'UUID("id")',
    remote_id: 'id',
    name: 'title',
    '[assignees]': 'UUID("creator-id")',
    status: 'status',
    description: 'description',
    '[collections]': 'UUID("project-id")', //!?
    remote_created_at: 'createdAt',
    remote_updated_at: 'modifiedAt',
    priority: 'priority->name',
  },
}