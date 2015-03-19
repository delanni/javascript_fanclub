var fs = require("fs");

var args = process.argv;

if (args.length < 3) {
    console.log("SUPER TEXT PROCESSOR SCRIPT!");
    console.log("----------------------------");
    console.log("USAGE:");
    console.log("For encoding: node processor.js <fileToEncode>");
    console.log("For decoding: node processor.js decode <fileToDecode>");
    process.exit();
}

var mode = "encode";
if (args.some(function(x) {
        return x == "decode"
    })) {
    mode = "decode";
}

var shifter = 10;
var transform = function(file, mode) {
    console.log("Mode: " + mode);
    var letters = file.split("").map(function(c) {
        return c.charCodeAt(0);
    });
    if (mode == "encode") {
        letters = letters.map(function(i){return i+shifter});
    }
    else {
        letters = letters.map(function(i){return i-shifter});
    }
    return String.fromCharCode.apply(null, letters);
};

var fileName = args.pop();
console.log("File: " + fileName);

if (fs.existsSync(fileName)) {
    var descriptor = fs.statSync(fileName);

    if (descriptor.isFile()) {
        var file = fs.readFileSync(fileName).toString();
        var transformed = transform(file, mode);
        fs.writeFileSync(fileName, transformed);
        console.log("File written");
    }
}
