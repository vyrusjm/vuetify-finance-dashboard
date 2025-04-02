<script setup lang="ts">
import TabDetails from "@/components/summary/DetailsTabComponent.vue";
import AlertComponent from "@/components/common/AlertComponent.vue";
import { ref } from "vue";
const tabs = [
  { label: "Resumen", value: "resume" },
  { label: "Detalles", value: "details" },
];

const activeTab = ref(tabs[1].value);
const onTabChange = (value: string) => {
  activeTab.value = value;
  console.log("Active tab changed to:", value);
};
</script>

<template>
  <div>
    <v-tabs
      color="white"
      slider-color="#0458a0"
      v-model="activeTab"
      fixed-tabs
      height="40"
      @update:model-value="onTabChange(activeTab)"
    >
      <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
        {{ tab.label }}
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="activeTab">
      <v-tabs-window-item value="resume">
        <alert-component message="Falta información en la imagen" type="info" />
      </v-tabs-window-item>
      <v-tabs-window-item value="details" class="text-caption pb-1">
        <tab-details />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
