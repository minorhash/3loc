var express = require("express")
var router = express.Router()
var url=require("url")
// == db =============================
var adb = require("usrdb")

var age=require("superagent")
var cnf=require("./son/aid.json")
// === glob ============================
var email, usr
var selpid, allpid,allnow,allpal,selqr
var ite, oite,opal,ship
var jpal=[],opal=[]
var literr

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


//  aid
var allPid = function(req, res, next) {

if(!email){
allpid=[],oite=[]
console.log("=== no all pid ==================")
}else{

allpid= adb.allPid(email)
console.log(cnf.skl)
oite=[]
for (var i = 0; i < allpid.length; i++) {
oite.push(JSON.parse(allpid[i].ite))

}//for

}//else
next()}

var chk = function(req, res, next) {
var host = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
});

console.log("=== chk =====================")
console.log(email)
console.log(allpid[0])
if(selqr){
console.log(selqr)
}else{console.log("no sel qr")}

console.log("=== oite =====")
//console.log(oite)
next()}

var gcb = function(req, res) {
res.render("shop/adm/sel", {
title: "qr code", usr: usr, selpid: selpid,
allpid: allpid, allnow: allnow,
oite: oite,opal:opal,
allpal:allpal,selqr:selqr,
literr:literr
})
}

router.get("/shop/adm/sel", [getEma, getUsr, allPid, allPal,
chk, gcb])

module.exports = router
