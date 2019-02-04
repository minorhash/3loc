var express = require('express');
var router = express.Router();
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var i18n = require('i18n-express');
var sess = require('cookie-session');
//
var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

app.use(
  sess({
    name: 'sess',
    keys: ['key1'],
    maxAge: 60 * 60 * 1000, // 1 hour
  })
);

//express-i18n ======================================
var nat=["","mail","shop","gis","usr"]

for(let i=0;i<nat.length;i++){
app.use(  i18n({    translationsPath: path.join(__dirname, 'i18n/'+nat[i]),
    siteLangs: ['en', 'ja'],    textsVarName: nat[i]  })
);
}
// err hand
// var errorHandler = require('express-error-handler'),
// handler = errorHandler({
// views: {
// '404': '404.ejs'
// }
// });

// app.use( errorHandler.httpError(404) );
// app.use( handler );


// route =================================
var index= require('./routes/index');
app.use('/', index);
var page= require('./routes/page');
app.use('/', page);

// shop =================================

var shop = require('./routes/shop/index');
app.use('/', shop);

var ashop=["index","cart","item","his","my","dl","fan"]

ashop.forEach(function(ite){
ite=require('./routes/shop/'+ite)
app.use('/', ite)
})

// === qr ===
var aqr=["sel","dl"]

for(var i=0;i<aqr.length;i++){
aqr[i]=require('./routes/shop/qr/'+aqr[i]);
app.use('/', aqr[i]);
}

// === adm ===
var aadm=["dl","hid"]

for(var i=0;i<aadm.length;i++){

aadm[i]=require('./routes/shop/adm/'+aadm[i]);
app.use('/', aadm[i]);
}

// === not ===
var anot=["agmt","gui","not"]

for(var i=0;i<anot.length;i++){
anot[i]=require('./routes/shop/not/'+anot[i]);
app.use('/', anot[i]);
}

// === paidy ===

var aaid=["paidy","pid"]
for(var i=0;i<aaid.length;i++){
aaid[i]=require('./routes/shop/aid/'+aaid[i]);
app.use('/', aaid[i]);
}

// === pal ===

var apal=["pay","suc","can"]
apal.forEach(function(ite){
ite=require('./routes/shop/pal/'+ite)
app.use('/', ite)
})

// === pre ===

var apre=["pay","suc","can"]
apre.forEach(function(ite){
ite=require('./routes/shop/pre/'+ite)
app.use('/', ite)
})

// === mer ===
var mer = require('./routes/mer/index');
app.use('/', mer);

var amer=["out","item","ins","ins_fin","song","song2","song3","del","del_fin",
"up","up2","up3"]
amer.forEach(function(ite){
ite=require('./routes/mer/'+ite)
app.use('/', ite)
})

// === login ===
ausr=["sig","sigp","out","adr","adrp","forg"]
ausr.forEach(function(ite){
ite=require('./routes/shop/usr/'+ite)
app.use('/', ite)
})
//error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

res.status(err.status || 500);
if(err.status === 403){
return res.send('Action forbidden!');
}

if(err.status === 404){
return res.get('Page not found!');
}
   // when status is 500, error handler
if(err.status === 500) {
return res.send('Server error occured!');
}

res.render('error');

});

var p404=require('./routes/p404');
app.use('/', p404);

module.exports = app;
