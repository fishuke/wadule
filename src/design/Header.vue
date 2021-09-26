<template>
  <v-toolbar color="primary" dark>
    <router-link to="/messages">
      <v-btn icon>
        <v-icon color="white">mdi-home</v-icon>
      </v-btn>
    </router-link>
    <v-toolbar-title class="pl-2">{{ currentRouteName }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: "Header",
  computed: {
    currentRouteName() {
      return this.$route.name;
    },
  },
};
</script>

<style scoped></style>
