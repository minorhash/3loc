var express = require("express")
var router = express.Router()
// === pal
var paypal = require("paypal-rest-sdk")
//require(__dirname + "/config")

var adb = require('usrdb')
var pal = require("mypal")
var mypal = pal.myPal()

var tran=mypal.transactions[0]

var tmp_a = [],  mer_a = [],  sum_a = [],  uni_s = [],  pri_s = [],skua=[],skumer=[]
var email, usr, mer, sum, add,ite
var mailtmp,mailusr

// === db
var db = require("cardb")

// post ======================================
var getEma = function(req, res, next) {
var cred = require("../js/cred")
email = cred.ema(req)
mailusr=  adb.mailUsr(email)
    next()
} //getEma

var getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()};

var putTmp = function(req, res, next) {
tmp_a = []
if (email) {
mailtmp = db.mailTmp(email)
for (var i = 0; i < mailtmp.length; i++) {
if (mailtmp[i].uni !== 0) {
tmp_a.push(mailtmp[i])
} //if
} //for
} else {        console.log("no mail")    }
next()}

var putMer = function(req, res, next) {
    mer_a = []
    skumer=[]
    tran.item_list.items = []
//skumer=db.skuPre(401)
if (tmp_a) {
for (var i = 0; i < tmp_a.length; i++) {
try{
skumer=db.skuPre(tmp_a[i].sku)
}catch(err){console.log(err)}

            mer_a.push(skumer)
            uni_s[i] = tmp_a[i].uni.toString()
            pri_s[i] = mer_a[i].pri.toString()
            skua[i] = mer_a[i].sku.toString()
            ite = {
                name: mer_a[i].name,
                quantity: uni_s[i],
                price: pri_s[i],
                tax:Math.round(pri_s[i]*0.08).toString(),
                sku: tmp_a[i].sku.toString(),
                currency: "JPY",
            }
            tran.item_list.items.push(ite)
        }//for
    } else {        console.log("no tmp_a")    }
next()}

// === sum ===
var getSum = function(req, res, next) {
    sum_a = []
    for (var i = 0; i < tmp_a.length; i++) {
    sum_a.push(mer_a[i].pri * tmp_a[i].uni)
    }
if (sum_a.length !== 0) {

        sub= sum_a.reduce(function(tot, cur) {
            return tot + cur
        })
        ssub=sub.toString()
var itax=Math.round(sub*0.08)
var add=sub+itax
var sadd=add.toString()
        // ship
}
next()}

// === pal ===

var chk = function(req, res, next) {
    console.log("=== pay ===")
    console.log(mailtmp)
    console.log(sub)
    next()}

var rcb = function(req, res) {
    res.render("shop/pre/pay", {
        mailtmp: mailtmp,
        sub: sub,
        mer: mer,
        usr: usr,
        email: email
    }) //rend
}

router.get("/shop/pre/pay",
[getEma,getUsr,putTmp,putMer,getSum,
chk,rcb
])

module.exports = router
