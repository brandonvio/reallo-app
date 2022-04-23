const server = require("./server");
const dotenv = require("dotenv");
dotenv.config();

(async () => {
  const result = await server.handler({ eventName: "index.js bootstrap" });
  console.log(result);
})();
