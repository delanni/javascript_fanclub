console.log("én itt közben csak logolgatok");
console.log("ja és beállítok pár globális változót");
alma = 5;
document.title="HELóka nyalóka";
var jancsi= "pancsi";
console.warn("Szívesen");

console.info("na jó... csinálok ide még egy függvényt");

var worldDestructionFunction =  function(){
    alert("bocsi");
    window.close();
};

var sakktabla = function(n){
    n = n || 10; // if (n == null) n = 10;
      var i = 0;
      while (i<n){
        for(var j = 0; j<n; j++){
          if((i+j)%2==0){
            document.write("▓");
          } else document.write("░");
        }
        document.write("<br />");
        i++;
      }
}

console.info("csináltam egy ilyen sakktábla függvényt. az a neve hogy sakktabla()");
console.info("Próbáld ki a worldDestructionFunction()-t, király lesz!");