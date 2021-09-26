<template>
  <main>
    <v-stepper color="primary" v-model="e1" class="stepper">
      <v-stepper-header>
        <v-stepper-step :complete="e1 > 1" step="1">
          Hedef Kitle
        </v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step :complete="e1 > 2" step="2"> Zamanlama</v-stepper-step>

        <v-divider></v-divider>

        <v-stepper-step step="3"> İçerik</v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 2"> Devam Et</v-btn>

          <v-btn text> Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 3"> Devam Et</v-btn>

          <v-btn text> Cancel</v-btn>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-card class="mb-12" color="grey lighten-1" height="200px"></v-card>

          <v-btn color="primary" @click="e1 = 1"> Devam Et</v-btn>

          <v-btn text> Cancel</v-btn>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </main>
</template>
<script>
export default {
  data() {
    return {
      e1: 1,
    };
  },
};
</script>
<style scoped>
main {
  @apply flex p-4 w-full h-full;
}

.stepper {
  @apply w-full flex justify-center;
}
</style>
