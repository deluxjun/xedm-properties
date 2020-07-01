/* eslint-disable no-eval */
import axios from "axios";
import { observable, action } from "mobx";

import storage from "@utils/storage";
import helper from "@utils/helper";

const CancelToken = axios.CancelToken;

// function parseToken(result) {
//   let path = store.state.baseURL;
//   if (path === "") path = "/";

//   if (result.list[0]) {
//     let ticketId = result.list[0].xedmSession;
//     let lang = "ko";
//     lang = result.list[0].locale;
//     if (ticketId) {
//       Utils.setCookie("auth", ticketId, 86400, path);
//       Utils.setCookie("lang", lang);
//       let user = result.list[0];

//       store.commit("setUser", user);
//       store.commit("setTicket", ticketId);

//       let groupinfo = result.list[0].group;
//       store.commit("setGroupInfo", groupinfo);
//     }

//     if (process.env.NODE_ENV !== "production" && result.list[0].jsessionid) {
//       let cookieName = store.state.info.sessionCookieName
//         ? store.state.info.sessionCookieName
//         : "JSESSIONID";
//       let cookieAge = store.state.info.sessionCookieAge
//         ? store.state.info.sessionCookieAge
//         : 86400;
//       Utils.setCookie(cookieName, result.list[0].jsessionid, cookieAge, path);
//     }
//   }
// }

class Session {
  @observable loading = true;
  @observable auth;
  @observable info;

  // get info
  async getInfo() {
    let info = {};
    let response = await axios.get("/json/info");
    for (let field in response.data) {
      info[field] = response.data[field];
    }

    self.info = info && Object.keys(info).length ? info : void 0;
    console.log(info);

    return info;
  }

  @action async init(contentType = null) {
    axios.defaults.baseURL = "/xedrm";

    axios.defaults.headers.common["Pragma"] = "no-cache";
    if (contentType)
      axios.defaults.headers.common["Content-Type"] = contentType;

    self.getInfo();
  }

  @action async setAuth(auth) {
    if (auth && Object.keys(auth).length) {
      storage.set("auth", auth);
      self.auth = auth;

      this.init();

      if (self.auth) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${self.auth}`; // for all requests
      }
    }

    return auth;
  }
}

const self = new Session();
export default self;
