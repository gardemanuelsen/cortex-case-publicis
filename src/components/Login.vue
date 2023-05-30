<template>
  <div class="app">
    <div v-if="!loggedIn">
      <form @submit="handleSubmit">
        <input type="email" v-model="email" placeholder="Email" required />
        <input
          type="password"
          v-model="password"
          placeholder="Password"
          required
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

import { User, ApiClient } from "../api-client";

import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const apiClient = new ApiClient();
const router = useRouter();

let props = defineProps({
  loggedIn: Boolean,
});

const emit = defineEmits(["update:loggedIn"]);

const updateLoggedIn = (value: boolean) => {
  emit("update:loggedIn", value);
};
async function handleSubmit(event: Event) {
  event.preventDefault();
  try {
    const user: User | null = await apiClient.login(
      email.value,
      password.value
    );

    if (user) {
      console.log(props.loggedIn);
      updateLoggedIn(true);
      console.log(props.loggedIn);
      router.push("/campaigns");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    // Handle login error, e.g., show error message to the user
    console.error(error);
  }
}
</script>
