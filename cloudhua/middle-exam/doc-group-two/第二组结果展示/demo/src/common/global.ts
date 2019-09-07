import { Exception } from "./exception";
import { JSONResponse } from "./response";
import stats from "./stats";

Exception.update(stats)

export function assert<T = {}>(conditions: boolean, message: string, data?: T) {
  if (conditions)
    return true;
  throw new Exception("assertError", message, data);
}

export function verify<T>(conditions: boolean, stat?: string, message?: string, data?: T) {
  if (conditions)
    return true;
  stat = stat || 'verifyError';
  throw new Exception(stat, message, data);
}

export function check<T>(resultOrResponse: string | JSONResponse, message?: string, data?: T) {
  let stat = resultOrResponse;
  let _data: any = data;
  if (typeof stat === 'string') {
    if (stat.toLocaleLowerCase() == "ok") {
      return true;
    }
    throw new Exception(stat, message, _data);
  } else {
    let newStat = stat.result || stat.stat
    if (newStat && newStat.toLocaleLowerCase() === "ok") {
      return true;
    }
    message = stat.msg;
    _data = (<any>stat).data || data;
    stat = newStat || "checkError";
    throw new Exception(stat, message, _data);
  }
}

export function checkStat(resData: JSONResponse) {
  return (resData.stat || resData.result).toLocaleLowerCase() === 'ok'
}