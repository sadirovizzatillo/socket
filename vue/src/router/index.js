import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Home",
        meta: { layout: "main", auth: true },
        component: Home
    },
    {
        path: "/login",
        name: "Login",
        meta: { layout: "auth", auth: false },
        component: () => import("../views/Login.vue")
    },
    {
        path: "/registration",
        name: "Registration",
        meta: { layout: "auth", auth: false },
        component: () => import("../views/Registration.vue")
    },
    {
        path: "*/*",
        name: "page not found",
        meta: { layout: "main", auth: false },
        component: () => import("../views/404.vue")
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {

  const curUser = localStorage.getItem("w_token")
  const requireAuth = to.matched.some((r) => r.meta.auth)
  
  if (!curUser && requireAuth) next("/login?message=login")
  else next()

})

export default router