<script>
import VueQr from "vue-qr";

export default {
  components: { VueQr },
};
</script>

<template>
  <div class="qr-container">
    <vue-qr :text="this.$store.state.qr" />
  </div>
</template>

<style>
.qr-container {
  @apply flex justify-center items-center w-full h-full;
}
</style>
