<template>
  <div class="sidebar">
    <ul>
      <li
        v-for="item in menuItems"
        :key="item.id"
        :class="{ selected: item.id === selectedMenuItem?.id }"
        @click="selectMenuItem(item)"
      >
        {{ item.icon }}
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

interface MenuItem {
  id: number;
  title: string;
  route: string;
  icon: string;
}

const router = useRouter();

const menuItems: MenuItem[] = [
  { id: 1, title: "Campaign", route: "/", icon: "📽️" },
  { id: 2, title: "Client", route: "/client", icon: "💸" },
  { id: 3, title: "User", route: "/user", icon: "🧙🏻‍♂️" },
];

const selectedMenuItem = ref<MenuItem | null>(null);

const selectMenuItem = (item: MenuItem): void => {
  selectedMenuItem.value = item;
  router.push(item.route);
};

onMounted(() => {
  selectedMenuItem.value =
    menuItems.find((item) => item.title === "Campaign") || null;
});
</script>

<style scoped>
.sidebar {
  width: 200px;
  background-color: #edecec;
  padding: 20px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px;
}

li:hover {
  background-color: #ebe8e4;
}

.selected {
  border-right: 4px solid #d0ee25;
}
</style>
