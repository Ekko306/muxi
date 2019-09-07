import moment from 'moment'

/**
 * 格式化时间/格式YYYY/MM/DD HH:mm:ss 
 * 这样的格式在safari上兼容性更好
 * @param milliseconds 毫秒级
 * @param formatType 0，精确到秒；1，精确到分；2，精确到日
 */
export function formatDateTime(milliseconds: number, formatType: number) {
    let time: string[] = ["YYYY/MM/DD HH:mm:ss", "YYYY/MM/DD HH:mm", "YYYY/MM/DD"]
    return moment(milliseconds).format(time[formatType] || "YYYY/MM/DD HH:mm:ss");
}

/**
 * 加密
 */
export function encode(str: string) {
    let newStr = window.btoa(encodeURIComponent(str))
    return newStr
}
/**
 * 解密
 */
export function decode(str: string) {
    let newStr = decodeURIComponent(window.atob(str))
    return newStr
}

/**
 * 对金额进行格式化（加w和，）
 * @param num 金额需要传以分为单位的值
 */
export function formatMoney(num: number) {
    //将价格变为以元为单位
    num = num / 100
    if (num >= 10000) {
        var num1 = ((num / 10000).toFixed(2)).toLocaleString()
        return (num1 + 'w')
    } else {
        return (num.toLocaleString())
    }
}

/**
  * 修改浏览器titile
  */
export function setTitle(title: string) {
    document.title = title;
}

/**
   * 分段数组
   */
export function sliceArray(array: any, size: number) {
    var result = [];
    for (var x = 0; x < Math.ceil(array.length / size); x++) {
        var start = x * size;
        var end = start + size;
        result.push(array.slice(start, end));
    }
    return result;
}

export function joinParams(params: object) {
    let arr = [];
    for (let key in params) {
        arr.push(`${key}=${params[key]}`)
    }
    return arr.join('&');
}

export function getDayFirstTime() {
    var date = new Date()
    date.setHours(0, 0, 0, 0)
    return date.getTime()
}
export function getDayEndTime() {
    var date = new Date()
    date.setHours(23, 59, 59, 999)
    return date.getTime()
}