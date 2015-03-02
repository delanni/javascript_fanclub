// Feladatok: 
/** 1 - Tömbátlag
Given an array of numbers as parameter "array". Return the average of the ODD numbers.
**/
function(array) {
    var sum = 0;
    var count = 0;
    for (var i = 0; i < array.length; i++) {
        if (array[i] % 2 == 1) {
            sum += array[i];
            count++;
        }
    }
    return sum / count;
}

/** 1 - Tömbátlag - High level functions
Given an array of numbers as parameter "array". Return the average of the ODD numbers.
**/
// Filter - szűrő függvény, olyan elemeket ad vissza a tömbből, amikre igaz a feltétel
// Reduce - redukáló függvény, nézz ütána :)
function(array) {
    var ptln = array.filter(function(e) {
        return e % 2 == 1
    });
    var sum = ptln.reduce(function(accumulator, nextElement) {
        return accumulator + nextElement;
    }, 0);
    return sum / ptln.length;
}


/** 2 - Tömbfordítás
Given an array "array" as a parameter. This array contains strings. Reverse all strings, and reverse the order of the strings and return this array.
**/
// Tudnivaló: ismerni kell az évezredes split-reverse-join módszert, amit 10x mutattam :)
function(array) {
    for (var i = 0; i < array.length; i++) {
        array[i] = array[i].split("").reverse().join("");
    }
    array.reverse();
    return array;
}


/** 2 - Tömbfordítás - Trükkösen
Given an array "array" as a parameter. This array contains strings. Reverse all strings, and reverse the order of the strings and return this array.
**/
// Tudnivaló: Fordított stringek fordított sorrendben az gyakorlatilag egy JSON forma megfordítva.
function(array) {
    var s = JSON.stringify(array).split("").reverse();
    s.pop();
    s.shift();
    s.push("]");
    s.unshift("[");
    return JSON.parse(s.join(""));
}

/** 3 - Tömblapítás
Given an array, containing multiple arrays, that contain non-array objects in them. Return one flat array, containing all items at level 1. E.g.: [[1,2],["a","b"]] => [1,2,"a","b"].
**/
// Tudnivaló: a tömbökön értelmezett .concat függvény két tömb összefűzését jelenti
function(thickArray) {
    var thinArray = [];
    for (var i = 0; i < thickArray.length; i++) {
        thinArray = thinArray.concat(thickArray[i]);
    }
    return thinArray;
}

/** 3 - Tömblapítás - Trükkösen
Given an array, containing multiple arrays, that contain non-array objects in them. Return one flat array, containing all items at level 1. E.g.: [[1,2],["a","b"]] => [1,2,"a","b"].
**/
// Tudnivaló: reduce függvény használata
function(thickArray) {
    return thickArray.reduce(function(acc, next) {
        return acc.concat(next);
    }, []);
}

/** 4 - Tömbszortírozás
Given the array 'array' on the input. It contains mixed types of variables (numbers, strings, booleans, and objects). Return an array containing arrays for each types of the input variables in this order: [[booleans],[numbers],[strings],[objects]].
**/
// Tudnivaló: typeof operátor stringként adja vissza a változó típusát. 
function(array) {
    var bools = [];
    var numbers = [];
    var strings = [];
    var objects = [];
    for (var i = 0; i < array.length; i++)
        switch (typeof array[i]) {
            case "boolean":
                bools.push(array[i]);
                break;
            case "number":
                numbers.push(array[i]);
                break;
            case "string":
                strings.push(array[i]);
                break;
            case "object":
                objects.push(array[i]);
                break;
        }

    return [bools, numbers, strings, objects];
}

/** 4 - Tömbszortírozás - Trükkös megoldás
Given the array 'array' on the input. It contains mixed types of variables (numbers, strings, booleans, and objects). Return an array containing arrays for each types of the input variables in this order: [[booleans],[numbers],[strings],[objects]].
**/
// Tudnivaló: typeof operátor stringként adja vissza a változó típusát. 
function(array) {
    var codes = {
        "boolean": 0,
        "number": 1,
        "string": 2,
        "object": 3
    };
    var out = [
        [],
        [],
        [],
        []
    ];

    array.forEach(function(elem) {
        out[codes[typeof elem]].push(elem);
    });

    return out;
}

/////// OBJEKTUMOK

/** 1 - Alapfeladat
Given variable number of strings on the input (hint: use the arguments object). Return an object that is built the following way: each pair of consequent strings denote a key-value pair on the object. For input ["apples","oranges","peas","carrots"] return an object { apples:"oranges", peas:"carrots" }
**/
function() {
    var out = {};
    for (var i = 0; i < arguments.length; i += 2) {
        var key = arguments[i];
        var value = arguments[i + 1];
        out[key] = value;
    }
    return out;
}

/** 5 - Darpa 
 **/

function(servers) {
    for (var i = 0; i < servers.length; i++) {
        var srv = servers[i];
        srv.IP = "ip:" + srv.IP;
        for (var j = 0; j < srv.ports.length; j++) {
            srv.ports[j].open = +srv.ports[j].open;
            srv.ports[j].number = "port:" + srv.ports[j].number;
        }
    }
    return servers;
}


/** 5 - Darpa - High level functions
 **/

function(servers) {
    servers.forEach(function(s) {
        s.IP = "ip:" + s.IP;
        s.ports.forEach(function(p) {
            p.open = +p.open;
            p.number = "port:" + p.number;
        });
    });
    return servers;
}

/**
DARPA szogralmi 
**/
// Okosan
var ports = servers.reduce(function(a,e){ return a.concat(e.ports.filter(function(x){return x.open})) },[]);

ports = ports.reduce(function(a,e){
 if (a[e.number]) a[e.number].count++;
 else a[e.number]={number: e.number, name:e.name, count:1};
 return a;
},[]);

console.log(ports.sort(function(a,b){ return b.count-a.count})[0].name);

// Klasszikusan
var t = [];
var max = 0;
var maxNev = "";
for(var i=0; i< servers.length; i++){
 var s = servers[i];
 for (var j=0;j< s.ports.length; j++){
  var p = s.ports[j];
  if (p.open) t[p.name] = (t[p.name] || 0)+1;
 }
}

var portNevek = Object.keys(t);
for (var i=0;i<portNevek.length;i++){
 if (t[portNevek[i]] > max ) { max = t[portNevek[i]]; maxNev = portNevek[i]; }
}

console.log(maxNev);