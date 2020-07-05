const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    "/xedrm/json",
    createProxyMiddleware({
      target: "http://183.111.96.15:8080",
      changeOrigin: true,
    })
  );
};
