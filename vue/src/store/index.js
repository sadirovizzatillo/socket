import Vue from "vue";
import Vuex from "vuex";

import key from "./modules/key";
import register from "./modules/register";


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        message: {
            key_massage: "",
            message: "",
        },
        reconnection_count: 0,
        app_loader: false
    },
    mutations: {
        setMessage(s, v) {
            s.message = v
        },
        clearMessage(s) {
            s.message = ""
        },
        changeReconnectionCount(s, v) {
            s.reconnection_count = v
        }
    },
    actions: {
        async fetch_request({ dispatch, getters, commit }, { token, method, url, body }) {

            let headers = {}

            if (token) {
                    headers = {"Content-Type": "application/json", Authorization: localStorage.getItem("w_token")
                }
            } else {
                headers = {"Content-Type": "application/json"}
            }

            body = body ? JSON.stringify(body) : null

            const res = await fetch(url, {method, headers, body})

            if (res.ok) {

                if (!res.url.includes("/autorisation")) {
                    commit("changeReconnectionCount", 0)
                }
                return res

            } else {
                if (token) {

                    if (getters.getReconnectionCount == 2) {
                        commit("changeReconnectionCount", 0)
                        return res
                    }

                    commit("changeReconnectionCount", getters.getReconnectionCount + 1)

                    let has_new_token = await dispatch("check_token")

                    if (has_new_token) {
                        const double_res = await dispatch("fetch_request", {token, method, url, body})
                        return double_res
                    }

                } else {
                    commit("changeReconnectionCount", 0)
                    return res
                }
            }
        },
        SOCKET_OUT_Message({ commit }, data) {

            const er = {
                key_massage: "warning",
                message: data.Message ? data.Message : data
            }

            commit("setMessage", er)
        }
    },
    getters: {
        getMessage: (s) => s.message,
        getReconnectionCount: (s) => s.reconnection_count,
    },
    modules: {
        key,
        register
    }
})
