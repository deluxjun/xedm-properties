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
          pattern: "-yyyy-MM-dd",
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
};

export default helper;
