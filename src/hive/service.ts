import {IMerjoonCollections, IMerjoonService, IMerjoonTasks, IMerjoonUsers} from "../common/types";
import {HiveApi} from "./api";
import {HiveTransformer} from "./transformer";
import {HiveApiPath} from "./types";

export class HiveService implements IMerjoonService {
  constructor(public readonly api: HiveApi, public readonly transformer: HiveTransformer) {
  }

  protected async getOwnUsers() {
    return await this.api.sendRequest(HiveApiPath.Users);
  }

  protected async getOwnProjects() {
    return await this.api.sendRequest(HiveApiPath.Projects);
  }

  protected async getOwnActions() {
    return await this.api.sendRequest(HiveApiPath.Actions);
  }

  public async getCollections(): Promise<IMerjoonCollections> {
    const projects = await this.getOwnProjects();
    return this.transformer.transformProjects(projects)
  }

  public async getUsers(): Promise<IMerjoonUsers> {
    const people = await this.getOwnUsers();
    return this.transformer.transformUsers(people)
  }

  public async getTasks(): Promise<IMerjoonTasks> {
    const tasks = await this.getOwnActions();
    return this.transformer.transformTasks(tasks)
  }
}