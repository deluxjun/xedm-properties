export default function initWebSocket() {
  var logger = require("log4js").getLogger();
  var WebSocketServer = window.require("websocket").server;
  var http = require("http");
  var server = http.createServer(function (request, response) {
    logger.info(" Received request for " + request.url);
    response.writeHead(404);
    response.end();
  });
  server.listen(21022, function () {
    logger.info(" Server is listening on port 21022");
  });
  const wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser. You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false,
  });
  function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
  }
  wsServer.on("request", function (request) {
    if (!originIsAllowed(request.origin)) {
      // Make sure we only accept requests from an allowed origin
      request.reject();
      logger.info(" Connection from origin " + request.origin + " rejected.");
      return;
    }
    var connection = request.accept(null, request.origin);
    logger.info(" Connection accepted.");
    connection.on("message", function (message) {
      if (message.type === "utf8") {
        logger.info("Received Message: " + message.utf8Data);
        // TODO: jump to properties etc..
        connection.sendUTF(message.utf8Data);
      } else if (message.type === "binary") {
        logger.info(
          "Received Binary Message of " + message.binaryData.length + " bytes"
        );
        connection.sendBytes(message.binaryData);
      }
    });
    connection.on("close", function (reasonCode, description) {
      logger.info(" Peer " + connection.remoteAddress + " disconnected.");
    });
  });
}
