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
  public async rateLimit(RateLimitOptions?: RateLimitConfigOptions) {
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

    const response = await fetch("http://127.0.0.1:3000/api/v1/ratelimit", {
      method: "post",
      headers: headers,
    });
    const data = await response.json();
    console.log(data);
  }
}

const client = new Client({
  apiKey: "your-api-key",
});

console.log(client);
// testing stuff...
client.rateLimit();
