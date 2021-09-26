import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#7750f8",
        accent: "#40d04f",
        secondary: "#1d2333",
        background: "#161b28",
      },
    },
  },
});
