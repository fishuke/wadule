<script>
export default {
  props: {
    theme: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "",
    },
  },
};
</script>

<template>
  <p :class="[theme, size]" class="button"><slot /></p>
</template>

<style lang="scss" scoped>
.button {
  @apply h-8 text-white text-sm font-bold text-center cursor-pointer flex items-center justify-center;
  border-radius: 10px;
  background-color: #293249;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 3px 5px 10px 0 rgba(0, 0, 0, 0.2);
}

.button.medium {
  height: 54px;
  line-height: 54px;
}

.button:hover {
  background-color: #323e5b;
}

.button.primary {
  background-color: #40d04f;
  box-shadow: 4px 7px 12px 0 rgba(64, 208, 79, 0.2);
}

.button.primary:hover {
  background-color: #4ae95b;
}

.button.secondary {
  background-color: #7750f8;
  box-shadow: 4px 7px 12px 0 rgba(119, 80, 248, 0.2);
}

.button.secondary:hover {
  background-color: #9668ff;
}
</style>
