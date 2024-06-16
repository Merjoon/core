import { IMerjoonCollections, IMerjoonService, IMerjoonTasks, IMerjoonUsers } from "../common/types";
import {HiveApiPath, HiveApiVersion, IHiveAction, IHiveProject, IHiveUser} from "./types";
import { HiveTransformer } from "./transformer";
import { HiveApi } from "./api";

export class HiveService implements IMerjoonService {
  constructor(public readonly api: HiveApi, public readonly transformer: HiveTransformer) {
  }

  protected async* getAllRecordsIterator<T>(path: HiveApiPath, first: number) {
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
        const response = await this.api.sendRequest(path, HiveApiVersion.Version2, queryParams);
        const data: T[] = response['edges'].map(({node}: { node: object }): object => node)

        yield data;

        endCursor = response['pageInfo']['endCursor'];
        shouldStop = !response['pageInfo']['hasNextPage'];
      } catch (e: any) {
        throw new Error(e.message);
      }
    } while (!shouldStop)
  }

  protected async getAllRecords<T>(path: HiveApiPath, first: number = 200) {
    const iterator: AsyncGenerator<any> = this.getAllRecordsIterator<T>(path, first);
    let records: T[] = [];

    for await (const nextChunk of iterator) {
      records = records.concat(nextChunk);
    }

    return records;
  }

  protected async getOwnUsers<T>() {
    const users: T[] = await this.api.sendRequest(HiveApiPath.Users, HiveApiVersion.Version1);

    return users;
  }

  public async getUsers(): Promise<IMerjoonUsers> {
    const people = await this.getOwnUsers<IHiveUser>();
    return this.transformer.transformUsers(people);
  }

  public async getCollections(): Promise<IMerjoonCollections> {
    const projects = await this.getAllRecords<IHiveProject>(HiveApiPath.Projects);
    return this.transformer.transformProjects(projects);
  }

  public async getTasks(): Promise<IMerjoonTasks> {
    const actions = await this.getAllRecords<IHiveAction>(HiveApiPath.Actions);
    return this.transformer.transformTasks(actions);
  }
}