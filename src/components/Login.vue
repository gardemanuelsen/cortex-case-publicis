<template>
  <div class="page">
    <div class="login-form">
      <div class="box">
        <div class="header">
          <h1 class="heading">{{ headingText }}</h1>
        </div>
        <div class="switch-view-btns">
          <button
            :class="{ active: activeView === 'login' }"
            @click="activeView = 'login'"
          >
            Login
          </button>
          <button
            :class="{ active: activeView === 'register' }"
            @click="activeView = 'register'"
          >
            Register
          </button>
        </div>
        <form v-if="activeView === 'login'" @submit="handleSubmit">
          <div class="input-and-btn">
            <div>
              <h3>E-mail:</h3>
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <h3>Password:</h3>
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                required
              />
            </div>
            <button class="login-btn" type="submit">Login</button>
          </div>
        </form>
        <form class="register-form" v-else>
          <div class="input-and-btn">
            <div>
              <h3>Name:</h3>
              <input
                type="email"
                v-model="email"
                placeholder="First name, Last name"
                required
              />
            </div>

            <div>
              <h3>E-mail:</h3>
              <input
                type="email"
                v-model="email"
                placeholder="Email"
                required
              />
            </div>
            <div>
              <h3>Password:</h3>
              <input
                type="password"
                v-model="password"
                placeholder="Password"
                required
              />
            </div>
            <button class="login-btn">Join the community</button>
          </div>
        </form>
      </div>
    </div>

    <div class="animation">
      <h1 class="welcome-text">
        Welcome to
        <span class="cortex">Cortex</span>, a platform for Publicis employees
      </h1>
      <iframe
        class="iframe"
        src="https://embed.lottiefiles.com/animation/104656"
      ></iframe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

import { User, ApiClient } from "../api-client";
import { computed } from "vue";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const apiClient = new ApiClient();
const router = useRouter();
const notRegistered = ref(false);
const activeView = ref("login");

const headingText = computed(() =>
  activeView.value === "login" ? "Hi there!🖐️" : "Register"
);
const switchView = (view: string): void => {
  console.log(view);
  if (activeView.value !== view) {
    activeView.value = view;
  }
};
async function handleSubmit(event: Event) {
  event.preventDefault();
  try {
    const user: User | null = await apiClient.login(
      email.value,
      password.value
    );

    if (user) {
      router.push("/campaigns");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    console.error(error);
  }
}
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.heading {
  font-size: 2.5rem;
  user-select: none;
}
.text {
  font-size: 1.2rem;

  margin-bottom: 2rem;
}
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.login-form {
  user-select: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 55%;
  height: 100%;
  background-color: #f5f5f5;
}

.box {
  border: 2px inset #000000;
  box-shadow: 10px 15px 10px #000000;
  height: 700px;
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f3c780;
  opacity: 0.9;
}

.welcome-text {
  user-select: none;
  position: absolute;
  top: 5rem;
  left: 4rem;
  width: 75%;
  height: 65%;
  font-weight: bolder;
  letter-spacing: 5px;
  font-size: 3em;
  z-index: 1;
}

.cortex {
  color: #f3c780;
  font-size: 1.2em;
  font-weight: bold;
}

.input-and-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
}

.register-form {
  display: flex;
  gap: none;
}
input {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #ccc;
  padding: 0.5rem;
}

button {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #ccc;
  padding: 0.5rem;

  cursor: pointer;
}

button.active {
  background-color: #d0943c;
  border: 2px solid #000000;
  color: #ffffff;
}

.login-btn {
  width: 300px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid #515151;
  padding: 0.5rem;
  color: #ffffff;
  font-weight: bold;
  font-size: 1rem;
  background-color: #d0943c;
  cursor: pointer;
}
.animation {
  position: relative;
  width: 45%;
  height: 100%;
  background-image: url("../assets/images/login-animation.gif");
  display: flex;
  justify-content: center;
  align-items: center;
}

.iframe {
  padding-top: 5rem;
  width: 85%;
  margin-top: 10rem;
  height: 70%;
  border: none;
}

.switch-view-btns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
  gap: 1rem;
}

.name {
  display: flex;
  flex-direction: row;

  width: 50%;
  gap: 1rem;
}
</style>
