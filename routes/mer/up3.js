var express = require('express');
var router = express.Router();
var process = require('process');

// === db ===
var db = require('cardb');
var adb = require('usrdb');

// glob
var email, sku, song, allmer, usr, bool, myerr;
var mailusr, skumer;
var bod, name, pri, img, rel, cat, des;
// === post

var getEma = function(req, res, next) {
if (req.session) {
email = req.session.email;
} else {
email = null;
console.log('no sess');
  }
  next()}; //getEma

var getUsr = function(req, res, next) {
  if (email) {
    try {
      mailusr = adb.mailUsr(email);
    } catch (err) {
      console.log(err);
    }
    usr = mailusr.name;
  } else {
    (usr = null), console.log('no mail');
  }
  next()};

var putBod = function(req, res, next) {
  bod = req.body;
  sku = bod.sku;
  name = bod.name;
  pri = bod.pri;
  col = bod.col;
  cat = bod.cat;
  des = bod.des;
  song = bod.song;
  // up

  next()}; //getMer

var putMer = function(req, res, next) {
  try {
    db.namPre(name, sku);
    db.priPre(pri, sku);
    db.colPre(col, sku);
    db.catPre(cat, sku);
    db.desPre(des, sku);
  } catch (err) {
    console.log(err)}

  next()};

var getMer = function(req, res, next) {
try {    skumer = db.skuPre(sku);  }
catch (err) {    console.log(err);  }
next()}; //getMer

var chk = function(req, res, next) {
  console.log("=== chk ===");
  console.log(email);
  console.log(usr);
  console.log(name);
  console.log(pri);
  console.log(skumer);
  console.log(bod);
  next()};

var rcb = function(req, res, next) {
  res.render('mer/up3', {
    title: 'up3 ',
    sku: sku,
      usr: usr,
      bod: bod,
      skumer: skumer
});
};

router.post('/mer/up3', [getEma, getUsr, putBod, putMer, getMer,
chk, rcb]);
module.exports = router;
