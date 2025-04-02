<script setup lang="ts"></script>

<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <search-bar-component class="mt-2" />
        <v-row class="flex justify-center justify-space-between">
          <v-col cols="12" md="9">
            <header-component />
            <v-col cols="12" lg="6">
              <chart-component />
            </v-col>
          </v-col>
          <v-col cols="12" md="3" class="mt-15">
            <summary-component />
          </v-col>
          <v-col cols="12">
            <tab-component />
            <v-divider :thickness="4"></v-divider>
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
