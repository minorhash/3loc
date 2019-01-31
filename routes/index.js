var express = require('express');
var router = express.Router();
var fs=require("fs")
var ls=require("ls")
var db=require("usrdb")
// glob
var par,iarr=[],typblo,path="public/img/pre/*"

var reaImg=function(req, res, next) {

for (var i of ls(path)){
console.log(i.full)
iarr.push(i.full)
//console.log(i)
}

console.log(iarr)
// var fil="public/img/8304.jpg"
// fs.readFile(fil,"utf8", function(err,dat) {
// if (err) {return console.log(err); }
// console.log(dat)
// })

par=req.params.id
next()}


var chk=function(req, res, next) {
console.log(par)
next()}

// get
var gcb= function(req, res, next) {

res.render("index", {
title: par,
par:par,
iarr:iarr

});
}

router.get('/', [reaImg,chk,gcb])
// post


module.exports = router;
