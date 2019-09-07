//快速排序，用于按时间排序
function quickSort(arr: number[]): number[] {
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [] as number[];
    var right = [] as number[];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}



//创建文件类
class file {
    name: string;
    type: number;
    size: number;
    timeSta: number;
    timeCha: number;
    subfile: file[];
    constructor(name: string, type: number, size: number, timeSta: number, timeCha: number, subfile: file[]) {
        this.name = name;
        this.type = type;
        //1表示文件夹，2表示文件
        this.size = size;
        this.timeSta = timeSta;
        this.timeCha = timeCha;
        this.subfile = subfile;
    }
    //按照类型排序
    listByType(): void {
        if (this.type === 2)
            console.log(`${this.name}是文件类型，无子文件！`);
        else {
            console.log("按照类型排序（文件夹在前，文件在后）");
            let type1: file[], type2: file[];
            let i: number, j1: number = 0, j2: number = 0;
            if (type1 === undefined) type1 = []
            if (type2 === undefined) type2 = []
            for (i = 0; i < this.subfile.length; i++) {
                if (this.subfile[i].type === 1)
                    type1[j1++] = this.subfile[i];
                else
                    type2[j2++] = this.subfile[i];
            }
            let log: file;
            for (log of type1)
                console.log(log.name);
            for (log of type2)
                console.log(log.name);
        }
    }
    //按照修改时间排序
    listByTime(): void {
        if (this.type === 2)
            console.log(`${this.name}是文件类型，无子文件！`);
        else {
            console.log("按照时间排序（修改时间前在首位）");
            let i: number, j: number;
            let subfileNum: number = this.subfile.length;
            let subTimeOrd: number[];
            if (subTimeOrd === undefined)
                subTimeOrd = []
            for (i = 0; i < subfileNum; i++)
                subTimeOrd[i] = this.subfile[i].timeCha;
            subTimeOrd = quickSort(subTimeOrd);
            let order: number;
            i = 0;
            for (order of subTimeOrd) {
                for (i = 0; i < subfileNum; i++) {
                    if (this.subfile[i].timeCha === order)
                        console.log(this.subfile[i].name);
                }
            }
        }
    }


    //找到该文件夹中名字为name的文件夹的子文件
    find(name: string): any {
        let i: number;
        let temp: file;
        for (i = 0; i < this.subfile.length; i++) {
            if (this.subfile[i].name === name)
                temp = this.subfile[i];
        }
        if (temp === undefined) console.log(`${this.name}文件夹中不存在名字为${name}的文件夹！`)
        else {
            console.log(`${this.name}文件夹中名字为${name}的文件夹中的文件是：`)
            let Name: file;
            for (Name of temp.subfile)
                console.log(Name.name);
        }
    }
}


//要求实例
let b = new file("index.html", 1, 1, 999, 1000, []);
let a = new file("mobile", 1, 1, 1000, 1001, [b]);

//测试list()与find(name)实例
let basejs = new file("base.js", 2, 4, 426000000, 427100312, [])
let bulbhtml = new file("bulb.html", 2, 4, 426000000, 430115900, [])
let bulboff = new file("pic_bulboff.gif", 2, 4, 426000000, 427100336, [])
let bulbon = new file("pic_bulbon.gif", 2, 4, 426000000, 427100349, [])
let images = new file("images", 1, 5, 426000000, 427100313, [bulboff, bulbon])
let listhtml = new file("list.html", 2, 4, 426000000, 427100329, [])
let ex = new file("ex", 1, 16, 426000000, 430115217, [basejs, bulbhtml, images, listhtml])
let exmd = new file("ex.md", 2, 4, 426000000, 430041000, [])
let readme = new file("readme.md", 2, 4, 426000000, 427100300, [])
let javascript = new file("1.2.1javascript", 1, 24, 426000000, 427033907, [ex, exmd, readme])


ex.listByTime()          //是文件夹检验按照时间排序子文件
ex.listByType()          //是文件夹检验按照类型排序子文件
exmd.listByTime()        //不是文件夹检验报错

console.log('\n')

javascript.find("ex")    
ex.find("images")        //检验查找方法
javascript.find("ab")    //检验查找不到文件夹内的子文件夹报错

