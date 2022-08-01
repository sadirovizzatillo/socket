export default {
    state: {},
    actions: {
        async register({ commit, dispatch }, { url, body }) {
            try {

                const res = {
                    token: false,
                    method: "POST",
                    url,
                    body
                }

                const req = await dispatch("fetch_request", res)

                if (req.ok) {

                    const reqJSON = await req.json()

                    const e = {
                        key_massage: "success",
                        message: "Authorization was successful"
                    }

                    commit("setMessage", e)
                    localStorage.setItem("w_token", reqJSON.token)
                    return true

                } else {

                    const reqJSON = await req.json()

                    const e = {
                        key_massage: "other",
                        message: reqJSON.message.En
                    }

                    throw e
                }
            } catch (error) {
                commit("setMessage", error)
                return false
            }
        }
    },
    mutations: {},
    getters: {}
}
