var express = require("express");
var router = express.Router();

var chk = function(req, res,next) {
console.log("=== chk")
console.log(res.status)

next()};

var rcb = function(req, res) {
res.status(404).render("shop/404");
};


var arr=[chk,rcb];

router.get("/shop/404",arr);

module.exports = router;
