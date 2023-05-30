<template>
  <div class="sidebar">
    <div class="logo-container">
      <img class="cortex-logo" src="../assets/img/cortex-logo.png" />
    </div>
    <!-- <div class="user-info" v-if="loggedInUser">
      <div>
        <img class="logged-in-user-pic" :src="loggedInUser.profilePicture" />
      </div>
      
      <div class="logged-in-user-text">
        <h3>{{ loggedInUser.name }}</h3>
        <p>{{ loggedInUser.email }}</p>
        <button class="logout-button" @click="logout">Logout</button>
      </div>
    </div> -->
    <div>
      <ul>
        <li
          v-for="item in menuItems"
          :key="item.id"
          :class="{ selected: item.id === selectedMenuItem?.id }"
          @click="selectMenuItem(item)"
        >
          <div class="icon">
            <UserIcon v-if="item.icon === 'user'" />
            <CampaignIcon v-else-if="item.icon === 'campaign'" />
            <ClientIcon v-else-if="item.icon === 'client'" />
          </div>
          {{ item.title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { User } from "@/api-client";
import { useRouter } from "vue-router";
import UserIcon from "../assets/icons/UserIcon.vue";
import CampaignIcon from "../assets/icons/CampaignIcon.vue";
import ClientIcon from "../assets/icons/ClientIcon.vue";

interface MenuItem {
  id: number;
  title: string;
  route: string;
  icon: string;
}
const loggedInUser = ref<User | null>(null); // Add this line

const router = useRouter();

const menuItems: MenuItem[] = [
  { id: 1, title: "Campaigns", route: "/campaigns", icon: "campaign" },
  { id: 2, title: "Clients", route: "/client", icon: "client" },
  { id: 3, title: "Users", route: "/user", icon: "user" },
];

const selectedMenuItem = ref<MenuItem | null>(null);

const selectMenuItem = (item: MenuItem): void => {
  selectedMenuItem.value = item;
  router.push(item.route);
};

const logout = (): void => {
  localStorage.removeItem("loggedInUser");
  loggedInUser.value = null;
  router.push("/");
};

onMounted(() => {
  selectedMenuItem.value =
    menuItems.find((item) => item.title === "Campaigns") || null;

  // Fetch user info from localStorage
  const userJson = localStorage.getItem("loggedInUser");

  if (userJson) {
    loggedInUser.value = JSON.parse(userJson);
  }
});
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100%;
  background-color: #f5f5f5;
  padding-left: 1rem;
  padding-right: 1rem;
  border-right: 1px solid #c6c6c6;
}

.line {
  width: 15px;
  height: 100%;
  background-color: #b7a99a;
}

.cortex-logo {
  width: 200px;
  height: auto;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.logo-container {
  display: flex;
  justify-content: center;
  border-bottom: 2px dashed #c6c6c6;
}

ul {
  list-style-type: none;

  padding: 0;
}

li {
  display: flex;
  align-items: center;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  margin-top: 2rem;
}

li:hover {
  background-color: #ebe8e4;
}

.selected {
  border-right: 4px solid #cc943c;
}

.icon {
  margin-right: 10px;
}

.user-info {
  display: flex;
  flex-direction: column;
  padding-left: 1rem;
  font-size: medium;
  overflow: hidden;
}

.logged-in-user-pic {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-top: 1rem;
}

.logged-in-user-text {
  font-size: small;
}
</style>
