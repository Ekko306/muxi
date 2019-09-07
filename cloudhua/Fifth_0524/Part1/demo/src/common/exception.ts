
export interface Stats{
  [index:string]:string
}

const __stats:Map<string,string> = new Map();

export class Exception<T= {}> {
  stat:string
  message:string
  data?:T

  constructor(result:string, message?:string, data?:T){
    this.stat = result || "localException";
    this.message = message || __stats.get(result) || result;
    this.data = data;
  }

  static get(stat:string){
    return __stats.get(stat);
  }
  
  static update(stats:Stats){
    for(let k in stats){
      __stats.set(k, stats[k]);
    }
  }
}

__stats.set("ok", "ok");
__stats.set("localException", "未知错误");
__stats.set("networkError", "网络异常");

