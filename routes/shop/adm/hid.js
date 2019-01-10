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

// === pal
// var allPal= function(req, res, next) {
// opal=[]
// allpal=adb.allPal(email)

// if(!allpal.length==0){
// for(var i=0;i<allpal.length;i++){
// opal.push(JSON.parse(allpal[i].ite))
// }
// }else{console.log("no allpal")}

// next()}

//  aid
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
next()}

var gcb = function(req, res) {
res.render("shop/adm/hid", {
title: "qr code", usr: usr, pid: pid
})
}

router.all("/shop/adm/hid", [getEma, getUsr,posPid,
chk, gcb])


module.exports = router
