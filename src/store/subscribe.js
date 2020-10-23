import axios from "axios";

import store from "@/store";

store.subscribe(mutation => {
  switch (mutation.type) {
    case "auth/SET_TOKEN":
      if (mutation.payload) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${mutation.payload}`;
        localStorage.setItem("via-feedback@token", mutation.payload);
      } else {
        axios.defaults.headers.common["Authorization"] = null;
        localStorage.removeItem("via-feedback@token");
      }
      break;
    case "auth/SET_USER":
      if (mutation.payload) {
        localStorage.setItem(
          "via-feedback@user",
          JSON.stringify(mutation.payload)
        );
      } else {
        localStorage.removeItem("via-feedback@user");
      }
      break;
  }
});
