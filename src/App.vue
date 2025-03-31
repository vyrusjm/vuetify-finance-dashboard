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
        <tab-component />
        <search-bar-component class="mt-2" />
        <header-component />
        <v-row>
          <v-col cols="12" md="8">
            <chart-component />
            <v-spacer class="my-3"></v-spacer>
            <summary-component />
          </v-col>
          <v-col cols="12" md="4">
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
