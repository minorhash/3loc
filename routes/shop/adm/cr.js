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

//  getpid
var setPid= function(req, res, next) {
pid=req.body.pid
//pid="pay_XAjslFYAAGEAiXdP"
if(pid){
getpid=adb.getPid(pid)
}else{console.log("no pid")}
next()}

// ins QR
var insQR= function(req, res, next) {
var QRCode = require('qrcode')
//var json=JSON.stringify(getpid)

name=JSON.parse(getpid.buy)
ite=JSON.parse(getpid.ite)

var str="金額:"+(getpid.mnt).toLocaleString()+"円\n"
var arr=[]

for(var i=0;i<ite.length;i++){
arr+=
"商品名:"+ite[i].title+", 個数:"+ite[i].quantity
}
var fin=str+arr

 QRCode.toDataURL(fin, function (err, url) {
 try{
 adb.insQR(getpid.pid,url)
 }catch(err){
     console.log(err.name)
     literr=err.message.substring(0,6)
}
})
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

router.post("/shop/qr/cr", [getEma, getUsr, setPid,insQR,
chk, gcb])

// router.get("/shop/cr-:id", [getEma, getUsr, setPid,allPid, allPal,selQR,
// chk, gcb])

module.exports = router
