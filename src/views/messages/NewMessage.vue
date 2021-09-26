<template>
  <main>
    <h1 class="text-center m-8 text-2xl">Select Contacts</h1>

    <v-autocomplete
      rounded
      solo
      multiple
      small-chips
      background-color="secondary"
      hint="Please select contacts for the message."
    ></v-autocomplete>
  </main>
</template>

<script>
export default {
  name: "NewMessage",
};
</script>

<style scoped></style>
