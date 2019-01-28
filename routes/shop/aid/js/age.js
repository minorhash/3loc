var age=require("superagent")

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
