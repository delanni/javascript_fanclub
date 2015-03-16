var net = require("net");


var handler = function(){
    console.log("handler");
    
    console.log("Sending " + "VILMA! ENGEDJ BE!");
    conn.write("VILMA! ENGEDJ BE!");
    
    conn.on("connect",function(){
       console.log("connected!"); 
    });
    
    conn.on("data",function(d){
        console.log("Received:" + d.toString());
    });
};

var conn = net.connect({
    port: process.env.PORT
},handler);
