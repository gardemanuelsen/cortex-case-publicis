<template>
  <div class="app">
    <Menu />
    <div class="content"><router-view /></div>
  </div>
</template>

<script setup lang="ts">
import Menu from "./components/Menu.vue";
import { ref, onMounted } from "vue";

import { Campaign, Client, User, ApiClient } from "./api-client";

const campaigns = ref<Campaign[]>([]);
const clients = ref<Client[]>([]);
const users = ref<User[]>([]);

onMounted(async () => {
  const apiClient = new ApiClient();

  try {
    campaigns.value = await apiClient.requestCampaigns();
    clients.value = await apiClient.requestClients();
    users.value = await apiClient.requestUsers();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});
</script>

<style>
body {
  margin: 0;
}
.app {
  display: flex;
  height: 100vh;
  background-color: #ffffff;
}

.content {
  flex: 1;
  padding: 2rem;
}

/** Global styling on tables */

.table-data {
  display: flex;
  align-items: center;
}

.profile-pic {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.client-logo {
  width: 40px;
  height: 40px;
  padding: 3px;

  margin-right: 10px;
}
</style>
