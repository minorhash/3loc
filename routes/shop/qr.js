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

//  ins qr
var insQR= function(req, res, next) {
var QRCode = require('qrcode')
var json=JSON.stringify(allpid[0])

    var name=JSON.parse(allpid[0].buy)
    var ite=JSON.parse(allpid[0].ite)

var str="金額:"+(allpid[0].mnt).toLocaleString()+"円 \n名前:"+name.name1
var arr

for(var i=0;i<ite.length;i++){
arr+=
"\n商品名:"+ite[i].title+", 個数:"+ite[i].quantity
}
var fin=str+arr

 QRCode.toDataURL(fin, function (err, url) {
 try{
 adb.insQR(allpid[0].pid,url)
 }catch(err){
     console.log(err.name)
     literr=err.message.substring(0,6)
     console.log(allpid[0])

}
})

next()}

//  sel qr
var selQR= function(req, res, next) {

console.log(allpid[0].pid)

if(allpid[0].pid){
try{
selqr=adb.selQR(allpid[0].pid)
console.log("===== pid:",selqr)

var snde = require('snd-ema');
    var img="<img src=\""+selqr.qr+"\">"
    try{
    snde.trEma(email,"sub",img)
    }catch(err){console.log(err)}

}catch(err){console.log(err)}
}else { console.log("no allpid")}

next()}

// cat auth
var capAut= function(req, res, next) {

for (var i = 0; i < allpid.length; i++) {
age
.get('https://api.paidy.com/payments/'+allpid[i].pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+cnf.skl)
.then(function(res){
if(res.body.status=="authorized"){
age
.get('https://api.paidy.com/payments/'+allpid[i].pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+cnf.skl)
.then(function(res){

 console.log("captured!!!")
})

}else{
 console.log("no auth")
}

})
}

next()}

var chkCap= function(req, res, next) {

for (var i = 0; i < allpid.length; i++) {
age
.get('https://api.paidy.com/payments/'+allpid[i].pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+cnf.skl)
.then(function(res){

//console.log(res.body)
if(res.body.status=="closed"){

if(res.body.captures.length!==0){
console.log("cap!!!")
}else{

console.log(res.body.id)

//adb.delPid(res.body.id)
}

}else{console.log("not closed")}

})
}//for

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
console.log(host)
next()}

var gcb = function(req, res) {
res.render("shop/qr", {
title: "qr code", usr: usr, selpid: selpid,
allpid: allpid, allnow: allnow,
oite: oite,opal:opal,
allpal:allpal,selqr:selqr,
    literr:literr
})
}

router.get("/shop/qr", [getEma, getUsr, allPid, allPal,insQR,selQR,
chk, gcb])

module.exports = router
