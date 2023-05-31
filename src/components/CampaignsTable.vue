<template>
  <div class="container">
    <h1>Campaigns</h1>
    <div>
      <div class="filtering-container">
        <div class="search-by-name-container">
          <div>
            <label for="name-input">Search by Name</label>
          </div>
          <div>
            <input
              type="text"
              id="name-input"
              v-model="searchNameQuery"
              @input="performSearch"
              class="search-input"
              placeholder="&#61442; Search"
            />
          </div>
        </div>
        <div class="search-by-campaign-manager-container">
          <div>
            <label for="manager-input">Campaign Manager</label>
          </div>
          <div>
            <input
              type="text"
              id="manager-input"
              v-model="searchManagerQuery"
              @input="performSearch"
              class="search-input"
              placeholder="&#61442; Search"
            />
          </div>
        </div>
        <div class="search-by-client-container">
          <div>
            <label for="search-input">Client</label>
          </div>
          <div>
            <input
              type="text"
              id="search-input"
              v-model="searchClientQuery"
              @input="performSearch"
              class="search-input"
              placeholder="&#61442; Search"
            />
          </div>
        </div>
        <div class="dropdown-by-type-container">
          <div>
            <label for="typeDropdown">Type</label>
          </div>
          <div>
            <select id="typeDropdown" v-model="typeDropdownValue">
              <option value="all">All</option>
              <option value="socialMedia">Social Media</option>
              <option value="searchEngine">Search Engine</option>
              <option value="tv">TV</option>
            </select>
          </div>
        </div>
        <div class="dropdown-by-status-container">
          <div>
            <label for="statusDropdown">Status</label>
          </div>
          <div>
            <select id="statusDropdown" v-model="statusDropdownValue">
              <option value="all">All</option>
              <option value="finished">Finished</option>
              <option value="inProgress">In Progress</option>
              <option value="3">3 Months</option>
              <option value="6">6 Months</option>
              <option value="12+">12+ Months</option>
            </select>
          </div>
        </div>
      </div>
      <div class="scrollable-campaigns-table">
        <table>
          <thead>
            <tr>
              <th>
                <div class="header-container">
                  <span>Name</span>
                  <button @click="toggleSort('name')" class="sort-button">
                    {{
                      sortColumn === "name" && sortDirection === 2 ? "▲" : "▼"
                    }}
                  </button>
                </div>
              </th>

              <th>
                <div class="header-container">
                  <span>Client</span>
                  <button
                    @click="toggleSort('client.name')"
                    class="sort-button"
                  >
                    {{
                      sortColumn === "client.name" && sortDirection === 2
                        ? "▲"
                        : "▼"
                    }}
                  </button>
                </div>
              </th>
              <th>
                <div class="header-container">
                  <span>Campaign Manager</span>
                  <button
                    @click="toggleSort('campaignManager.name')"
                    class="sort-button"
                  >
                    {{
                      sortColumn === "campaignManager.name" &&
                      sortDirection === 2
                        ? "▲"
                        : "▼"
                    }}
                  </button>
                </div>
              </th>
              <th>
                <div class="header-container">
                  <span>Start Date</span>
                  <button @click="toggleSort('startDate')" class="sort-button">
                    {{
                      sortColumn === "startDate" && sortDirection === 2
                        ? "▲"
                        : "▼"
                    }}
                  </button>
                </div>
              </th>
              <th>
                <div class="header-container">
                  <span>End Date</span>
                  <button @click="toggleSort('endDate')" class="sort-button">
                    {{
                      sortColumn === "endDate" && sortDirection === 2
                        ? "▲"
                        : "▼"
                    }}
                  </button>
                </div>
              </th>
              <th>
                <div class="header-container">
                  <span>Budget</span>
                  <button @click="toggleSort('budget')" class="sort-button">
                    {{
                      sortColumn === "budget" && sortDirection === 2 ? "▲" : "▼"
                    }}
                  </button>
                </div>
              </th>
              <th></th>
            </tr>
          </thead>

          <tbody class="table-body">
            <tr v-if="isLoading">
              <td colspan="7">
                <div class="loader">
                  <spring-spinner
                    :animation-duration="2000"
                    :size="100"
                    color="#cc943c"
                  />
                </div>
              </td>
            </tr>
            <tr v-for="campaign in sortedCampaigns" :key="campaign.id" v-else>
              <td>{{ campaign.name }}</td>

              <td>
                <div class="table-data">
                  <img
                    class="client-logo"
                    :src="`${campaign.client.clientLogo}`"
                  />
                  {{ campaign.client.name }}
                </div>
              </td>

              <td>
                <div class="table-data">
                  <img
                    class="profile-pic"
                    :src="`${campaign.campaignManager.profilePicture}`"
                  />
                  {{ campaign.campaignManager.name }}
                </div>
              </td>
              <td v-if="!campaign.isEditing">{{ campaign.startDate }}</td>
              <td v-else>
                <input
                  type="number"
                  v-model="campaign.newStartDate"
                  :placeholder="campaign.startDate"
                />
              </td>
              <td v-if="!campaign.isEditing">{{ campaign.endDate }}</td>
              <td v-else>
                <input
                  type="number"
                  v-model="campaign.newEndDate"
                  :placeholder="campaign.endDate"
                />
              </td>
              <td>{{ campaign.budget }}</td>
              <td>
                <button class="edit-button" @click="editCampaign(campaign)">
                  <EditIcon />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { Campaign, ApiClient } from "../api-client";
