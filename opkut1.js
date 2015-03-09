var TANK_CAPABILITY = 300;
var FILL_OVERHEAD = 5000;

require("fs").writeFileSync("alma.txt","I ran");

var http = require("http");
http.createServer(function(req,res){ res.end("NO");}).listen(process.env.PORT);

var CITIES = [{
    name: "A",
    gasPrice: 380,
    distanceToNext: 130
}, {
    name: "B",
    gasPrice: 400,
    distanceToNext: 70
}, {
    name: "C",
    gasPrice: 375,
    distanceToNext: 98
}, {
    name: "D",
    gasPrice: 410,
    distanceToNext: 150
}, {
    name: "E",
    gasPrice: 400,
    distanceToNext: 120
}, {
    name: "F",
    gasPrice: 410,
    distanceToNext: 36
}, {
    name: "G",
    gasPrice: 420,
    distanceToNext: 87
}, {
    name: "H",
    gasPrice: 385,
    distanceToNext: 95
}, {
    name: "I",
    gasPrice: 395,
    distanceToNext: 105
}];

for (var i = 0; i < CITIES.length; i++) {
    var c = CITIES[i];
    c.neighbours = [];
    for (var j = i + 1; j < CITIES.length; j++) {
        if (distanceBetween(i, j) <= 300) {
            c.neighbours.push(CITIES[j]);
        }
    }
}

function evaluateSolution(stops) {
    console.log(stops);
    var currentGas = 0;
    var currentCity = 0;
    var totalCost = 0;
    for (var i = 0; i < stops.length; i++) {
        var stop = stops[i];
        if (distanceBetween(currentCity, stop.cityIndex) > currentGas) {
            console.log("Solution runs out of fuel at " + CITIES[currentCity].name);
            return Infinity;
        }
        var city = CITIES[stop.cityIndex];
        if (stop && city) {
            totalCost += 5000;
            totalCost += city.gasPrice * stop.amount;
            currentGas += stop.amount;
        }
    }
    if (CITIES[currentCity].name != "I") {
        console.log("Solution does not get to I");
        return Infinity;
    }
    return totalCost;
}

function distanceBetween(from, to) {
    var city1 = CITIES[from];
    var city2 = CITIES[to];
    var distance = -1;

    for (var i = 0; i < CITIES.length; i++) {
        if (CITIES[i] == city1) distance = 0;

        if (CITIES[i] == city2) return distance;
        else distance += CITIES[i].distanceToNext;
    }

    return -1;
}

function resolve(cityName) {
    return cityName.charCodeAt(0) - 65;
}

function pick(byName) {
    return CITIES[resolve(byName)];
}

for (var i = 0; i < CITIES.length; i++) {
    CITIES[i].endings = [];
}
CITIES[i - 1].endings = ["I"];

for (var i = CITIES.length - 1; i >= 0; i--) {
    if (i + 1 < CITIES.length) {
        CITIES[i].endings = CITIES[i].neighbours.reduce(function(a, b) {
            var endings = b.endings.map(function(E) {
                return CITIES[i].name + E
            });
            return a.concat(endings);
        }, []);
    }
}
var paths = CITIES[0].endings;



function expandPath(pathCode) {
    var stops = [];
    for (var i = 0; i < pathCode.length; i++) {
        var city = pick(pathCode[i]);
        stops.push({
            name: city.name,
            cityIndex: resolve(city.name),
            gasPrice: city.gasPrice,
            amount: 0
        });
    }
    return stops;
}

function optimizePath(stops) {
    var edges = [];
    var totalDistance = 0;
    for (var i = 0; i < stops.length - 1; i++) {
        var length = distanceBetween(stops[i].cityIndex, stops[i + 1].cityIndex);
        totalDistance += length;
        edges.push({
            index: i,
            name: stops[i].name + stops[i + 1].name,
            gas: 0,
            min: length,
            max: TANK_CAPABILITY
        });
    }

    var totalGas = 0;
    while(totalDistance>totalGas){
        var e = edges.filter(function(e){ return e.gas<e.min})[0];
        if (e){
            var cheapestPlaceIndex = 0;
            var cheapestPlacePrice = Infinity;
            for (var x = e.index; x>=0; x--){
                if (edges[x].gas >= edges[x].max) break;
                if (stops[x].gasPrice<cheapestPlacePrice){
                    cheapestPlacePrice = stops[x].gasPrice;
                    cheapestPlaceIndex = x;
                }
            }
            
            stops[cheapestPlaceIndex].amount++;
            totalGas++;
            
            for (var x = e.index; x>=cheapestPlaceIndex; x--){
                edges[x].gas++;
            }
        }
    }

}