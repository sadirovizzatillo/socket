<template>
    <div class="home"></div>
</template>

<script>

    import { mapMutations, mapActions } from "vuex"

    export default {
        name: "Home",
        data() {
            return {
                num: 0
            }
        },
        methods: {
            ...mapActions(["fetch_request"]),
            ...mapMutations([
                "setProjects",
                "clearComments",
                "clearTasks",
                "clearUserUsedFileSize",
                "clearUserAllFileSize"
            ]),
            logout() {
                this.setProjects([])
                this.clearComments()
                this.clearUserUsedFileSize()
                this.clearUserAllFileSize()
                this.clearTasks()
                this.$socket.disconnect()
                localStorage.removeItem("w_token")
                localStorage.removeItem("w_clone_token")
                this.$router.push("/login")
                console.log("User Logout")
            }
        }
    }

</script>

<style lang="scss" scoped>

    .h2 {
        margin: 20px;
        cursor: pointer;
        font-size: 24px;
        font-weight: bold;
        font-family: $main_family;
        color: $main-color;
        display: block;
        user-select: none;
    }
    
</style>
