var express = require("express")
var router = express.Router()
var paypal = require("paypal-rest-sdk")
var age=require("superagent")
// === db
var adb = require("usrdb")
var db = require("cardb")

var usr,email,mailtmp,mer
var pid,payerId,exson,getpal
var sum,tot,tax,suma,item=[]

var cnf=require("../son/pal.json")

paypal.configure({
mode: cnf.sand,
client_id:cnf.tid,
client_secret:cnf.tsc
})

// === db

var cred = require('../js/cred');
// === get
var getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
next()}

var getUsr = function(req, res, next) {
if(mailusr){usr=mailusr.name}
else{usr=null;console.log("no usr")}
next()};

var getTmp = function(req, res, next) {
    mailtmp = []
    if (email) {
    mailtmp = db.mailTmp(email)
    } else {        console.log("no mail")    }
    next()}

var putMer = function(req, res, next) {
    mer=[]
    if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
    mer[i] = db.skuPre(mailtmp[i].sku)
    }
    } else {console.log("no mailtmp")    }
    next()}

var putSum = function(req, res, next) {
    suma = []
    if (mailtmp) {
    for (var i = 0; i < mailtmp.length; i++) {
    suma[i] = mailtmp[i].uni * mer[i].pri
    }
    } else {        console.log("no mailtmp")    }
    next()}

var redSum = function(req, res, next) {
console.log("=== red sum")
    sum = ""
    function getSum(total, num) {        return total + num    }
    if (suma.length !== 0) {
    sum = suma.reduce(getSum)
    } else {console.log("no sum")    }
tax=Math.round(sum*0.08)
tot=sum+tax
console.log(tot)
next()}

var getPid= function(req, res, next) {
console.log("=== get pid")
pid = req.query.paymentId
console.log(pid)
payerId = req.query.PayerID
console.log(payerId)

    var stax=tax.toString()
    var ssum=sum.toString()
    var stot=tot.toString()

var details={subtotal:ssum,tax:stax,shipping:"0"}
exson = {
payer_id: payerId,
transactions: [{amount: {currency: "JPY",details,total: stot}}],
}
next()}

var chk= function(req, res,next) {
console.log("=== chk ===")
console.log(exson.transactions[0])
next()}

var exePal= function(req, res) {
var utc = new Date().toJSON().slice(0,10)

paypal.payment.execute(pid, exson, function(err, pay) {
if (err) {
    console.log("=== exe fail");
    console.log(err.response)
res.redirect("/shop/cart")
}else {
if(pay.state=="approved"){
console.log("suc")
}else{
console.log("=== NO suc")
}
item=    pay.transactions[0].item_list.items
var ite=    JSON.stringify(pay.transactions[0].item_list.items)

try{
adb.insPal(email,pay.id,sum,ite,utc)
}catch(err){console.log(err)}


res.render("shop/paypal/success", {
usr:usr,
pid: pid,
payid:payerId,
pay:pay,
item:item
})

var snde = require('snd-ema');
var i18=require("../../../i18n/shop/ja.json")
var sub=i18.buy

var mes=
i18.lin1
+i18.cau1
+i18.lin1+"<br>"
+usr+"様<br><br>"
+i18.cau2+"<br><br>"
+i18.cau3
+i18.cau4+"<br>"

+i18.cont+"<br>"
+i18.pay+"paypal<br><br>"
+i18.pid+pid+"<br><br>"

var loo="";
for(var i=0;i<item.length;i++){
loo=
i18.title+item[i].name+"<br>"
+i18.sku+"tms-"+item[i].sku+"<br>"
+i18.price+Number(item[i].price).toLocaleString()+i18.yen+"<br>"
+i18.tax+(item[i].tax).toLocaleString()+i18.yen+"<br>"
+i18.unit+item[i].quantity+"<br>"
}
var msum=i18.lin1+i18.sub+Math.round(sum*1.08).toLocaleString()+i18.yen+"<br>"
+i18.sum+(Math.ceil(sum*1.08)).toLocaleString()+i18.yen+"<br>"

var hand=i18.hand1+i18.hand2+i18.hand22+i18.hand3+i18.hand4+i18.hand5

var misc=
i18.else1+i18.else2+i18.lin1+i18.auto1+i18.auto2+i18.lin1
+i18.adr1+i18.adr2+i18.adr3

var ship=
i18.ship1+i18.ship2+i18.ship3
+i18.ship4+i18.ship5
+i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
+i18.adr1+i18.adr2+i18.adr3

var fin=mes+loo+msum+hand+misc

console.log('=== senEma =======================================');
try{
snde.trEma(email,sub,fin);
}catch(err){console.log(err)}

}//else

})
}//exePal

var arr=[getEma,getUsr,getTmp,putMer,putSum,redSum,getPid,chk,
    exePal
]
router.get("/shop/paypal/success", arr)

module.exports = router
