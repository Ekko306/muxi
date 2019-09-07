class File {
    constructor(name, type, size, time_sta, time_cha, subfile) {
        this.name = name;
        this.type = type;
        //1表示文件夹，2表示文件
        this.size = size;
        this.time_sta = time_sta;
        this.time_cha = time_cha;
        this.subfile = subfile;
    }
    list() {
        //判断是否为文件夹
        if (this.type == 2)
            console.log("该文件型为文件类型，无子文件")
        else
            //排序1（类型）
            console.log("按照类型排序（文件夹前，文件后）")
            var type_1 = new Array()
            var type_2 = new Array()
            var i = 0
            , j1 = 0
            , j2 = 0
            var subfile_num = this.subfile.length
            while (i < subfile_num) {
                if (this.subfile[i].type == 1)
                    type_1[j1++] = this.subfile[i].name
                else
                    type_2[j2++] = this.subfile[i].name
                i++
            }
            for (i = 0; i < j1; i++)
                console.log(type_1[i])
            for (i = 0; i < j2; i++)
                console.log(type_2[i])

            //排序2（修改时间）
            console.log("按照修改时间排序（最近修改在前）")
            var type_ord = new Array()
            for (i = 0; i < subfile_num; i++)
                type_ord[i] = this.subfile[i].time_cha
            for (var j = 0; j < subfile_num - 1; j++) {
                for (var i = 0; i < subfile_num - 1 - j; i++) {
                    if (type_ord[i] > type_ord[i + 1]) {
                        var temp = type_ord[i];
                        type_ord[i] = type_ord[i + 1];
                        type_ord[i + 1] = temp;
                    }
                }
            }
            for (i = 0; i < subfile_num; i++) {
                for (j = 0; j < subfile_num; j++) {
                    if (type_ord[i] == this.subfile[j].time_cha)
                        console.log(this.subfile[j].name)
                }
            }
    }
    
    find(name) {
        var i
        var subfile_num = this.subfile.length
        var type_s = new Array()
        var temp1 = new File()
        for (i = 0; i < subfile_num; i++)
            type_s[i] = this.subfile[i].name
        for(i = 0;i < subfile_num;i++){
            if(name == type_s[i])
            var temp1 = this.subfile[i]}
        console.log("文件夹中名字为images的文件夹的子文件为")
        var subfile_num_s=temp1.subfile.length
        for(i=0;i<subfile_num_s;i++)
        console.log(temp1.subfile[i].name)
    }
}

//要求实例
let a = new File("mobile",1,1,1000,1001,["index.html"])
let b = new File("index.html",2,2,1002,1003,["Null"])


//测试list()与find(name)实例
let NULL = new File("NULL",1,1,1,1,"NULL")
let image1 = new File("image1.png",2,156,421637,421637,[NULL])
let image2 = new File("image2.png",1,53,421636,421636,[NULL])
let image3 = new File("image3.png",2,86,421638,421638,[NULL])
let readme = new File("readme.me",2,4,421639,421639,[NULL])
let images = new File("images",1,295,421635,421635,[image1, image2, image3])
let chrome = new File("chrome",1,307,421634,421634,[images, readme])

images.list()
chrome.find("images")




