var paidyHandler=Paidy.configure(config);
function paidyPay(){
var payload={
"amount":<%= tsum %>,
"currency":"JPY",
"store_name":"axell store",
"buyer":{
"email":"<%= email %>",
"name1":"<%= usr %>",
"phone":"<%= mailadr.phn %>"
},
"buyer_data":{
"user_id":"yamada_taro",
"age":29,
"order_count":1000,
"ltv":250000,
"last_order_amount":20000,
"last_order_at":20
},
"order":{

"items":[
<% for(var i=0;i<ite.length;i++){ %>
{
"id":"<%= ite[i].id %>",
"quantity":"<%= ite[i].quantity %>",
"title":"<%= ite[i].title %>",
"unit_price":"<%= ite[i].unit_price %>"
       },
    <% } %>
],
"order_ref":"88e021674",
"shipping":0,
"tax":<%= tax %>
},
"shipping_address":{
"line1":"<%= mailadr.ln1 %>",
"line2":"<%= mailadr.ln2 %>",
"city":"<%= mailadr.city %>",
"state":"<%= mailadr.state%>",
"zip":"<%= mailadr.zip%>"
},
"description":"axell store"
};
paidyHandler.launch(payload);
};

