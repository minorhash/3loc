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
//pid=req.params.id
pid="pay_XEGthUsAAEsAsrsa"
//pid="pay_XAjslFYAAGEAiXdP"
var pat1=/pay/g
    boo=pat1.test(pid)
    if(boo===true){
getpid=adb.getPid(pid)
}else{
getpid=adb.idPal(pid)
console.log("no pid")}

next()}

var delQR = function(req, res, next) {

if(boo===true){
try{adb.delQR(pid)}
catch(err){console.log(err)}
}else{
try{adb.pdelQR(pid)}
catch(err){console.log(err)}

    console.log("no pid")}

next()}
//  sel qr
var selQR= function(req, res, next) {

if(pid){

try{selqr=adb.selQR(pid)}catch(err){console.log(err)}

if(selqr){
console.log("===== pid:",selqr.pid)

}else { console.log("no selqr")}
}else { console.log("no pid")}

next()}

// chk
var chk = function(req, res, next) {
host = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
protocol: req.protocol,
host: req.get('host'),
pathname: req.originalUrl,
});

console.log("=== chk =====================")
console.log(pid)
console.log(email)
console.log(getpid)
// if(selqr){
// console.log(selqr)
// }else{console.log("no sel qr")}

console.log("=== oite =====")
//console.log(oite)
console.log(host)
next()}

var gcb = function(req, res) {
res.render("shop/adm/dl", {
title: "qr code", usr: usr, selpid: selpid,pid:pid,
allpid: allpid, allnow: allnow,
oite: oite,opal:opal,
allpal:allpal,selqr:selqr,
literr:literr
})

}

//router.put("/shop/adm/dl", [getEma, getUsr, setPid,allPid, allPal,selQR,
//chk])

router.post("/shop/adm/dl-:id", [getEma, getUsr, setPid,allPid, allPal,selQR,
chk, gcb])

router.get("/shop/adm/dl-:id", [getEma, getUsr, setPid,allPid, allPal,selQR,
//router.all("/shop/adm/dl-:id", [getEma, getUsr, setPid,allPid, allPal,selQR,
chk, gcb])

module.exports = router
