/**
 * A webszerverek altalanos celja: kapott HTTP keresre webes eroforrasokat adjon vissza,
 * esetleg processzalja valahogy a kerest, es az alapjan dinamikusan generaljon tartalmat.
 * Pl.: PHP:
 *  Keres -> (html,css,js) eroforras: statikus kiszolgalas
 *        ->  PHP eroforras : a php kod ertelmezese, html generalasa?
 * stb...
 *
 * A mi esetunkben: egyszeru statikus eroforras kiszolgalo.
 * */

// Kell a http lib., mert http szervert akarunk csinalni
var http = require("http");

// Kell a fs, mert fajlokat akarunk olvasni
var fs = require("fs");

var path = require("path");


// Eloszor csak kiprobaljuk milyen
var kiszolgaloFuggveny = function(keres,valasz){
    // Megirjuk, hogy, oke, minden fasza, van ilyen eroforras (200-as kod)
    valasz.writeHead(200, {
      "Content-Type":"text/plain"
    });

    // Lekuldunk valami szoveget
    valasz.write("Szerusz!");

    // Majd lezarjuk a csatornat
    valasz.end();
};


// // Masodszor csinalunk egy olyat, ami nem talal eroforrast
// var kiszolgaloFuggveny = function(keres,valasz){
//     var url = keres.url;

//     // Most azt mondjuk, hogy 404-eroforras nem talalhato
//     valasz.writeHead(404, {
//         "Content-Type":"text/plain",
//         "Gyumolcske":"Almacska"
//     });

//     // Irunk nekik valami szepet
//     valasz.write("A kert eroforras: '" + url + "' nem talalhato.");

//     // Es lezarjuk
//     valasz.end();
// };

// // Most csinalunk egy fajlszervert
// var kiszolgaloFuggveny = function(k, v) {
//     // Az url tartalmazza a felolvasando fajlt
//     var url = "." + k.url;

//     var fDesc = fs.existsSync(url) && fs.lstatSync(url);

//     // Ha letezik a fajl
//     if (fDesc && fDesc.isFile()) {
//         // akkor felolvassuk
//         var fajl = fs.readFileSync(url);

//         v.writeHead(200, {
//             "Content-Type": "text/plain"
//         });

//         // es lekuldjuk
//         v.write(fajl);
//         v.end();
//     }
//     else {

//         // Ha nem, akkor lekuldjuk az elozo hibauzit
//         v.writeHead(404, {
//             "Content-Type": "text/plain"
//         });

//         // Irunk nekik valami szepet
//         v.write("A kert eroforras: '" + url + "' nem talalhato.");

//         // Es lezarjuk
//         v.end();
//     }
// };

//  // Most csinalunk egy fajlszervert
// var kiszolgaloFuggveny = function(k, v) {
//     // Az url tartalmazza a felolvasando fajlt
//     var url = "." + k.url;

//     var fDesc = fs.existsSync(url) && fs.lstatSync(url);

//     // Ha letezik a fajl
//     if (fDesc && fDesc.isFile()) {
//         // akkor kielemezzuk, hogy mifele, kifele
//         var eleresiUt = path.resolve(url);
//         if (eleresiUt.indexOf("/home/ubuntu/workspace/") < 0 ||
//             (eleresiUt.indexOf(".js") < 0 && eleresiUt.indexOf(".html") < 0 && eleresiUt.indexOf(".css") < 0)
//         ) {
//             // hekker alert
//             v.writeHead(403, {
//                 "Content-Type": "text/plain"
//             });
//             v.end("Ne hekkelj itten!");
//             return;
//         }

//         var fajl = fs.readFileSync(url);
//         var header = {
//             "Content-Length": fajl.length
//         };
//         switch (eleresiUt.split(".").pop()) {
//             case 'js':
//                 header["Content-Type"] = "text/javascript";
//                 break;
//             case 'html':
//                 header["Content-Type"] = "text/html";
//                 break;
//             case 'css':
//                 header["Content-Type"] = "text/css";
//                 break;

//             default:
//                 header["Content-Type"] = "text/plain";
//         }
//         v.writeHead(200, header);

//         // es lekuldjuk
//         v.write(fajl);
//         v.end();
//     }
//     else {
//         // Ha nem, akkor lekuldjuk az elozo hibauzit
//         v.writeHead(404, {
//             "Content-Type": "text/plain"
//         });

//         // Irunk nekik valami szepet
//         v.write("A kert eroforras: '" + url + "' nem talalhato.");

//         // Es lezarjuk
//         v.end();
//     }
// };


// Csinalunk egy szervert, 1 olyan fuggvenyt var, ami 2 parametert var:
// Mi a keres?
// Mi legyen a valasz?
// A kiszolgaloFuggveny pont ilyen fuggveny
var server = http.createServer(kiszolgaloFuggveny);

// Majd azt mondjuk a szervernek, hogy kezdjen el hallgatozni a keresekre
server.listen(process.env.PORT);
console.log("elindultam a " + process.cwd() + " mappaban");