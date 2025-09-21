<script setup lang="ts">
import { useAuthStore } from './store/auth.store';
const authStore = useAuthStore();
authStore.loadFromStorage();
</script>

<template>
  <router-view />
</template>
