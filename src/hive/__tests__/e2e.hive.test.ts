import { HiveService } from "../service";
import {IHiveConfig} from "../types";
import {HiveApi} from "../api";
import {HiveTransformer} from "../transformer";
import {IMerjoonCollections, IMerjoonTasks, IMerjoonUsers} from "../../common/types";

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

    console.log('users: ', users);
  });

  it('getProjects', async () => {
    const collections: IMerjoonCollections = await service.getCollections();

    console.log('collections: ', collections);
  })

  it('getTasks', async () => {
    const tasks: IMerjoonTasks = await service.getTasks();

    console.log('tasks: ', tasks)
  })
})