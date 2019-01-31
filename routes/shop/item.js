var express = require('express');
var router = express.Router();
var crypto = require('crypto');
// == db =============================
var db = require('cardb');
var adb = require('usrdb');
var email, usr, sku
var skumer, mailusr, mailtmp, skuson
var obj, len;
// === post =============================
var cred = require('./js/cred');

var getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
next()}

var getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()};

var getSku = function(req, res, next) {
sku = req.body.sku;
console.log(sku)
if (sku) {
    try {skumer = db.skuPre(sku);}
    catch (err) {      console.log(err);    }
} else {    console.log('no sku');  }
next()}; //getSku

var getSon = function(req, res, next) {
try {    skuson = db.skuSon(sku);
console.log(skuson)

  } catch (err) {    console.log(err);  }
  if (skuson) {
    obj = JSON.parse(skuson.song);
    len = Object.keys(obj).length;
  } else {    console.log('no skuson');
  }
next()};

var chk = function(req, res, next) {
console.log(sku);
console.log(skumer);
next()};
// === rend

var cb = function(req, res, next) {
rob = { title: 'item', usr: usr, mer: skumer, song: obj};

res.render("shop/item",rob); //rend
};

router.post('/shop/item:id', [getEma, getUsr, getSku, chk, cb]);

module.exports = router;
