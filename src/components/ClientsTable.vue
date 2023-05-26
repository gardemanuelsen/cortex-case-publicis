<template>
  <div>
    <h2>Clients:</h2>

    <table class="clients-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Default Campaign Manager</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="isLoading">
          <td colspan="7">
            <div class="loader">
              <spring-spinner
                :animation-duration="3000"
                :size="100"
                color="#000000"
              />
            </div>
          </td>
        </tr>
        <tr v-for="client in clients" :key="client.id" v-else>
          <td>
            <div class="table-data">
              <img class="client-logo" :src="`${client.clientLogo}`" />

              <span>{{ client.name }}</span>
            </div>
          </td>

          <td>
            <div class="table-data">
              <img
                class="profile-pic"
                :src="`${client.defaultCampaignManager.profilePicture}`"
              />{{ client.defaultCampaignManager.name }}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Client, ApiClient } from "../api-client";
import { SpringSpinner } from "epic-spinners";

const clients = ref<Client[]>([]);
const isLoading = ref(true);

onMounted(async () => {
  const apiClient = new ApiClient();

  try {
    clients.value = await apiClient.requestClients();
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<style scoped>
.clients-table {
  border-collapse: collapse;
  width: 100%;
  background-color: #ffffff;
}

.clients-table th,
.clients-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.clients-table th {
  background-color: #f2f2f2;
}
</style>
