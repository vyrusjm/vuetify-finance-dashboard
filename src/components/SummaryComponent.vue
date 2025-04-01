<script setup lang="ts">
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
      height="60"
      @update:model-value="onTabChange(activeTab)"
    >
      <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
        {{ tab.label }}
      </v-tab>
    </v-tabs>
    <v-tabs-window v-model="activeTab">
      <v-tabs-window-item value="resume"> resumen </v-tabs-window-item>
      <v-tabs-window-item value="details" class="text-subtitle-2 pb-1">
        <v-row class="d-flex align-center py-7 px-1">
          <v-col cols="6">
            <p>Cotización</p>
          </v-col>
          <v-col cols="6">
            <p>06-11-2024 12:52:07 pm</p>
          </v-col>
        </v-row>
        <v-divider class="mb-4" :thickness="4"></v-divider>
        <v-row v-for="(detail, index) in detailsContent" :key="index" class="d-flex align-center px-1">
          <v-col class="py-1" cols="6">
            <p>{{ detail.title }}</p>
          </v-col>
          <v-col class="d-flex justify-end py-1" cols="6">
            <p>{{ detail.value }}</p>
          </v-col>
        </v-row>
        <v-row class="d-flex align-center py-1 px-1">
          <v-col cols="6">
            <p>Variación**</p>
          </v-col>
          <v-col class="d-flex justify-end" cols="6">
            <p>%</p>
          </v-col>
        </v-row>
        <v-divider class="my-4" :thickness="4"></v-divider>
        <v-row v-for="(time, indexInTime) in detailsInTime" :key="indexInTime" class="d-flex align-center px-1">
          <v-col class="py-1" cols="6">
            <p>{{ time.title }}</p>
          </v-col>
          <v-col class="d-flex justify-end py-1 " cols="6">
            <p :class="time.value > 0 ? 'text-green':'text-red'">{{ `${time.value >= 0 ? '+':'-'} ${time.value}%`}} </p>
          </v-col>
        </v-row>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>
