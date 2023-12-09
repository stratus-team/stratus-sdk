import { StratusError } from "./error";

export interface Config {
  apiKey: string;
}

export interface RateLimitConfigOptions {
  limit?: number;
  window?: number;
}

export default class Client {
  #apiKey: string;

  constructor(config: Config) {
    this.#apiKey = config.apiKey;
  }

  // rate limit method
  public async rateLimit(
    RateLimitOptions?: RateLimitConfigOptions,
  ): Promise<boolean> {
    const headers = new Headers();

    // optional Rate Limit config
    if (RateLimitOptions) {
      if (RateLimitOptions.limit) {
        headers.append("limit", String(RateLimitOptions.limit));
      }
      if (RateLimitOptions.window) {
        headers.append("window", String(RateLimitOptions.window));
      }
    }
    headers.append("X-Api-Key", this.#apiKey);
    headers.append("Content-Type", "application/json");

    // TODO: update URL
    const response = await fetch("http://127.0.0.1:3000/api/v1/ratelimit", {
      method: "post",
      headers: headers,
    });
    // 200 - successful
    if (response.ok) {
      return false;
    }
    // 429 - successful, but rate lmited
    if (response.status == 429) {
      return true;
    }

    // errors
    const cause = await response.text();
    throw new StratusError({
      code: response.status,
      cause: cause,
    });
  }
}
