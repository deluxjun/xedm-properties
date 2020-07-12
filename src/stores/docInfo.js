import { observable, action } from "mobx";
import axios from "axios";

import session from "./session";
import storage from "@/utils/storage";
import helper from "@/utils/helper";

export default class DocInfo {
  @observable elementId = "20200712155704pz";
  @observable info = {};

  @action async getDocInfo() {
    let data = await helper.get(`/json/getDocument?docId=${this.elementId}`);
    let info = data.list[0];
    this.info = info;
    return info;
  }

  @action async getHistory(page, pageSize) {
    return helper.get(
      `/json/getHistory?docId=${this.elementId}&page=${page}&pageSize=${pageSize}`
    );
  }
}
