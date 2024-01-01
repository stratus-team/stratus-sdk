/**
 * Custom error class for Stratus API-related errors.
 * @class StratusError
 * @extends {Error}
 */
export class StratusError extends Error {
  /**
   * Error code associated with the error.
   * @type {number}
   */
  public readonly code: number;

  /**
   * Optional cause or additional information for the error.
   * @type {string | undefined}
   */
  public readonly cause?: string;

  /**
   * Constructs a new StratusError instance.
   * @param {object} params - Error parameters.
   * @param {number} params.code - The error code.
   * @param {string} [params.cause] - The cause of the error. Defaults to "Cause unavailable" if not provided.
   */
  constructor({ code, cause }: { code: number; cause?: string }) {
    super();
    this.code = code;
    this.cause = cause || "Cause unavailable";
  }
}
