<script setup lang="ts">
import { computed } from "vue";
import { useInstrumentStore } from "@/store/instrumentStore";
const store = useInstrumentStore();
const headerInfo = computed(() => store.headerInfo);
const isLoading = computed(() => store.isLoading);
const selectedInstrument = computed(() => store.selectedInstrument);
import { formatPrice, formatPercentage } from "@/utils/index";
</script>
<template>
  <v-row>
    <v-col cols="12">
      <template v-if="isLoading">
        <v-skeleton-loader type="heading"></v-skeleton-loader>
      </template>
      <template v-else>
        <span class="text-h5 text-uppercase"
          >{{ headerInfo.name }}, {{ headerInfo.country }}</span
        >
      </template>
    </v-col>
    <v-col cols="12">
      <span class="text-subtitle-1 text-grey-lighten-1">Indice</span>
    </v-col>
    <v-col
      cols="12"
      class="d-flex justify-start ga-10 border-t-lg border-b-lg w-100"
    >
      <div class="d-flex align-center">
        <span class="text-subtitle-2 text-grey-lighten-1">Valor Actual</span>
        <v-icon
          color="white"
          :icon="
            selectedInstrument?.price?.tend == 'down'
              ? 'mdi-arrow-down'
              : 'mdi-arrow-up'
          "
          size="x-small"
          class="ml-2"
        ></v-icon>
        <span class="text-subtitle-1 text-white">{{
          isLoading ? "0.00" : formatPrice(selectedInstrument?.price?.lastPrice ?? 0)
        }}</span>
      </div>
      <div class="d-flex align-center ga-3">
        <span class="text-subtitle-2 text-grey-lighten-1">Var % Actual</span>
        <span
          class="text-subtitle-1"
          :class="{
            'text-white': selectedInstrument?.price?.performanceRelative === 0,
            'text-green': selectedInstrument?.price?.performanceRelative > 0,
            'text-red': selectedInstrument?.price?.performanceRelative < 0,
          }"
          >{{
            isLoading
              ? "0.00%"
              : formatPercentage(
                  selectedInstrument?.price?.performanceRelative ?? 0
                )
          }}</span
        >
      </div>
      <div class="d-flex align-center ga-3">
        <span class="text-subtitle-2 text-grey-lighten-1"
          >Var Puntos Actual</span
        >
        <span
          class="text-subtitle-1"
          :class="{
            'text-white': selectedInstrument?.price?.performanceAbsolute === 0,
            'text-green': selectedInstrument?.price?.performanceAbsolute > 0,
            'text-red': selectedInstrument?.price?.performanceAbsolute < 0,
          }"
          >{{
            formatPrice(selectedInstrument?.price?.performanceAbsolute ??  0)
          }}</span
        >
      </div>
    </v-col>
  </v-row>
</template>
