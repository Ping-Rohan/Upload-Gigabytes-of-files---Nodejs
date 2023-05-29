const { createServer } = require("http");
const { Server } = require("socket.io");
const Routes = require("./routes");

const HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers": "*",
};

function handler(request, response) {
  if (request.method === "OPTIONS") {
    response.writeHead(203, HEADERS);
    response.end();
    return;
  }

  const defaultRoute = (request, response) => {
    response.end("Hello World");
  };
  const route = new Routes(io);
  response.writeHead(200, HEADERS);
  const chosen = route[request.method.toLowerCase()] || defaultRoute;
  return chosen.apply(route, [request, response]);
}

const server = createServer(handler);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: false,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");
});

server.listen(4000, () => console.log("Server started...."));
