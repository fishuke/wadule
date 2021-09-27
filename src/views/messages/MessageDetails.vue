<script>
export default {
  name: "MessageDetails",
  data() {
    return {
      message: null,
      timeLeft: "",
    };
  },
  methods: {
    secondsToHms() {
      const timerCount = this.message.schedule - Date.now();
      const t = timerCount / 1000;
      const h = Math.floor(t / 3600);
      const m = Math.floor((t % 3600) / 60);
      const s = Math.floor((t % 3600) % 60);
      const d = Math.floor(h / 24);

      const dDisplay = d > 0 ? d + " : " : "";
      const hDisplay = h > 0 ? h + " : " : "";
      const mDisplay = m > 0 ? m + " : " : "";
      const sDisplay = s > 0 ? s : "0";
      return dDisplay + hDisplay + mDisplay + sDisplay;
    },
  },
  created() {
    const id = this.$route.params.id;
    this.message = this.$store.state.messages.find((msg) => msg.id === id);
    this.timeLeft = this.secondsToHms();
  },
  watch: {
    timeLeft: {
      handler(value) {
        if (value !== "0") {
          setTimeout(() => {
            this.timeLeft = this.secondsToHms();
          }, 1000);
        }
      },
      immediate: true,
    },
  },
};
</script>

<template>
  <div class="px-8">
    <h1 class="text-center text-3xl">{{ message.title }}</h1>
    <h1 class="text-center text-3xl font-extrabold">{{ timeLeft }}</h1>
  </div>
</template>

<style lang="scss" scoped></style>
