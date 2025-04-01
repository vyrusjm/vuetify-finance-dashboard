<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps({
  details: {
    type: Object,
    required: true,
  },
  detailsInTime: {
    type: Object,
    required: true,
  },
});
</script>
<template>
  <div>
    <v-row class="d-flex align-center py-5 px-1">
      <v-col cols="6">
        <p>Cotización</p>
      </v-col>
      <v-col class="d-flex justify-end" cols="6">
        <p>06-11-2024 12:52:07 pm</p>
      </v-col>
    </v-row>
    <v-divider class="mb-3" :thickness="4"></v-divider>
    <v-row
      v-for="(detail, index) in details"
      :key="index"
      class="d-flex align-center px-1"
    >
      <v-col class="py-0" cols="6">
        <p>{{ detail.title }}</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
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
    <v-divider class="my-2" :thickness="4"></v-divider>
    <v-row
      v-for="(time, indexInTime) in detailsInTime"
      :key="indexInTime"
      class="d-flex align-center px-1 pb-1"
    >
      <v-col class="py-0" cols="6">
        <p>{{ time.title }}</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p :class="time.value > 0 ? 'text-green' : 'text-red'">
          {{ `${time.value >= 0 ? "+" : "-"} ${time.value}%` }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>
