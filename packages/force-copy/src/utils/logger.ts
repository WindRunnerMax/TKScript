const _global: typeof globalThis = (() => {
  if (typeof globalThis !== "undefined") return globalThis; // ES2020
  if (typeof window !== "undefined") return window; // Browser
  if (typeof global !== "undefined") return global; // Node
  if (typeof self !== "undefined") return self; // Worker
  return Function("return this")(); // Fallback
})();

export const log = _global.console.log;
export const warn = _global.console.warn;
export const error = _global.console.error;
export const trace = _global.console.trace;
export const LOG_LEVEL = { INFO: 0, WARNING: 1, ERROR: 2, DISABLE: 3 };

class Logger {
  public constructor(private level: number) {}

  public setLevel(level: typeof LOG_LEVEL[keyof typeof LOG_LEVEL]) {
    this.level = level;
  }

  public info(...args: unknown[]) {
    if (this.level <= LOG_LEVEL.INFO) {
      log("FC Log:", ...args);
    }
  }

  public trace(...args: unknown[]) {
    if (this.level <= LOG_LEVEL.INFO) {
      trace("FC Trace:", ...args);
    }
  }

  public warning(...args: unknown[]) {
    if (this.level <= LOG_LEVEL.WARNING) {
      warn("FC Warning:", ...args);
    }
  }

  public error(...args: unknown[]) {
    if (this.level <= LOG_LEVEL.ERROR) {
      error("FC Error:", ...args);
    }
  }
}

export const logger = new Logger(LOG_LEVEL.DISABLE);
