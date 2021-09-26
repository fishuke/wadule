import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import { colors } from "vuetify/lib";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: colors.blue.darken4,
        background: "#161b28",
        info: colors.teal.lighten1,
      },
    },
  },
});
