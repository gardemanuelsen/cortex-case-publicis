<template>
  <div>
    <h2>Users:</h2>
    <table class="users-table">
      <thead>
        <tr>
          <th>
            <span>Name</span>
            <button @click="toggleSort('name')" class="sort-button">
              {{ sortColumn === "name" && sortDirection === 2 ? "▲" : "▼" }}
            </button>
          </th>
          <th>Email</th>
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
        <tr v-for="user in sortedUsers" :key="user.id" v-else>
          <td class="table-data">
            <img class="profile-pic" :src="`${user.profilePicture}`" />{{
              user.name
            }}
          </td>
          <td>{{ user.email }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { User, ApiClient } from "../api-client";
import { SpringSpinner } from "epic-spinners";
import { sortItems } from "../utils/sorting";

const users = ref<User[]>([]);
const isLoading = ref(true);

const sortColumn = ref("");
const sortDirection = ref(1);
const sortedUsers = computed(() => {
  return sortItems(users.value, sortColumn.value, sortDirection.value);
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
    users.value = await apiClient.requestUsers();
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
.users-table {
  border-collapse: collapse;
  width: 100%;
  background-color: #ffffff;
}

.users-table th,
.users-table td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: left;
}

.users-table th {
  background-color: #f2f2f2;
}
</style>
