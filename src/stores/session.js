/* eslint-disable no-eval */
import axios from "axios";
import { observable, action } from "mobx";

import storage from "@/utils/storage";
import helper from "@/utils/helper";
var logger = require("log4js").getLogger();

const CancelToken = axios.CancelToken;

export default class Session {
  @observable loading = true;
  @observable auth;
  @observable info;

  parseToken(result) {
    // let path = store.state.baseURL;
    // if (path === "") path = "/";

    if (result.list[0]) {
      let ticketId = result.list[0].xedmSession;
      let lang = "ko";
      lang = result.list[0].locale;
      if (ticketId) {
        // Utils.setCookie("auth", ticketId, 86400, path);
        // Utils.setCookie("lang", lang);
        let user = result.list[0];

        // store.commit("setUser", user);
        this.auth = ticketId;

        // let groupinfo = result.list[0].group;
        // store.commit("setGroupInfo", groupinfo);
      }

      // if (process.env.NODE_ENV !== "production" && result.list[0].jsessionid) {
      //   let cookieName = store.state.info.sessionCookieName
      //     ? store.state.info.sessionCookieName
      //     : "JSESSIONID";
      //   let cookieAge = store.state.info.sessionCookieAge
      //     ? store.state.info.sessionCookieAge
      //     : 86400;
      //   Utils.setCookie(cookieName, result.list[0].jsessionid, cookieAge, path);
      // }
    }
  }

  // get info
  async getInfo() {
    let info = {};
    let response = await axios.get("/json/info");
    for (let field in response.data) {
      info[field] = response.data[field];
    }

    this.info = info && Object.keys(info).length ? info : void 0;
    console.log(info);

    return info;
  }

  // login
  async login() {
    let data = null;
    data = {
      userId: "374029",
      password: "374029",
    };

    return new Promise((resolve, reject) => {
      helper
        .postUrl(`/json/login`, helper.param(data), false)
        .then((r) => {
          if (r.errcode != "0") {
            reject(r.errmsg);
            return;
          }
          this.parseToken(r);
          resolve();
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  }

  @action async init(contentType = null) {
    axios.defaults.baseURL = "/xedrm";

    axios.defaults.headers.common["Pragma"] = "no-cache";
    if (contentType)
      axios.defaults.headers.common["Content-Type"] = contentType;

    this.getInfo();

    // for debug. login and setAuth
    if (helper.isDev()) {
      // login
      logger.info("trying login.. because of DEV mode");
      this.login().then((r) => {
        this.setAuth(this.auth);
        logger.info("logged in!");
      });
    }
  }

  @action async setAuth(auth) {
    if (auth && Object.keys(auth).length) {
      storage.set("auth", auth);
      this.auth = auth;

      if (this.auth) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${this.auth}`; // for all requests
      }
    }

    return auth;
  }
}

// const self = new Session();
// export default self;
