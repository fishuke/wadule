<template>
  <v-footer color="secondary" padless>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>Fishuke</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped></style>
