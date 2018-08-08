var express = require('express');
var router = express.Router();
// == sess =============================

var db = require('cardb');
var adb = require('usrdb');

var email, usr, myerr;
var mailusr, selpid, allpid,allpal;
var ite, oite,tok,atok;
// === get ============================
var getEma = function(req, res, next) {
  var cred = require('./js/cred');
  email = cred.ema(req);
  next();
}; //getEma

var getUsr = function(req, res, next) {
  var cred = require('./js/cred');
  usr = cred.usr(email);
  next();
};

var allPid = function(req, res, next) {
    if(!email){    allpid=[]; oite=[]
  console.log('=== no all pid ==================');
    }else{

  allpid = adb.allPid(email);
  for (var i = 0; i < allpid.length; i++) {
    ite = allpid[i].ite;
    oite = JSON.parse(ite);
  }

  //console.log(oite)
  console.log(allpid);
  console.log(allpid.length);
    }
  next()}

var allPal= function(req, res, next) {
allpal=adb.allPal(email)
atok=[]
  for (var i = 0; i < allpal.length; i++) {
console.log(allpal[i].tok)
    atok[i]=allpal[i].tok;
 //   atok.push(allpal[i].tok);

//    otok= JSON.parse(atok);
  }
  next()}
var chk = function(req, res, next) {
  console.log('=== chk =====================');
  console.log(email);
  console.log(usr);
//  console.log(oite);
  console.log(allpal);
  console.log(atok);
  next();
}; //chkEma

var gcb = function(req, res) {
  res.render('shop/history', {
    title: 'history',
    usr: usr,
    selpid: selpid,
    allpid: allpid,
    allpal: allpal,
    oite: oite
  });
};
router.get('/shop/history', [getEma, getUsr, allPid, allPal,chk, gcb]);

module.exports = router;
