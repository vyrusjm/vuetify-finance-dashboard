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
  <v-tabs-window v-model="activeTab">
    <template v-for="(tab, index) in tabs" :key="index">
      <v-tabs-window-item v-if="tab.showAlert" :value="tab.value">
        <alert-component
          :message="`No hay 'constituyentes' en el zip para el Instrumento: ${tab.label}`"
          type="info"
        />
      </v-tabs-window-item>
      <v-tabs-window-item v-if="!tab.showAlert" :value="tab.value">
        <instrument-list-component />
      </v-tabs-window-item>
    </template>
  </v-tabs-window>
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useInstrumentStore } from "@/store/instrumentStore";
const store = useInstrumentStore();
const activeTab = ref(null);
const tabs = [
  { label: "IPSA", value: "IPSA", showAlert: false },
  { label: "IGPA", value: "IGPA", showAlert: true },
  { label: "NASDAQ", value: "NASDAQ", showAlert: true },
  { label: "DOWN JONES", value: "DOWN JONES", showAlert: true },
  { label: "SP/BVL", value: "SP/BV", showAlert: true },
];

const onTabChange = (tabValue) => {
  store.changeTab(tabValue);
};

onMounted(() => {
  activeTab.value = store.activeTab;
});

watch(
  () => store.activeTab,
  (newTab) => {
    activeTab.value = newTab;
  }
);
</script>
