var net = require("net");


var handler = function(socket){
      socket.on('end', function() {
        console.log('client disconnected');
      });
      socket.on("data", function(d){
        console.log("Received:" + d.toString());
        console.log("Sending:" + d.toString().split("").reverse().join(""));
        socket.write(d.toString().split("").reverse().join(""));
      });
      socket.write('Haliho\r\n');
};

var srv = net.createServer(handler);

srv.listen(process.env.PORT);
console.log("Echo server listening on " + process.env.PORT);