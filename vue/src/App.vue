<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import AuthLayout from "@/layouts/AuthLayout";
import MainLayout from "@/layouts/MainLayout";

export default {
  name: "App",
  methods: {
    ...mapMutations(["clearMessage", "changeCommentLoading"]),
    ...mapActions([
      "check_token",
      "socket_send_firebase_token",
      "connectSocket",
    ]),
    showMessage(e) {
      if (e.key_massage) {
        const msg =
          e.message != "" ? e.message : this.$w_alert[e.key_massage].text;
        this.$message[this.$w_alert[e.key_massage].status](msg);
        this.clearMessage();
      } else {
        const msg = this.$w_alert["no key_massage"].text;
        this.$message[this.$w_alert["no key_massage"].status](msg);
        console.log("------------------------------------");
        console.error(
          "Custom error. Something went wrong. Look in App.vue. Error: ",
          e
        );
        console.log("------------------------------------");
        this.clearMessage();
      }
    },
  },
  sockets: {
    // connect: function () {
    //   console.log("socket connected");
    // },
    connect_error: async function (e) {
      this.$socket.disconnect();

      const req = await this.check_token();
      if (req) {
        this.$socket.io.opts.transportOptions.polling.extraHeaders.Authorization = localStorage.getItem(
          "w_token"
        );
      }
    },
  },
  computed: {
    ...mapGetters([
      "getMessage",
      "getUserData",
      "getChats",
      "getCompletedTasks",
    ]),
    layout() {
      return (this.$route.meta.layout || "auth") + "-layout";
    },
  },
  watch: {
    getMessage(e) {
      if (e && e.key_massage != "") this.showMessage(e);
    },
  },
  components: {
    AuthLayout,
    MainLayout,
  },
};
</script>
