import * as log from './log';
import { Exception } from './exception'

export interface ErrorHandler {
  onError(stat:string, message:string, data:any):void
}

let __hander:ErrorHandler;

export function setErrorHandler(h:ErrorHandler){
  __hander = h;
}

/**
 * 显示接口請求失敗
 */
export function catchError(error: Exception | any) {  
  log.e("catchError", JSON.stringify(error));
  let stat = error.stat || "unkownError";
  let message = error.message || Exception.get(stat) ||
     (typeof error === 'string' ? 
        error : JSON.stringify(error));
  let data = error.data || error;

  if(__hander){
    __hander.onError(stat, message, data)
  }else{
    log.e(stat, message, data);
  }
}