import { tt, Exception, log } from ".";

interface Option<U = any> {
  url: string
  data?: U
  method?: 'POST' | 'GET'
}

export function toQueryString<T>(data:T){
  let arr: string[] = []
  for (let key in data) {
    if(data !== null)
      arr.push(`${key}=${data[key]}`)
  }
  return arr.join('&')
}

function toResponse(error:any){
  let result = error.stat ? error.stat : "networkError"
  let data = error.data ? error.data : error;
  let msg = error.msg ? error.msg : (error.data && error.data.msg ? error.data.msg : "");
  return {result, data, msg}
}

function request<T = any, U = any>(option: Option<U>): Promise<T> {
  return new Promise((resolve, reject) => {
    let url = option.url
    let method = option.method || 'POST'
    let data = ''
    let xhr = new XMLHttpRequest()

    if (method === 'POST' && option.data) {
      data = JSON.stringify(option.data)
    }
    if (method === 'GET' && option.data) {
      url = `${url}?${toQueryString(option.data)}`
    }

    xhr.onload = () => {
      try {
        let code = xhr.status;
        tt.verify(code !== 400, 'paramsError', "", xhr.responseText)
        tt.verify(code !== 401, 'sidError', "", xhr.responseText)
        tt.verify(code !== 500, 'serverError', "", xhr.responseText)
        tt.verify(code === 200, 'networkError', "", xhr.responseText);
        let res = JSON.parse(xhr.responseText)
        tt.verify(!!res.result, "networkError", "", res.data || res);
        log.d("http", ":ok ===>", url, data, res);
        resolve(res)
      } catch (e) {
        let res = toResponse(e);
        log.d("http", ":failed ===>", url, data, res);
        resolve(res as any);
      }
    }

    xhr.onerror = (e:any) => {
      let res = toResponse(e);
      log.d("http", ":failed ===>", url, data, res);
      resolve(res as any);
    }

    xhr.open(method, url)
    xhr.send(data)
  })
}

/**
 * HTTP POST请求方法
 * @param url
 * @param data
 */
export function post<T = any, U = any>(url: string, data?: any) {
  return request<T, U>({
    url,
    data,
    method: 'POST'
  })
}

/**
 * HTTP GET请求方法
 * @param url
 * @param data
 */
export function get<T, U>(url: string, data?: any) {
  return request({
    url,
    data,
    method: 'GET'
  })
}
