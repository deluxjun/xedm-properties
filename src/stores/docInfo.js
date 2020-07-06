import { observable, action } from "mobx";
import axios from "axios";

import session from "./session";
import storage from "@/utils/storage";
import helper from "@/utils/helper";

export default class DocInfo {
  @observable info = {};

  @action async getDocInfo(object_id) {
    let data = await helper.get(`/json/getDocument?docId=${object_id}`);
    let info = data.list[0];
    this.info = info;
    return info;
  }
}
