import { observable, action } from "mobx";
import axios from "axios";

import session from "./session";
import storage from "@utils/storage";

function get(url, params = "", withNoty = false) {
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
}

export default class DocInfo {
  @observable info = {};

  @action async getDocInfo(object_id) {
    let data = await get(`/json/getDocument?docId=${object_id}`);
    let info = data.list[0];
    this.info = info;
    return info;
  }
}
