<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  type?: "info" | "success" | "warning" | "error";
  message: string;
}>();
</script>
<template>
  <v-alert :type="type" variant="tonal" class="mx-4">
    {{ message }}
  </v-alert>
</template>
