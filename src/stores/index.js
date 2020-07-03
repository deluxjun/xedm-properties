import { createContext, useContext } from "react";
import Session from "./session";
import DocInfo from "./docInfo";

// const stores = {
//   Session,
//   DocInfo,
// };

// export interface IStore {
//   session: Session;
//   docinfo: DocInfo;
// }
export const store = {
  session: new Session(),
  docInfo: new DocInfo(),
};
export const StoreContext = createContext(store);
export const useStore = () => {
  return useContext(StoreContext);
};
