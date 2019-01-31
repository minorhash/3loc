var express = require("express")
var router = express.Router()
var url=require("url")
// == db =============================
var adb = require("usrdb")

var age=require("superagent")
var cnf=require("./son/aid.json")
// === glob ============================
var email, usr,pid
var selpid, allpid,allnow,allpal,selqr
    var getpid,idpal
var ite, oite,opal,ship
var jpal=[],opal=[]
var literr,name,ite,host,boo

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

//  getpid
var setPid= function(req, res, next) {
pid=req.body.pid
//pid="pay_XAjslFYAAGEAiXdP"
var pat1=/pay/g
boo=pat1.test(pid)
if(boo===true){
getpid=adb.getPid(pid)
console.log("paidy")
console.log(getpid)
}else{
idpal=adb.idPal(pid)
console.log("paypal")
console.log(idpal)
}
next()}

var delQR = function(req, res, next) {

if(pid){
try{adb.delQR(pid)}
catch(err){console.log(err)}
}else{console.log("no pid")}

next()}

// ins QR
var insQR= function(req, res, next) {

if(boo===true){
//var json=JSON.stringify(getpid)
name=JSON.parse(getpid.buy)
ite=JSON.parse(getpid.ite)

var str="金額:"+(getpid.mnt).toLocaleString()+"円\n"
var arr=[]
var lin="http://3loc.tmsmusic.tokyo/shop/adm/dl-"+pid

for(var i=0;i<ite.length;i++){
arr+=
"商品名:"+ite[i].title+", 個数:"+ite[i].quantity+"\n"
}
var fin=str+arr+lin

var QRCode = require('qrcode')
QRCode.toDataURL(fin, function (err, url) {
try{
adb.insQR(getpid.pid,url,0)
}catch(err){
console.log(err.name)
literr=err.message.substring(0,6)
}
})

}else{
console.log(boo)
console.log("=== paypal ===")

ite=JSON.parse(idpal.ite)
var str="金額:"+(idpal.sum).toLocaleString()+"円\n"
var arr=[]
var lin="http://3loc.tmsmusic.tokyo/shop/adm/dl-"+pid

for(var i=0;i<ite.length;i++){
arr+=
"商品名:"+ite[i].name+", 個数:"+ite[i].quantity+"\n"
}
var fin=str+arr+lin

var QRCode = require('qrcode')
QRCode.toDataURL(fin, function (err, url) {
try{
adb.insQR(idpal.id,url,0)
}catch(err){
console.log(err.name)
literr=err.message.substring(0,6)
}
})
}//else

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
console.log(boo)

console.log("=== oite =====")
//console.log(oite)
console.log(host)
next()}

var gcb = function(req, res) {
res.render("shop/qr/cr", {
title: "qr code", usr: usr, selpid: selpid,pid:pid,
allpid: allpid, allnow: allnow,
oite: oite,opal:opal,
allpal:allpal,selqr:selqr,
literr:literr
})

//res.redirect("/shop/qr-"+pid)
}

router.post("/shop/qr/cr", [getEma, getUsr, setPid,
chk, gcb])

// router.get("/shop/cr-:id", [getEma, getUsr, setPid,allPid, allPal,selQR,
// chk, gcb])

module.exports = router
