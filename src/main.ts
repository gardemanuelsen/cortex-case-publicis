import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import CampaignsTable from "./components/CampaignsTable.vue";
import ClientsTable from "./components/ClientsTable.vue";
import UsersTable from "./components/UsersTable.vue";

const routes = [
  // { path: "/", component: Login },
  { path: "/campaigns", component: CampaignsTable },
  { path: "/client", component: ClientsTable },
  { path: "/user", component: UsersTable },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const app = createApp(App);

app.use(router);

app.mount("#app");
