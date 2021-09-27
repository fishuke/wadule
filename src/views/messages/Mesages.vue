<template>
  <main class="relative">
    <router-link to="/messages/new">
      <v-btn
        data-testid="button"
        class="mx-2 absolute right-8 -top-5"
        fab
        small
        dark
        color="accent"
      >
        <v-icon dark> mdi-plus</v-icon>
      </v-btn>
    </router-link>
    <v-list color="secondary">
      <v-list-item
        v-for="message in this.$store ? this.$store.state.messages : []"
        :key="message.id"
      >
        <v-list-item-content>
          <v-list-item-title
            v-text="message.title ? message.title : 'No Title'"
          ></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <router-link :to="`/messages/${message.id}`">
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-eye</v-icon>
            </v-btn>
          </router-link>
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
export default {
  data() {
    return {
      items: [],
    };
  },
  methods: {
    deleteEntry(message) {
      if (this.$store) {
        this.$store.state.messages = this.$store?.state.messages.filter(
          (item) => item.id !== message.id
        );
      }
      if (process.env.NODE_ENV === "production") {
        const electron = window.require("electron");
        electron.ipcRenderer.send("deleteMessage", message);
      }
    },
  },
};
</script>
