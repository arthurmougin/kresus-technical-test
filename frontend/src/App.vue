<script setup lang="ts">
//restoring session if possible
import { useAuthStore } from './store/auth.store';
const authStore = useAuthStore();
authStore.loadFromStorage();
</script>

<template>
  <router-view />
</template>
