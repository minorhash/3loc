var adb = require('usrdb');
var age=require("superagent")
var pid="pay_XEEtXi8AAFIAoxcs"
var cnf=require("../../son/aid.json")
var sec=cnf.sec
var oite=[],ite,arr
console.log("=== sec ===")
console.log(sec)

age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {

oite=res.body.order.items
ite=JSON.stringify(oite)

    console.log(oite)
    console.log(ite)

for(var i=0;i<oite.length;i++){
fin=
"商品名:"+oite[i].title+", 個数:"+oite[i].quantity

}

var QRCode = require('qrcode')
QRCode.toDataURL(fin, function (err, url) {
try{
adb.insQR(pid,fin,0)
}catch(err){
console.log(err.name)
literr=err.message.substring(0,6)
}
})

console.log(fin)

})//res


// var getpid=res.body
// if(getpid){

// name=JSON.parse(getpid.buy)
// ite=JSON.parse(getpid.ite)

// var str="金額:"+(getpid.mnt).toLocaleString()+"円\n"
// var arr=[]

// for(var i=0;i<ite.length;i++){
// arr+=
// "商品名:"+ite[i].title+", 個数:"+ite[i].quantity
// }
// var fin=str+arr

// var QRCode = require('qrcode')
// QRCode.toDataURL(fin, function (err, url) {
// try{
// adb.insQR(getpid.pid,url,0)
// }catch(err){
// console.log(err.name)
// literr=err.message.substring(0,6)
// }
// })

// }else{console.log("=== no getpid ===")}


