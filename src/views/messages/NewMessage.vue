<template>
  <main class="m-8">
    <h1 class="text-center m-8 text-2xl">Select Contacts</h1>
    <v-autocomplete
      background-color="secondary"
      v-model="targets"
      :items="getContacts"
      filled
      chips
      color="primary lighten-3"
      label="Select"
      item-text="name"
      item-value="phone"
      multiple
    >
      <template v-slot:selection="data">
        <v-chip
          small
          v-bind="data.attrs"
          :input-value="data.selected"
          close
          @click="data.select"
          @click:close="removeTarget(data)"
        >
          {{ data.item.name }}
        </v-chip>
      </template>
      <template v-slot:item="data">
        <template v-if="typeof data.item !== 'object'">
          <v-list-item-content v-text="data.item"></v-list-item-content>
        </template>
        <template v-else>
          <v-list-item-content>
            <v-list-item-title v-html="data.item.name"></v-list-item-title>
            <v-list-item-subtitle
              v-html="formatPhone(data.item.phone)"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </template>
      </template>
    </v-autocomplete>

    <h1 class="text-center m-8 text-2xl">Content</h1>
    <v-textarea
      solo
      background-color="secondary"
      name="input-7-4"
      label="Content"
      v-model="content"
    ></v-textarea>

    <v-btn block color="accent" @click="sendNow"> Send Now!</v-btn>
  </main>
</template>

<script>
const electron = window.require("electron");

export default {
  name: "NewMessage",
  computed: {
    getContacts() {
      return this.$store.state.contacts;
    },
  },
  data() {
    return {
      targets: [],
      content: null,
    };
  },
  methods: {
    formatPhone(phone) {
      return "+" + phone.split("@")[0];
    },
    removeTarget(data) {
      const { index } = data;
      if (index >= 0) this.targets.splice(index, 1);
    },
    sendNow() {
      const message = {
        content: this.content,
        targets: this.targets,
      };
      electron.ipcRenderer.send("instantMessage", message);
    },
  },
};
</script>

<style scoped></style>
