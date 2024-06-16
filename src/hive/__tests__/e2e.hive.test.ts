import { IMerjoonCollections, IMerjoonTasks, IMerjoonUsers } from "../../common/types";
import { HiveTransformer } from "../transformer";
import { HiveService } from "../service";
import { IHiveConfig } from "../types";
import { HiveApi } from "../api";

describe('e2e Hive', () => {
  let service: HiveService;

  beforeEach(() => {
    const config: IHiveConfig = {
      userId: process.env.HIVE_USER_ID!,
      apiKey: process.env.HIVE_API_KEY!,
      workspaceId: process.env.HIVE_WORKSPACE_ID!,
    }

    const api = new HiveApi(config);
    const transformer = new HiveTransformer()
    service = new HiveService(api, transformer);
  })

  it('getUsers', async () => {
    const users: IMerjoonUsers = await service.getUsers();

    expect(Object.keys(users[0])).toEqual(expect.arrayContaining([
      'id',
      'remote_id',
      'name',
      'email_address',
    ]));

    expect(users[0]).toEqual({
      id: expect.any(String),
      remote_id: expect.any(String),
      name: expect.any(String),
      email_address: expect.any(String),
    });
  });

  it('getProjects', async () => {
    const collections: IMerjoonCollections = await service.getCollections();

    expect(Object.keys(collections[0])).toEqual(expect.arrayContaining([
      'id',
      'remote_id',
      'name',
      'description',
      'remote_created_at',
      'remote_modified_at',
    ]));

    expect(collections[0]).toEqual({
      id: expect.any(String),
      remote_id: expect.any(String),
      name: expect.any(String),
      description: expect.any(String),
      remote_created_at: expect.any(String),
      remote_modified_at: expect.any(String),
    });
  })

  it('getTasks', async () => {
    const tasks: IMerjoonTasks = await service.getTasks();

    expect(Object.keys(tasks[0])).toEqual(expect.arrayContaining([
      'id',
      'remote_id',
      'name',
      'assignees',
      'status',
      'description',
      'collections',
      'remote_created_at',
      'remote_updated_at',
    ]));

    expect(tasks[0]).toEqual({
      id: expect.any(String),
      remote_id: expect.any(String),
      name: expect.any(String),
      status: expect.any(String),
      description: expect.any(String),
      remote_created_at: expect.any(String),
      remote_updated_at: expect.any(String),
      assignees: expect.arrayContaining([]), //expect.any(String)
      collections: expect.arrayContaining([]), //expect.any(String)
      // priority: expect.any(String),
    });
  })
})