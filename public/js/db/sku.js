const cdb=require("cardb")
const udb=require("usrdb")

const sku="401"
const spre=cdb.skuPre(sku)
const apre=cdb.allPre()
//console.log(apre)

const pat1=/\b3/g
const mat=sku.match(pat1)
console.log(mat)
console.log("===")

for(let i=0;i<apre.length;i++){
    //console.log(apre[i].sku.toString())
const res=(apre[i].sku.toString()).match(pat1)
console.log(res)

}

const str=""
const st1=null
const st2=undefined
console.log("===")
console.log(str)
console.log(st1)
console.log(st2)

