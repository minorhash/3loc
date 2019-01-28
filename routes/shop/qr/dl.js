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
var getPid= function(req, res, next) {
//pid=req.body.pid
pid=req.params.id
    var pat1=/pay/g
    boo=pat1.test(pid)
//pid="pay_XAjslFYAAGEAiXdP"
if(boo===true){
getpid=adb.getPid(pid)
}else{
<<<<<<< HEAD
=======

getpid=adb.idPal(pid)

    console.log("no pid")}
>>>>>>> 2799973ef82b473015ec587bce6b88f2ee702b45

getpid=adb.idPal(pid)

console.log("no pid")}
next()}

var postPid= function(req, res, next) {
pid=req.body.pid
//pid=req.params.id
    var pat1=/pay/g
    boo=pat1.test(pid)
//pid="pay_XAjslFYAAGEAiXdP"
if(boo===true){
getpid=adb.getPid(pid)
}else{

getpid=adb.idPal(pid)

console.log("no pid")}
next()}


//  sel qr
var selQR= function(req, res, next) {

console.log("########### sel qr")
console.log(req.body.pid)

try{
selqr=adb.selQR(pid)
}catch(err){console.log(err)}
if(selqr){
console.log("===== pid:",selqr.pid)

var snde = require('snd-ema');
var img="<img src=\""+selqr.qr+"\">"
    var here="こちらの"
var str="をクリックしてください。"
    //var url="3loc.tmsmusic.tokyo"
var url="localhost:3027"
var link="<a href=\"http://"+url+"/shop/qr/dl-"+pid+"\">"+"リンク"+"</a>"+str
var sub="QRコードをお送りしました"
    var str="をクリックしてください。"
var link="<a href=\"http://3loc.tmsmusic.tokyo/shop/adm/dl-"+pid+"\">"+"リンク"+"</a>"


try{
var tr=snde.trEma(email,sub,link)
console.log(typeof tr)
}catch(err){console.log(err)}

}else { console.log("no selqr")}


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

var gcb = function(req, res) {
res.render("shop/qr/dl", {
title: "qr code", usr: usr, selpid: selpid,pid:pid,
allpid: allpid, allnow: allnow,
oite: oite,opal:opal,
allpal:allpal,selqr:selqr,
literr:literr
})

//res.redirect("/shop/qr-"+pid)
}

//router.put("/shop/qr/dl-:id", [getEma, getUsr, setPid,allPid, allPal])

router.post("/shop/qr/dl-:id", [getEma, getUsr, postPid, allPid,allPal,selQR,
chk, gcb])

router.get("/shop/qr/dl-:id", [getEma, getUsr, getPid, allPid, allPal,selQR,
chk, gcb])

module.exports = router
