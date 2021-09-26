<template>
  <main class="h-full w-full flex justify-between flex-col">
    <div>
      <Header />
      <router-view />
    </div>
    <Footer />
  </main>
</template>

<script>
import Footer from "./Footer";
import Header from "./Header";

export default {
  name: "Layout",
  components: { Footer, Header },
};
</script>

<style scoped></style>
