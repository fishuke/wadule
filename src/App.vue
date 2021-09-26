<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
// const electron = window.require("electron");
import store from "./store";

export default {
  store: store,
  mounted: function () {
    // electron.ipcRenderer.on("qr", (event, qr) => {
    //   this.$store.state.qr = qr;
    //   this.$router.push("/login");
    // });
    // electron.ipcRenderer.on("ready", () => {
    //   this.$router.push("/home");
    // });
  },
};
</script>
