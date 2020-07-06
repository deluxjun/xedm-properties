import axios from "axios";

const helper = {
  initLog: (devMode = true) => {
    const log4js = require("log4js");
    log4js.configure({
      appenders: {
        console: {
          type: "console",
        },
        system: {
          type: "dateFile",
          filename: "log/xedm.log",
          maxLogSize: 10 * 1024 * 1024,
          backups: 5,
        },
      },
      categories: {
        default: {
          appenders: ["console", "system"],
          level: "all",
        },
      },
    });
    const myLogger = new log4js.getLogger();
    if (!devMode) {
      myLogger.level = "info";
    } else {
      myLogger.level = "debug";
      // log4js.configure({
      //   appenders: {
      //     console: {
      //       type: "console",
      //     },
      //   },
      //   categories: {
      //     default: {
      //       appenders: ["console"],
      //       level: "all",
      //     },
      //   },
      // });
    }
    window.logger = myLogger;
    window.logger.info("log4js has been initialized");
  },
  isElectron: () => {
    // Renderer process
    if (
      typeof window !== "undefined" &&
      typeof window.process === "object" &&
      window.process.type === "renderer"
    ) {
      return true;
    }

    // Main process
    if (
      typeof process !== "undefined" &&
      typeof process.versions === "object" &&
      !!process.versions.electron
    ) {
      return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (
      typeof navigator === "object" &&
      typeof navigator.userAgent === "string" &&
      navigator.userAgent.indexOf("Electron") >= 0
    ) {
      return true;
    }

    return false;
  },
  isDev: () => {
    return process.env.NODE_ENV !== "production";
  },
  get: (url, params = "", withNoty = false) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params: params })
        .then((response) => {
          if (response.data.errcode && response.data.errcode != "0") {
            // -100 is expired session
            if (response.data.errcode == -100) {
              reject(response.data);
              return;
            }
            // if (withNoty) vue.$showError("" + response.data.errmsg);
            reject(response.data);
            return;
          }
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response && error.response.status == 401) {
            // toLogin();
            return;
          }
          if (error.response && error.response.data) {
            // if (withNoty && error.response.data.errmsg)
            //   vue.$showError("" + error.response.data.errmsg);
            reject(error.response.data);
          }
        });
    });
  },
  postUrl: (url, content = "", withNoty = false) => {
    return helper.post(
      url,
      content,
      "application/x-www-form-urlencoded; charset=UTF-8",
      withNoty
    );
  },
  post: (
    url,
    content = "",
    contentType = "application/json",
    withNoty = false
  ) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, content, { headers: { "Content-Type": contentType } })
        .then((response) => {
          if (response.data.errcode && response.data.errcode != "0") {
            // -100 is expired session
            if (response.data.errcode == -100) {
              reject(response.data);
              return;
            }
            // if (withNoty)
            //   vue.$showError('' + response.data.errmsg)
            reject(response.data);
            return;
          }
          resolve(response.data);
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 401) {
            reject("" + error.response.data);
            return;
          }
          if (error.response.data) {
            // if (withNoty)
            //   vue.$showError(error.response.data)
            reject("" + error.response.data);
          }
        });
    });
  },
  param: (obj) => {
    return Object.keys(obj)
      .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(obj[k]))
      .join("&");
  },
};

export default helper;
