<template>
  <v-tabs
    color="white"
    slider-color="#0458a0"
    v-model="activeTab"
    align-tabs="start"
    @update:model-value="onTabChange"
  >
    <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
      {{ tab.label }}
    </v-tab>
  </v-tabs>
</template>

<script setup>
import { ref } from "vue";
const tabs = [
  { label: "IPSA", value: "IPSA" },
  { label: "IGPA", value: "IGPA" },
  { label: "NASDAQ", value: "NASDAQ" },
  { label: "DOWN JONES", value: "DOWN JONES" },
  { label: "SP/BVL", value: "SP/BV" },
];
const activeTab = ref(tabs[0].value);
</script>
