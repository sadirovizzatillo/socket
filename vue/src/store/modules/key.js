import router from "@/router";

export default {
    state: {
        user: {
            email: "",
            name: "",
            id: ""
        },
        tasks: [],
        renderUserData: false
    },
    actions: {
        async fetchKey({ dispatch, commit }, { url, body }) {
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
                    localStorage.setItem("w_token", reqJSON.token)
                    return true

                } else {

                    const reqJSON = await req.json()

                    const e = {
                        key_massage: "auth_error",
                        message: reqJSON.message.En
                    }

                    throw e

                }
            } catch (error) {
                commit("setMessage", error)
                return false
            }
        },
        async fetchUserData({ dispatch, commit }, url) {
            try {
                const res = {
                    token: true,
                    method: "GET",
                    url
                }

                const req = await dispatch("fetch_request", res)

                if (req.ok) {

                    const reqJSON = await req.json()

                    console.log(reqJSON)

                    commit("setUserData", reqJSON)
                    commit("setTasks", reqJSON.tasks)

                    localStorage.removeItem(reqJSON.user._id)

                    commit('setRenderUserData')

                } else {

                    const reqJSON = await req.json()

                    const e = {
                        key_massage: "other",
                        message: reqJSON.message
                    }

                    throw e

                }
            } catch (error) {
                commit("setMessage", error)
                return false
            }
        },
        addTask({ commit }, payload){
            commit("addTasks", payload)
        },
        removeTask({ commit }, payload){
            commit("removeTask", payload)
        }
    },
    mutations: {
        setRenderUserData(s, v) {
            s.renderUserData = !s.renderUserData
        },
        setTasks(s, v) {
            s.tasks = v
        },
        removeTask(s, payload){
           var filteredTask =  s.tasks.filter(f => f._id !== payload.list_id);
           s.tasks = filteredTask
        },
        addTasks(s, payload){
            s.tasks.push(payload)
        },
        rename_folder(s, v) {
            s.user.folder.forEach((e, i) => {
                if (e._id == v.folder_id) {
                    s.user.folder[i].name = v.folder_name
                }
            })
        },
        setUserData(s, v) {
            s.user = v.user;
            if (router.history.current.name == 'Home') {
                if (v.user.homepage) {
                    if (v.user.homepage.type == 'chat') {
                        router.push('/chats/' + v.user.homepage._id)
                    } else if (v.user.homepage.type == 'project') {
                        router.push('/project/' + v.user.homepage._id)
                    } else if (v.user.homepage.type == 'inbox') {
                        router.push('/inbox/' + v.user.homepage.project_id)
                    } else {
                        router.push('/shortcuts/' + v.user.homepage.type)
                    }
                }
            }
        },
        clearUserData(s, v) {
            s.user = {
                email: "",
                name: "",
                id: "",
            }
        },
        renderKnownUsers(s, v) {
            s.renderKnownUsers = !s.renderKnownUsers
        }
    },
    getters: {
        getTasks: (s) => s.tasks,
        getUserData: (s) => s.user,
        getRenderUserData: (s) => s.renderUserData,
    }
}
