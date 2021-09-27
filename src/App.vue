<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
const electron = window.require("electron");
import store from "./store";
import "./services/storage.service";

export default {
  store: store,
  mounted: function () {
    electron.ipcRenderer.on("scheduledMessages", (event, messages) => {
      this.$store.state.messages = messages;
    });
    electron.ipcRenderer.on("qr", (event, qr) => {
      this.$store.state.qr = qr;
      this.$router.push("/login");
    });
    electron.ipcRenderer.on("ready", () => {
      if (
        this.$router.currentRoute.name === "Loading" ||
        this.$router.currentRoute.name === "Login"
      )
        this.$router.push("/messages");
    });
    electron.ipcRenderer.on("contacts", (event, contacts) => {
      this.$store.state.contacts = contacts;
    });
    electron.ipcRenderer.on("deleteMessage", (event, message) => {
      const index = this.$store.state.messages.findIndex(
        (msg) => msg.id === message.id
      );
      this.$store.state.messages.splice(index, 1);
    });
  },
};
</script>
