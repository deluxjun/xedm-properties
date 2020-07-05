import storage from "electron-json-storage";
import helper from "./helper";

export default {
  get: (key) => {
    return new Promise((resolve, reject) => {
      storage &&
        storage.get(key, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
    });
  },

  set: (key, data) => {
    return new Promise((resolve, reject) => {
      storage &&
        storage.set(key, data, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
    });
  },

  remove: (key) => {
    return new Promise((resolve, reject) => {
      storage &&
        storage.remove(key, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
    });
  },
};

// export default storageObj;
