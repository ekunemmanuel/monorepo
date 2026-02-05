import { createApp } from "vue";
import "@monorepo/ui/global.css";
import { convexVue } from "@monorepo/ui/convex";
import App from "./App.vue";

const app = createApp(App);

app.use(convexVue, {
  url: import.meta.env.VITE_CONVEX_URL,
});

app.mount("#app");
