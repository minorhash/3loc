var express = require('express');
var router = express.Router();
var fs=require("fs")
var ls=require("ls")
// glob
var par

var getPar=function(req, res, next) {
par=req.params.id
next()}


var chk=function(req, res, next) {
console.log(par)
next()}

// get
var gcb= function(req, res, next) {

res.render("404", {
title: par,
par:par

});
}

router.get('*', [getPar,chk,gcb])


module.exports = router;
