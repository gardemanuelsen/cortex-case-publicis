<template>
  <div>
    <h2>Campaigns:</h2>
    <table class="campaigns-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Type</th>
          <th>Client</th>
          <th>Campaign Manager</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Budget</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="campaign in campaigns" :key="campaign.id">
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
import { ref, onMounted } from "vue";
import { Campaign, ApiClient } from "../api-client";

const campaigns = ref<Campaign[]>([]);

onMounted(async () => {
  const apiClient = new ApiClient();

  try {
    campaigns.value = await apiClient.requestCampaigns();
  } catch (error) {
    console.error("Error fetching data:", error);
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
