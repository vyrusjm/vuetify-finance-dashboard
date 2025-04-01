<script setup lang="ts">
import TabComponent from "@/components/TabComponent.vue";
import SearchBarComponent from "@/components/SearchBarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ChartComponent from "@/components/ChartComponent.vue";
import SummaryComponent from "@/components/SummaryComponent.vue";
import InstrumentListComponent from "@/components/InstrumentListComponent.vue";
</script>

<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <search-bar-component class="mt-2" />
        <v-row class="flex justify-center justify-space-between">
          <v-col cols="12" md="9">
            <header-component />
            <chart-component/>  
          </v-col>
          <v-col cols="12" md="3" class="mt-15">
            <summary-component />
          </v-col>   
          <v-col cols="12">
            <tab-component />
            <instrument-list-component />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<style>
.v-application {
  background-color: #f5f5f5;
}

.v-card {
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1) !important;
  border-radius: 8px !important;
}
</style>
