<template>
  <main class="relative">
    <router-link to="/messages/new">
      <v-btn class="mx-2 absolute right-8 -top-5" fab small dark color="accent">
        <v-icon dark> mdi-plus</v-icon>
      </v-btn>
    </router-link>
    <v-list color="secondary">
      <v-list-item
        v-for="message in this.$store.state.messages"
        :key="message.id"
      >
        <v-list-item-content>
          <v-list-item-title
            v-text="message.title ? message.title : 'No Title'"
          ></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-action>
          <v-btn icon @click="deleteEntry(message)">
            <v-icon color="grey lighten-1">mdi-trash-can</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </main>
</template>
<script>
const electron = window.require("electron");

export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    deleteEntry(message) {
      this.$store.state.messages = this.$store.state.messages.filter(
        (item) => item.id !== message.id
      );
      electron.ipcRenderer.send("deleteMessage", message);
    },
  },
};
</script>
