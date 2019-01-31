var express = require("express")
var router = express.Router()
var url=require("url")
// == db =============================
var adb = require("usrdb")

var age=require("superagent")
var cnf=require("./son/aid.json")
// === glob ============================
var email, usr,pid

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

var posPid = function(req, res, next) {

pid=req.query.pid
    try{
        adb.delQR(pid)
    }catch(err){console.log(err)}
// === pal
// var allPal= function(req, res, next) {
// opal=[]
// allpal=adb.allPal(email)

// if(!allpal.length==0){
// for(var i=0;i<allpal.length;i++){
// opal.push(JSON.parse(allpal[i].ite))
// }
// }else{console.log("no allpal")}

next()}


var posPid = function(req, res, next) {

pid=req.query.pid
next()}

var delQR = function(req, res, next) {

if(pid){
try{adb.delQR(pid)}
catch(err){console.log(err)}
}else{console.log("no pid")}
next()}

var posPid = function(req, res, next) {

pid=req.body.pid

next()}

var chk = function(req, res, next) {
var host = url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
});

console.log("=== chk =====================")
console.log(email)
console.log(pid)
console.log(req.query)
console.log(usr)
console.log(req.query.pid)
console.log(pid)
next()}

var gcb = function(req, res) {
res.render("shop/adm/hid", {
title: "qr code", usr: usr, pid: pid
})
}

router.all("/shop/adm/hid", [getEma, getUsr,posPid,delQR,
chk, gcb])

module.exports = router
