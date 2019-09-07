function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));
}
var file = (function () {
    function file(name, type, size, timeSta, timeCha, subfile) {
        this.name = name;
        this.type = type;
        this.size = size;
        this.timeSta = timeSta;
        this.timeCha = timeCha;
        this.subfile = subfile;
    }
    file.prototype.listByType = function () {
        if (this.type === 2)
            console.log(this.name + "\u662F\u6587\u4EF6\u7C7B\u578B\uFF0C\u65E0\u5B50\u6587\u4EF6\uFF01");
        else {
            console.log("按照类型排序（文件夹在前，文件在后）");
            var type1 = void 0, type2 = void 0;
            var i = void 0, j1 = 0, j2 = 0;
            if (type1 === undefined)
                type1 = [];
            if (type2 === undefined)
                type2 = [];
            for (i = 0; i < this.subfile.length; i++) {
                if (this.subfile[i].type === 1)
                    type1[j1++] = this.subfile[i];
                else
                    type2[j2++] = this.subfile[i];
            }
            var log = void 0;
            for (var _i = 0, type1_1 = type1; _i < type1_1.length; _i++) {
                log = type1_1[_i];
                console.log(log.name);
            }
            for (var _a = 0, type2_1 = type2; _a < type2_1.length; _a++) {
                log = type2_1[_a];
                console.log(log.name);
            }
        }
    };
    file.prototype.listByTime = function () {
        if (this.type === 2)
            console.log(this.name + "\u662F\u6587\u4EF6\u7C7B\u578B\uFF0C\u65E0\u5B50\u6587\u4EF6\uFF01");
        else {
            console.log("按照时间排序（修改时间前在首位）");
            var i = void 0, j = void 0;
            var subfileNum = this.subfile.length;
            var subTimeOrd = void 0;
            if (subTimeOrd === undefined)
                subTimeOrd = [];
            for (i = 0; i < subfileNum; i++)
                subTimeOrd[i] = this.subfile[i].timeCha;
            subTimeOrd = quickSort(subTimeOrd);
            var order = void 0;
            i = 0;
            for (var _i = 0, subTimeOrd_1 = subTimeOrd; _i < subTimeOrd_1.length; _i++) {
                order = subTimeOrd_1[_i];
                for (i = 0; i < subfileNum; i++) {
                    if (this.subfile[i].timeCha === order)
                        console.log(this.subfile[i].name);
                }
            }
        }
    };
    file.prototype.find = function (name) {
        var i;
        var temp;
        for (i = 0; i < this.subfile.length; i++) {
            if (this.subfile[i].name === name)
                temp = this.subfile[i];
        }
        if (temp === undefined)
            console.log(this.name + "\u6587\u4EF6\u5939\u4E2D\u4E0D\u5B58\u5728\u540D\u5B57\u4E3A" + name + "\u7684\u6587\u4EF6\u5939\uFF01");
        else {
            console.log(this.name + "\u6587\u4EF6\u5939\u4E2D\u540D\u5B57\u4E3A" + name + "\u7684\u6587\u4EF6\u5939\u4E2D\u7684\u6587\u4EF6\u662F\uFF1A");
            var Name = void 0;
            for (var _i = 0, _a = temp.subfile; _i < _a.length; _i++) {
                Name = _a[_i];
                console.log(Name.name);
            }
        }
    };
    return file;
}());
var b = new file("index.html", 1, 1, 999, 1000, []);
var a = new file("mobile", 1, 1, 1000, 1001, [b]);
var basejs = new file("base.js", 2, 4, 426000000, 427100312, []);
var bulbhtml = new file("bulb.html", 2, 4, 426000000, 430115900, []);
var bulboff = new file("pic_bulboff.gif", 2, 4, 426000000, 427100336, []);
var bulbon = new file("pic_bulbon.gif", 2, 4, 426000000, 427100349, []);
var images = new file("images", 1, 5, 426000000, 427100313, [bulboff, bulbon]);
var listhtml = new file("list.html", 2, 4, 426000000, 427100329, []);
var ex = new file("ex", 1, 16, 426000000, 430115217, [basejs, bulbhtml, images, listhtml]);
var exmd = new file("ex.md", 2, 4, 426000000, 430041000, []);
var readme = new file("readme.md", 2, 4, 426000000, 427100300, []);
var javascript = new file("1.2.1javascript", 1, 24, 426000000, 427033907, [ex, exmd, readme]);
ex.listByTime();
ex.listByType();
exmd.listByTime();
console.log('\n');
javascript.find("ex");
ex.find("images");
javascript.find("ab");
//# sourceMappingURL=object.js.map