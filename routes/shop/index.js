var express = require("express");
// var cookie = require('cookie');
var router = express.Router();
// == sess =============================
var db = require("cardb");
var adb = require("usrdb");
//var allmer = db.allMer();
var allpre = db.allPre();

var email, pss, usr;
var mailusr;

// === login ============================
var cred = require("./js/cred");

// === get ============================

var getEma = function(req, res, next) {
email = cred.ema(req);
mailusr = adb.mailUsr(email);
next();};

var getUsr = function(req, res, next) {
if (mailusr) {
usr = mailusr.name;
} else {
usr = null;
console.log("no usr");
}
next();};

var chk = function(req, res, next) {
  console.log("=== chk===");
  console.log(email);
  console.log(usr);
  next();}; // chkEma

var gcb = function(req, res) {
res.render("shop", {
title: "shop",
mer: allpre,
usr: usr
});
};
router.get("/shop", [getEma, getUsr, chk, gcb]);

// == post ==================================

var getCok = function(req, res, next) {
  if (req.body) {
    email = req.body.email;
    pss = req.body.pss;
    if (email) {
      mailusr = adb.mailUsr(email);
    } else {      console.log("no email");    }

if (mailusr.email === req.body.email && mailusr.pss === req.body.pss) {
req.session.email = req.body.email;
req.session.pss = req.body.pss;
} else {console.log("wrong");}
} else {console.log("no req.body");}

next();}; // getCok

var posUsr = function(req, res, next) {
if (req.session) {
if (mailusr) {
if (mailusr.email === req.body.email && mailusr.pss === req.body.pss) {
usr = mailusr.name;
} else {        console.log("wrong cred");      }
} else {      console.log("no mailusr");    }
} else {
    usr = null;
    console.log("no usr");
}
next()}

var cb = function(req, res) {
var rob = { usr: usr, mer: allpre};
res.render("shop", rob);
};

var arr=[getCok, posUsr, chk, cb];

router.post("/shop",arr);

module.exports = router;
