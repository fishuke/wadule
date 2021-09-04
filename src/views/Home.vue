<template>
  <main>
    <div class="button-container">
      <Button theme="primary">Schedule Message to group</Button>
      <Button theme="secondary">Schedule Message to all</Button>
    </div>
  </main>
</template>

<style scoped>
main {
  @apply flex justify-center items-center w-full h-full;
}

.button-container {
  @apply w-60 flex items-stretch gap-6 flex-col;
}
</style>
<script>
import Button from "../components/Button";
export default {
  components: { Button },
};
</script>
