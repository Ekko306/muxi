import { Exception } from "./exception";
import { JSONResponse } from "./response";

Exception.update({
  "assertError":"未知错误",
  "verifyError":"未知错误",
  "checkError":"未知错误"
})

export function assert<T = {}>(conditions:boolean, message:string, data?:T){
  if(conditions)
      return true;
  throw new Exception("assertError", message, data);
}

export function verify<T>(conditions:boolean, stat?:string, message?:string, data?:T){
  if(conditions)
      return true;
  stat = stat || 'verifyError';
  throw new Exception(stat, message, data);
}

export function check<T>(resultOrResponse:string|JSONResponse, message?:string, data?:T){
  let stat = resultOrResponse;
  let _data:any = data;
  if(typeof stat === 'string'){
    if(stat.toLocaleLowerCase() == "ok"){
      return true;
    }
    throw new Exception(stat, message, _data);
  }else{
    if(stat.result && stat.result.toLocaleLowerCase() === "ok"){
      return true;
    }
    message = stat.msg;
    _data = (<any>stat).data || data;
    stat = stat.result || "checkError";
    throw new Exception(stat, message, _data);
  }
}