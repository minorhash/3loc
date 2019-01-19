var express = require('express');
var router = express.Router();
// === db =============================
var db = require('cardb');
var adb = require('usrdb');

var age=require("superagent")
var snde = require('snd-ema');

// === glob =============================
var email, dat, pid, str, mai, mnt, usr, sku;
var mailusr;
var inspid, getpid, selpid, strbuy, strite;
var buy, ite, oite

var cnf=require("../son/aid.json")
//var sec=cnf.sec;
var sec=cnf.skl;

var cred = require('../js/cred');
// === fun =============================
var getEma = function(req, res, next) {
email = cred.ema(req);
mailusr=  adb.mailUsr(email)
next()}; //getEma

var getUsr = function(req, res, next) {
if(req.session.pss){
if(req.session.pss==mailusr.pss){usr=mailusr.name}
else{usr=null;console.log("no usr")}
}else{console.log("no pss")}
next()};

// === put pid =============================
var putPid = function(req, res, next) {
//res.redirect("pid")

console.log('=== putPid ===');

var utc = new Date().toJSON().slice(0,10);
if (req.body && email) {
pid = req.body.id;

age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {
try{
adb.insPid(email,pid,res.body.amount,
JSON.stringify(res.body.buyer),
JSON.stringify(res.body.order.items),
utc);
}catch(err){console.log(err)}

})

} else {
//var    pid = 'pay_Wz8zdysAAF0AirLI'
console.log("no pid");  }

next()};

var insQR= function(req, res, next) {
age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {

oite=res.body.order.items
ite=JSON.stringify(oite)

    console.log(oite)
    console.log(ite)

var url="localhost:3027"
var str="金額:"+(res.body.amount).toLocaleString()+"円\n"
var arr
var lin="http://"+url+"/shop/adm/dl-"+pid

for(var i=0;i<ite.length;i++){
arr=
"商品名:"+ite[i].name+", 個数:"+ite[i].quantity+"\n"
}
var fin=str+arr+lin

var QRCode = require('qrcode')
QRCode.toDataURL(fin, function (err, url) {
try{
adb.insQR(pid,url,0)
}catch(err){
console.log(err.name)
literr=err.message.substring(0,6)
}
})
})//res

next()};

var senEma = function(req, res, next) {
console.log('=== senEma =======================================');
age
.get('https://api.paidy.com/payments/'+pid)
.set("Content-Type", "application/json")
.set("Paidy-Version", "2018-04-10")
.set("Authorization", "Bearer"+sec)
.then(res => {
//console.log(res.body.buyer);
//var email="jinjasaisen@gmail.com"

var i18=require("../../../i18n/shop/ja.json")
var sub=i18.buy

var mes=
usr+"様<br><br>"
i18.lin1
+i18.cau1
+i18.lin1+"<br>"
+i18.cau2+"<br><br>"
+i18.cau3
+i18.cau4+"<br>"

+i18.cont+"<br>"
+i18.pid+pid+"<br><br>"
+i18.pay+"paidy"+"<br><br>"
var loo="";
oite=res.body.order.items

for(var i=0;i<oite.length;i++){
loo+=
i18.sku+oite[i].id+"<br>"
+i18.title+oite[i].title+"<br>"
+i18.price+(oite[i].unit_price).toLocaleString()+i18.yen+"<br>"
+i18.unit+oite[i].quantity+"<br>"
+i18.lin1
}

var msum=i18.sub+(res.body.amount).toLocaleString()+i18.yen+"<br>"
+i18.sum+(res.body.amount).toLocaleString()+"<br>"

var hand=" 商品お渡しについて<br><br>2019年2月3日のワンマンライブ会場にて、商品のお渡しをさせて頂きます。<br>"

var hand2="ちゅうもんばんごうを<a href='http://localhost:3027'>クリック</a>してできたQRコードを当日スタッフにご提示ください。<br>"
var hand22="QRコードのリンクを別途メールでお送りしています。<br>"
var hand3="商品の発送はございませんので、ご注意ください。<br>"
var hand4="paypal決済につきましては、お引き渡し時に、ご入金確認が取れていない商品についてはお引渡しできません。<br>"

//var ship= // i18.ship1+i18.ship2+i18.ship3 // +i18.ship4+i18.ship5
var misc=
+i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
+i18.adr1+i18.adr2+i18.adr3

var fin=mes+loo+msum+hand+hand2+hand22+hand3+hand4+misc

if(pid){
snde.trEma(email,sub,fin);
}else{console.log("no pid")}

})

next()};

var chk = function(req, res, next) {
  console.log('=== PID =======================================');
  console.log(email);
  console.log(pid);
  console.log(oite);
  console.log('=== PID =======================================');
};

var fun=[getEma, getUsr,putPid,insQR,senEma,
chk]
router.put('/shop/aid/pid',fun);

module.exports = router;
