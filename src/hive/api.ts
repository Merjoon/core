import { HiveApiPath, HiveApiVersion, IHiveConfig } from "./types";
import { HttpClient } from "../common/HttpClient";
import { IRequestConfig } from "../common/types";

export class HiveApi extends HttpClient {
  protected readonly workspaceId: string;
  protected readonly apiKey: string;
  protected readonly userId: string;

  constructor(protected config: IHiveConfig) {
    const basePath = `https://app.hive.com/`;
    super(basePath);

    this.workspaceId = config.workspaceId;
    this.apiKey = config.apiKey;
    this.userId = config.userId;
  };

  public sendRequest(path: HiveApiPath, version: HiveApiVersion) {
    const config: IRequestConfig = {
      headers: {
        'api_key': `${this.apiKey}`,
      },
    };

    const endpoint = `api/${version}/workspaces/${this.workspaceId}/${path}`;

    return this.get({
      path: endpoint,
      config,
      queryParams: {
        userId: this.userId,
      },
    });
  };
}