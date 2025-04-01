<script setup lang="ts">
import TabDetails from "@/components/summary/DetailsTabComponent.vue";
import AlertComponent from "@/components/common/AlertComponent.vue";
import { ref } from "vue";
const tabs = [
  { label: "Resumen", value: "resume" },
  { label: "Detalles", value: "details" },
];

const detailsContent = [
  {
    title: "MERCADO",
    value: "Bolsa de Santiago",
  },
  {
    title: "APERTURA",
    value: "6.525,38",
  },
  {
    title: "CIERRE ANTERIOR",
    value: "6.525,38",
  },
  {
    title: "MÁXIMO DIARIO",
    value: "6.525,38",
  },
  {
    title: "MÍNIMO DIARIO",
    value: "6.469,32",
  },
  {
    title: "MÁXIMO 52",
    value: "",
  },
  {
    title: "SEMANAS",
    value: "6.838,39",
  },
  {
    title: "MÍNIMO 52 SEMANAS",
    value: "5.569.23",
  },      
];

const  detailsInTime = [
    {
        title: "1 MES",
        value: 0.03,
    },
    {
        title: "1 AÑO",
        value: 16.10,
    },
    {
        title: "AÑO A LA FECHA",
        value: 5.29,
    },
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
        <alert-component
            message="Falta información en la imagen"
            type="info" 
        />
      </v-tabs-window-item>
      <v-tabs-window-item value="details" class="text-caption pb-1">
        <tab-details 
            :details="detailsContent"
            :detailsInTime="detailsInTime"
        />
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
