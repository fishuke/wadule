<template>
  <main class="relative">
    <router-link to="/messages/new">
      <v-btn class="mx-2 absolute right-8 -top-5" fab small dark color="accent">
        <v-icon dark> mdi-plus</v-icon>
      </v-btn>
    </router-link>
    <!--    {{ getMessages }}-->
    <v-list color="secondary">
      <v-list-item v-for="item in items" :key="item.id">
        <v-icon color="grey lighten-1" class="mr-4">
          {{ item.repeated ? "mdi-repeat" : "mdi-calendar" }}
        </v-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-btn icon>
            <v-icon color="grey lighten-1">mdi-pencil</v-icon>
          </v-btn>
        </v-list-item-action>

        <v-list-item-action>
          <v-btn icon @click="deleteEntry(item.id)">
            <v-icon color="grey lighten-1">mdi-trash-can</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </main>
</template>
<script>
// const os = window.require("os");
// const storage = window.require("electron-json-storage");
// storage.setDataPath(os.tmpdir());

export default {
  // computed: {
  //   getMessages() {
  //     return storage.getSync("messages");
  //   },
  // },
  data() {
    return {
      items: [
        {
          title: "Günaydın Mesajı",
          id: 1,
          repeated: true,
          targets: [""],
        },
        {
          title: "Travis Howard",
          id: 2,
          repeated: false,
        },
        {
          title: "Ali Connors",
          id: 3,
          repeated: true,
        },
        {
          title: "Cindy Baker",
          id: 4,
          repeated: false,
        },
      ],
    };
  },
  methods: {
    deleteEntry(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
  },
};
</script>
