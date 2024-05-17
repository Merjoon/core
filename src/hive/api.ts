import { HttpClient } from "../common/HttpClient";
import { HiveApiPath, IHiveConfig } from "./types";
import {IRequestConfig} from "../common/types";

export class HiveApi extends HttpClient {
  protected readonly apiKey: string;
  protected readonly userId: string;

  constructor(protected config: IHiveConfig) {
    const basePath = `https://app.hive.com/api/v1/workspaces/${config.workspaceId}`;
    super(basePath)
    this.apiKey = config.apiKey;
    this.userId = config.userId;
  }

  public sendRequest(path: HiveApiPath) {
    const config: IRequestConfig = {
      headers: {
        'api_key': `${this.apiKey}`
      }
    }

    return this.get({
      path,
      config,
      queryParams: {
        userId: this.userId,
      },
    })
  }
}