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
export const stores = {
  session: new Session(),
  docInfo: new DocInfo(),
};
export const StoreContext = createContext(stores);
export const useStore = () => {
  return useContext(StoreContext);
};

export default stores;
