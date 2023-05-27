<template>
  <div>
    <h2>Clients:</h2>

    <table class="clients-table">
      <thead>
        <tr>
          <th>
            <div class="header-container">
              <span>Name</span>
              <button @click="toggleSort('name')" class="sort-button">
                {{ sortColumn === "name" && sortDirection === 2 ? "▲" : "▼" }}
              </button>
            </div>
          </th>
          <th>
            <div class="header-container">
              <span>Default Campaign Manager</span>
              <button
                @click="toggleSort('defaultCampaignManager')"
                class="sort-button"
              >
                {{
                  sortColumn === "defaultCampaignManager" && sortDirection === 2
                    ? "▲"
                    : "▼"
                }}
              </button>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="isLoading">
          <td colspan="7">
            <div class="loader">
              <spring-spinner
                :animation-duration="2000"
                :size="100"
                color="#000000"
              />
            </div>
          </td>
        </tr>
        <tr v-for="client in sortedClients" :key="client.id" v-else>
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
import { ref, onMounted, computed } from "vue";
import { Client, ApiClient } from "../api-client";
import { SpringSpinner } from "epic-spinners";
import { sortItems } from "../utils/sorting";

const clients = ref<Client[]>([]);
const isLoading = ref(true);

const sortColumn = ref("");
const sortDirection = ref(1);
const sortedClients = computed(() => {
  return sortItems(clients.value, sortColumn.value, sortDirection.value);
});

const toggleSort = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 1 ? 2 : 1;
  } else {
    sortColumn.value = column;
    sortDirection.value = 1;
  }
};

onMounted(async () => {
  const apiClient = new ApiClient();

  try {
    clients.value = await apiClient.requestClients();
    sortColumn.value = "name";
    sortDirection.value = 1;
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
