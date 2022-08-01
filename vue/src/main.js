import Vue from "vue"
import App from "./App.vue"

import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import lang from "element-ui/lib/locale/lang/en"
import locale from "element-ui/lib/locale"

import { library } from "@fortawesome/fontawesome-svg-core"
import {
  faReply,
  faPen,
  faTasks,
  faListUl,
  faFileDownload,
  faFileWord,
  faFileExcel,
  faFilePowerpoint,
  faFilePdf,
  faFile,
  faExclamationCircle,
  faClock
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import "./assets/styles/style.scss";

import "./registerServiceWorker";

import router from "./router";
import store from "./store";


import Clipboard from "v-clipboard";

import request_links from "./utils/api_links";
import alert_messages from "./utils/alert_messages";
import parse_message from "./utils/parse_message";
import name_reduction from "./utils/name_reduction";
import email_validate from "./utils/mail_validate";

import axios from "axios";
import VueAxios from "vue-axios";

import VueRandomColor from "vue-randomcolor";

import VueSocketIO from "vue-socket.io";
import SocketIO from "socket.io-client";

Vue.use(
  new VueSocketIO({
    debug: false,
    connection: SocketIO(process.env.VUE_APP_API_BASE_URL2, {
      autoConnect: false,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: localStorage.getItem("w_token"),
          },
        },
      },
    }),
    vuex: {
      store,
      actionPrefix: "SOCKET_",
      mutationPrefix: "SOCKET_",
    },
  })
);

Vue.use(VueAxios, axios);

Vue.use(VueRandomColor);

Vue.use(Clipboard);

Vue.use(ElementUI);
locale.use(lang);

library.add(
  faReply,
  faPen,
  faTasks,
  faListUl,
  faFileDownload,
  faFileWord,
  faFileExcel,
  faFilePdf,
  faFile,
  faFilePowerpoint,
  faExclamationCircle,
  faClock
)

Vue.component("font-awesome-icon", FontAwesomeIcon)

Vue.prototype.$w_api = request_links
Vue.prototype.$w_alert = alert_messages
Vue.prototype.$w_parse_message = parse_message
Vue.prototype.$w_name_reduction = name_reduction
Vue.prototype.$w_email_validate = email_validate

Vue.config.productionTip = false


export const EventEmitter = new Vue()

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app")
