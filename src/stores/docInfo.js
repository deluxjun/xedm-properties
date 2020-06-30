import { observable, action } from "mobx";
import axios from "axios";

import session from "./session";

class DocInfo {
  @observable show = false;
  @observable remove = false;
  @observable user = {};
  @observable pallet = [];
}

const self = new DocInfo();
export default self;
