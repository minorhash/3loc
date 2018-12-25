var snd = require('snd-ema');
var udb= require('usrdb');
var email="minorhash@gmail.com"
var sku="341", id=3, loo
//var i18=require("../../../../i18n/shop/ja.json")
var i18=require("./son/ja.json")
var sub=i18.buy
var fin=i18.cau1
console.log(fin)
var ord=udb.idPid(id)
var ite=JSON.parse(ord.ite)
var tem=ite[0]

console.log(tem)
console.log(tem.id)

loo=tem.id+"<br>"+tem.title

console.log(loo)

var img

var QRCode = require('qrcode')
QRCode.toDataURL(loo, function (err, url) {

link="<a href=\""+url+"\">"+"link"+"</a>"
//img="<img src=\"https://localhost:3000/img/cd/341.png\">"

//    console.log(img)
try{
snd.trEma(email,sub,link);
}catch(err){console.log(err)}
})


// var mes=
// i18.lin1
// +i18.cau1
// +i18.lin1+"<br>"
// +usr+"様<br><br>"
// +i18.cau2+"<br><br>"
// +i18.cau3
// +i18.cau4+"<br>"

// +i18.cont+"<br>"
// +i18.pid+pid+"<br>"
// +"<br>"

// var loo="";
// oite=res.body.order.items
// for(var i=0;i<oite.length;i++){
// loo+=
// i18.sku+oite[i].id+"<br>"
// +i18.title+oite[i].title+"<br>"
// +i18.price+(oite[i].unit_price).toLocaleString()+i18.yen+"<br>"
// +i18.unit+oite[i].quantity+"<br>"
// +i18.lin1
// }
// var msum=i18.sub+(res.body.amount-650).toLocaleString()+i18.yen+"<br>"
// +i18.cour+650+i18.yen
// var ship=
// i18.ship1+i18.ship2+i18.ship3
// +i18.ship4+i18.ship5
// +i18.misc+i18.lin1+i18.auto1+i18.auto2+i18.lin1
// +i18.adr1+i18.adr2+i18.adr3

// var fin=mes+loo+msum+ship


