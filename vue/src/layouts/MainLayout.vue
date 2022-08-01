<template>
  <div class="main">
    <div class="content">
      <div class="list__add">
        <input type="text" placeholder="Name" v-model="task_name" />
        <button @click="add" class="btn green">Add</button>
      </div>
      <div class="lists">
        <p>{{ ad }}</p>
        <div class="list" v-for="task of getTasks" :key="task._id">
          <p>{{ task.name }}</p>

          <button @click="deleteTask(task._id)" class="btn red">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "MainLayout",
  sockets: {
    connect: function () {
      console.log("socket to notification channel connected");
    },
    OUT_TaskDelete: function (message) {
      this.removeTask(message);
      console.log(message);
    },
    OUT_TaskAdd: function (message) {
      this.addTask(message);
    },
  },
  data() {
    return {
      sideSpan: 232,
      mainSpan: 1625,
      sideClass: "",
      task_name: "",
      ad: "",
    };
  },

  created() {
    this.$socket.connect();
  },

  async mounted() {
    await this.fetchUserData(this.$w_api.GET_USER_DATA);

    this.$socket.io.opts.transportOptions.polling.extraHeaders.Authorization = localStorage.getItem(
      "w_token"
    );

    this.watchWindowWidth();
  },

  methods: {
    ...mapActions(["fetchUserData", "addTask", "removeTask"]),
    watchWindowWidth() {
      const width = window.innerWidth;

      if (width > 1024) {
        this.sideSpan = 232;
        this.sideClass = "";
      } else if (width <= 1024) {
        this.sideSpan = 40;
      }

      this.mainSpan = width - this.sideSpan;

      if (width <= 1024) {
        this.sideClass = "sidebar_collapse active";
      }
    },
    toggle_collapse() {
      this.$refs.collapse_sidebar.classList.toggle("active");
    },
    add() {
      this.$socket.emit("IN_TaskAdd", {
        name: this.task_name,
        _id: Math.floor(Math.random() * 100),
      });
      this.task_name = "";
    },
    deleteTask(id) {
      this.$socket.emit("IN_TaskDelete", {
        _id: id,
      });
      console.log(id);
    },
  },
  computed: {
    ...mapGetters(["getUserData", "getTasks"]),
  },
};
</script>
