<template>
  <div>
    <h2>Users:</h2>
    <table class="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
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
import { ref, onMounted } from "vue";
import { User, ApiClient } from "../api-client";

const users = ref<User[]>([]);

onMounted(async () => {
  const apiClient = new ApiClient();

  try {
    users.value = await apiClient.requestUsers();
  } catch (error) {
    console.error("Error fetching data:", error);
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
