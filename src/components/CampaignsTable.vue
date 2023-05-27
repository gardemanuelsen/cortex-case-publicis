<template>
  <div>
    <h2>Campaigns:</h2>

    <table class="campaigns-table" e>
      <thead>
        <tr>
          <th>
            <span>Name</span>
            <button @click="toggleSort('name')" class="sort-button">
              {{ sortColumn === "name" && sortDirection === 2 ? "▲" : "▼" }}
            </button>
          </th>
          <th>Type</th>
          <th>
            <span>Client</span>
            <button @click="toggleSort('client.name')" class="sort-button">
              {{
                sortColumn === "client.name" && sortDirection === 2 ? "▲" : "▼"
              }}
            </button>
          </th>
          <th>
            <span>Campaign Manager</span>
            <button
              @click="toggleSort('campaignManager.name')"
              class="sort-button"
            >
              {{
                sortColumn === "campaignManager.name" && sortDirection === 2
                  ? "▲"
                  : "▼"
              }}
            </button>
          </th>
          <th>
            <span>Start Date</span>
            <button @click="toggleSort('startDate')" class="sort-button">
              {{
                sortColumn === "startDate" && sortDirection === 2 ? "▲" : "▼"
              }}
            </button>
          </th>
          <th>
            <span>End Date</span>
            <button @click="toggleSort('endDate')" class="sort-button">
              {{ sortColumn === "endDate" && sortDirection === 2 ? "▲" : "▼" }}
            </button>
          </th>
          <th>
            <span>Budget</span>
            <button @click="toggleSort('budget')" class="sort-button">
              {{ sortColumn === "budget" && sortDirection === 2 ? "▲" : "▼" }}
            </button>
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
        <tr v-for="campaign in sortedCampaigns" :key="campaign.id" v-else>
          <td>{{ campaign.name }}</td>
          <td>{{ campaign.type }}</td>
          <td>
            <div class="table-data">
              <img class="client-logo" :src="`${campaign.client.clientLogo}`" />
              {{ campaign.client.name }}
            </div>
          </td>

          <td>
            <div class="table-data">
              <img
                class="profile-pic"
                :src="`${campaign.campaignManager.profilePicture}`"
              />
              <input v-model="campaign.campaignManager.name" />
            </div>
          </td>

          <td>{{ campaign.startDate }}</td>
          <td>{{ campaign.endDate }}</td>
          <td>{{ campaign.budget }}</td>
          <td>
            <button @click="saveCampaign(campaign)">Save</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Campaign, ApiClient } from "../api-client";
import { SpringSpinner } from "epic-spinners";
import { sortItems } from "@/utils/sorting";

const campaigns = ref<Campaign[]>([]);
const isLoading = ref(true);

const sortColumn = ref("");
const sortDirection = ref(1);
const sortedCampaigns = computed(() => {
  return sortItems(campaigns.value, sortColumn.value, sortDirection.value);
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
    campaigns.value = await apiClient.requestCampaigns();
    sortColumn.value = "name";
    sortDirection.value = 1;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
});

const saveCampaign = (campaign) => {
  // Handle saving the campaign data
  console.log("Saving campaign:", campaign);
};
</script>

<style scoped>
.campaigns-table {
  border-collapse: collapse;
  width: 100%;
  background-color: #ffffff;
}

.campaigns-table th,
.campaigns-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.campaigns-table th {
  background-color: #f2f2f2;
}
</style>
