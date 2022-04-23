const fs = require("fs");
const propJson = fs.readFileSync("./properties.json");
console.log(propJson);
