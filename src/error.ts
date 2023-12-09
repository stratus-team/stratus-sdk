export class StratusError extends Error {
  public readonly code: number;
  public readonly cause?: string;

  constructor({ code, cause }: { code: number; cause?: string }) {
    super();
    this.code = code;
    this.cause = cause || "Cause unavailable";
  }
}
