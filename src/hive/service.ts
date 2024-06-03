import { IMerjoonCollections, IMerjoonService, IMerjoonTasks, IMerjoonUsers } from "../common/types";
import { HiveApiPath, HiveApiVersion } from "./types";
import { HiveTransformer } from "./transformer";
import { HiveApi } from "./api";

export class HiveService implements IMerjoonService {
  constructor(public readonly api: HiveApi, public readonly transformer: HiveTransformer) {
  }

  protected async* getProjectsDataFromApi(first: number) {
    let endCursor: string | undefined;
    let shouldStop: boolean = false;

    let queryParams: {first: number, after?: string} = {
      first,
    };

    do {
      if (endCursor) {
        queryParams.after = endCursor;
      }

      try {
        const response = await this.api.sendRequest(HiveApiPath.Projects, HiveApiVersion.Version2, queryParams);

        yield  response['edges'].map(({node}: { node: object }): object => node);

        endCursor = response['pageInfo']['endCursor'];
        shouldStop = !response['pageInfo']['hasNextPage'];
      } catch (e: any) {
        throw new Error(e.message);
      }
    } while (!shouldStop)
  }

  protected async* getActionsDataFromApi(first: number) {
    let endCursor: string | undefined;
    let shouldStop: boolean = false;

    let queryParams: {first: number, after?: string} = {
      first,
    };

    do {
      if (endCursor) {
        queryParams.after = endCursor;
      }

      try {
        const response = await this.api.sendRequest(HiveApiPath.Actions, HiveApiVersion.Version2, queryParams);

        yield  response['edges'].map(({node}: { node: object }): object => node);

        endCursor = response['pageInfo']['endCursor'];
        shouldStop = !response['pageInfo']['hasNextPage'];
      } catch (e: any) {
        throw new Error(e.message);
      }
    } while (!shouldStop)
  }

  protected async getOwnUsers() {
    return await this.api.sendRequest(HiveApiPath.Users, HiveApiVersion.Version1);
  }

  protected async getOwnProjects(first: number = 200) {
    const iterator: AsyncGenerator<any> =  this.getProjectsDataFromApi(first);
    let projects: any[] = [];

    for await (const nextItem of iterator) {
      projects = projects.concat(nextItem);
    }

    return projects;
  }

  protected async getOwnActions(first: number = 200) {
    const iterator: AsyncGenerator<any> =  this.getActionsDataFromApi(first);
    let actions: any[] = [];

    for await (const nextItem of iterator) {
      actions = actions.concat(nextItem);
    }

    return actions;
  }

  public async getUsers(): Promise<IMerjoonUsers> {
    const people = await this.getOwnUsers();
    return this.transformer.transformUsers(people);
  }

  public async getCollections(): Promise<IMerjoonCollections> {
    const projects = await this.getOwnProjects();
    return this.transformer.transformProjects(projects);
  }

  public async getTasks(): Promise<IMerjoonTasks> {
    const tasks = await this.getOwnActions();
    return this.transformer.transformTasks(tasks);
  }
}