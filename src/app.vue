<template>
  <div class="app">
    <Menu />

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from "./components/Menu.vue";
import { ref, onMounted } from "vue";
import Login from "./components/Login.vue";
import { Campaign, Client, User, ApiClient } from "./api-client";

import { useRouter } from "vue-router";

const campaigns = ref<Campaign[]>([]);
const clients = ref<Client[]>([]);
const users = ref<User[]>([]);

const router = useRouter();

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
  font-family: sans-serif;
}

.app {
  display: flex;
  height: 100vh;
  background-color: #ffffff;
}

.content {
  flex: 1;
  padding: 2rem;
  border-radius: 15px;
  margin: 4rem;
}

.loader {
  display: flex;
  justify-content: center;

  align-items: center;
}

h1 {
  margin-bottom: 3rem;
}

/** Global styling on tables */

table {
  border-collapse: separate;
  border: solid #ccc 1px;

  width: 100%;
}

td,
th {
  border-left: solid #ccc 1px;
  border-top: solid #ccc 1px;
  padding: 8px;
}

th {
  border-top: none;
}

td:first-child,
th:first-child {
  border-left: none;
}

.scrollable-table {
  height: 600px;

  overflow-y: scroll;
}

.scrollable-table thead {
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
}

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

.sort-button {
  border: none;
  background-color: transparent;
  font-size: 1rem;
  cursor: pointer;
}

.header-container {
  padding-left: 0.5rem;
  display: flex;
  gap: 0.5rem;
}
</style>
