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
        <tr v-for="client in clients" :key="client.id">
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

const clients = ref<Client[]>([]);

onMounted(async () => {
  const apiClient = new ApiClient();

  try {
    clients.value = await apiClient.requestClients();
  } catch (error) {
    console.error("Error fetching data:", error);
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
