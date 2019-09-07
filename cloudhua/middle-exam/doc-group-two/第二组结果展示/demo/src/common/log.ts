export enum LOG_LEVEL {
  DEBUG = 1,
  INFO,
  WARN,
  ERROR
}

export interface ILogger {
  log(type: string, ...args: any[]): void
}

export class SimpleLogger implements ILogger {
  log(type: string, ...args: any[]) {
    console.log(type, ...args);
  }
}

let _level: LOG_LEVEL = LOG_LEVEL.DEBUG;
let _logger: ILogger = new SimpleLogger();

export function init(level: LOG_LEVEL = LOG_LEVEL.DEBUG, logger?: ILogger) {
  _level = level
  _logger = logger || new SimpleLogger();
  console.log(logger);
}

export function d(...args: any[]): void {
  if (_level <= LOG_LEVEL.DEBUG)
    _logger.log("DEBUG", ...args);
}

export function i(...args: any[]): void {
  if (_level <= LOG_LEVEL.INFO)
    _logger.log("INFO", ...args);
}

export function w(...args: any[]): void {
  if (_level <= LOG_LEVEL.WARN)
    _logger.log("WARN", ...args);
}

export function e(...args: any[]): void {
  if (_level <= LOG_LEVEL.ERROR)
    _logger.log("ERROR", ...args);
}

export function r(...args: any[]): void {
  _logger.log("REPORT", ...args);
}