import { SpringSpinner } from "epic-spinners";
import { sortItems } from "@/utils/sorting";
import { filteredCampaigns } from "@/utils/filtering";

import EditIcon from "@/assets/icons/EditIcon.vue";

const campaigns = ref<Campaign[]>([]);
const isLoading = ref(true);

interface DropdownOption {
  label: string;
  value: string;
}

const typeDropdownValue = ref("all");
const isOpen = ref(false);

const options: DropdownOption[] = [
  { label: "All", value: "all" },
  { label: "Social Media", value: "socialMedia" },
  { label: "Search Engine", value: "searchEngine" },
  { label: "TV", value: "tv" },
];

let selectedOption =
  options.find((option) => option.value === typeDropdownValue.value) ||
  options[0];

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const selectOption = (option: DropdownOption) => {
  selectedOption = option;
  isOpen.value = false;
  typeDropdownValue.value = option.value;
};

//Filtering dropdown

const statusDropdownValue = ref("");

//Searching
const searchClientQuery = ref("");
const searchNameQuery = ref("");
const searchManagerQuery = ref("");

//Sorting
const sortColumn = ref("");
const sortDirection = ref(1);

//Computed values that gets changed when filtering or sorting
const sortedCampaigns = computed(() => {
  return sortItems(
    filteredCampaigns(
      campaigns.value,
      searchClientQuery.value,
      searchNameQuery.value,
      searchManagerQuery.value,
      statusDropdownValue.value,
      typeDropdownValue.value
    ),
    sortColumn.value,
    sortDirection.value
  );
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
    // Additional code for loading campaign data from localStorage
    campaigns.value.forEach((campaign) => {
      const storedData = localStorage.getItem(`campaign_${campaign.id}`);
      if (storedData) {
        const storedCampaign = JSON.parse(storedData);
        campaign.startDate = storedCampaign.startDate;
        campaign.endDate = storedCampaign.endDate;
      }

      statusDropdownValue.value = "all";
      typeDropdownValue.value = "all";
      campaign.isEditing = false;
      campaign.newStartDate = campaign.startDate;
      campaign.newEndDate = campaign.endDate;
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    isLoading.value = false;
  }
});

// Toggle edit mode for a campaign
const toggleEditMode = (campaign: Campaign): void => {
  campaign.isEditing = !campaign.isEditing;
};

// Save campaign changes
const editCampaign = (campaign: Campaign) => {
  toggleEditMode(campaign);
};

const performSearch = (event: Event, column: string) => {
  const value = (event.target as HTMLInputElement).value.toLowerCase();

  if (column === "name") {
    searchNameQuery.value = value;
  } else if (column === "campaignManager") {
    searchManagerQuery.value = value;
  } else if (column === "client") {
    searchClientQuery.value = value;
  }
};
</script>

<style scoped>
@import "//netdna.bootstrapcdn.com/font-awesome/3.0/css/font-awesome.css";

.search-input::-webkit-input-placeholder {
  font-family: FontAwesome;
}

input {
  padding: 0.5rem;
}

select {
  padding: 0.5rem;
}

.edit-button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.scrollable-campaigns-table {
  height: 450px;

  overflow-y: scroll;
}

.scrollable-campaigns-table thead {
  position: sticky;
  top: 0;
  background-color: #f5f5f5;
}

.filtering-container {
  display: flex;
  gap: 5rem;
  margin-bottom: 20px;
  border: 2px solid #ccc;
  border-radius: 15px 50px 30px 5px;
  padding: 2rem;
  font-weight: bold;
  background-color: #f5f5f5;
}

.search-by-name-container {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.search-by-campaign-manager-container {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.search-by-client-container {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.dropdown-by-status-container {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}
.dropdown-by-type-container {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.custom-dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-trigger {
  cursor: pointer;
}

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
}

.dropdown-menu ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.dropdown-menu li {
  padding: 5px;
  background-color: #f2f2f2;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #e0e0e0;
}
</style>
