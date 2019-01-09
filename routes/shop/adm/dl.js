var express = require("express")
var router = express.Router()
var url=require("url")
// == db =============================
var adb = require("usrdb")

var age=require("superagent")
var cnf=require("./son/aid.json")
// === glob ============================
var email, usr,pid
var selpid, allpid,allnow,allpal,selqr,getpid
var ite, oite,opal,ship
var jpal=[],opal=[]
var literr,name,ite,host

var cred = require("./js/cred")
// === get ============================
var getEma = function(req, res, next) {
email = cred.ema(req)
mailusr=  adb.mailUsr(email)
next()}

var getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()};

// === pal
var allPal= function(req, res, next) {
opal=[]

allpal=adb.allPal(email)

if(!allpal.length==0){
for(var i=0;i<allpal.length;i++){
opal.push(JSON.parse(allpal[i].ite))
}
}else{console.log("no allpal")}

next()}

//  allpid
var allPid = function(req, res, next) {

if(!email){
allpid=[],oite=[]
console.log("=== no all pid ==================")
}else{

allpid= adb.allPid(email)
oite=[]
for (var i = 0; i < allpid.length; i++) {
oite.push(JSON.parse(allpid[i].ite))

}//for
}//else
next()}

//  getpid
var setPid= function(req, res, next) {
//pid=req.body.pid
pid=req.params.id
//pid="pay_XAjslFYAAGEAiXdP"
if(pid){
getpid=adb.getPid(pid)
}else{console.log("no pid")}

next()}

//  ins qr
//var insQR= function(req, res, next) {
//var QRCode = require('qrcode')
////var json=JSON.stringify(getpid)

//    name=JSON.parse(getpid.buy)
//    ite=JSON.parse(getpid.ite)

//var str="金額:"+(getpid.mnt).toLocaleString()+"円\n"
//var arr

//for(var i=0;i<ite.length;i++){
//arr+=
//"\n商品名:"+ite[i].title+", 個数:"+ite[i].quantity
//}
//var fin=arr

// QRCode.toDataURL(fin, function (err, url) {
// try{
// adb.insQR(getpid.pid,url)
// }catch(err){
//     console.log(err.name)
//     literr=err.message.substring(0,6)
//}
//})
//next()}

//  sel qr
var selQR= function(req, res, next) {

if(pid){

try{
selqr=adb.selQR(pid)
}catch(err){console.log(err)}

if(selqr){
console.log("===== pid:",selqr.pid)

// var snde = require('snd-ema');
// var img="<img src=\""+selqr.qr+"\">"
// var link="<a href=\"http://localhost:3027/shop/qr-"+pid+"\">"+"link"+"</a>"

    // try{
    // var tr=snde.trEma(email,"sub",link)
    // console.log(typeof tr)
    // }catch(err){console.log(err)}

}else { console.log("no selqr")}
}else { console.log("no pid")}

next()}

// chk
var chk = function(req, res, next) {
host = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
});

console.log("=== chk =====================")
console.log(pid)
console.log(email)
// if(selqr){
// console.log(selqr)
// }else{console.log("no sel qr")}

console.log("=== oite =====")
//console.log(oite)
console.log(host)
next()}

// var reqPut= function(req, res,next) {
// var req=require("request")
// var arr=[getEma, getUsr, setPid,allPid, allPal,insQR,chk]
// req
//   .put(host,{arr})
//   .on('res', function(res) {
//     console.log(res.statusCode) // 200
//     console.log(res.headers['content-type']) // 'image/png'
//   })
// next()}

var gcb = function(req, res) {
res.render("shop/adm/dl", {
title: "qr code", usr: usr, selpid: selpid,pid:pid,
allpid: allpid, allnow: allnow,
oite: oite,opal:opal,
allpal:allpal,selqr:selqr,
literr:literr
})

//res.redirect("/shop/qr-"+pid)
}

//router.put("/shop/adm/dl", [getEma, getUsr, setPid,allPid, allPal,insQR])

// router.post("/shop/adm/dl-:id", [getEma, getUsr, setPid,allPid, allPal,selQR,
// chk, gcb])

router.get("/shop/adm/dl-:id", [getEma, getUsr, setPid,allPid, allPal,selQR,
chk, gcb])

module.exports = router
