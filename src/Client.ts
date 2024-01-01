import { StratusError } from "./error";

/**
 * Configuration interface for API settings.
 * @interface Config
 * @property {string} apiKey - The API key for authentication.
 * @property {string} apiURL - The base URL of the API.
 */
export interface Config {
  apiKey: string;
  apiURL: string; // need this for now to prevent frequent changeset updates.
}

/**
 * RateLimitConfigOptions interface defines the configuration options for rate limiting.
 */
export interface RateLimitConfigOptions {
  /**
   * The maximum number of requests allowed within a specified window of time.
   * Default: 5 requests per second if not specified.
   */
  limit?: number;

  /**
   * The length of the time window in seconds during which the requests are counted.
   * Default: 1 second if not specified.
   */
  window?: number;
}

export default class Client {
  #apiKey: string;
  #apiURL: string;

  /**
   * @constructor
   * @param {Config} Config interface requires apiKey and apiUrl.
   */
  constructor(config: Config) {
    this.#apiKey = config.apiKey;
    this.#apiURL = config.apiURL;
  }

  /**
   * Rate limit method
   * @param RateLimitOptions Optional configuration options for rate limiting.
   * @returns {Promise<boolean>} Promise resolves to a boolean, true if rate limited & false if not rate limited
   *
   */
  public async rateLimit(
    RateLimitOptions?: RateLimitConfigOptions
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

    const response = await fetch(this.#apiURL, {
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
