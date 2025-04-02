<script setup lang="ts">
import { computed } from "vue";
import { useInstrumentStore } from "@/store/instrumentStore";
import { formatPrice, formatPercentage } from "@/utils/index";
const store = useInstrumentStore();
const selectedInstrument = computed(() => store.selectedInstrument);
const isLoading = computed(() => store.isLoading);
</script>
<template>
  <div v-if="isLoading">
    <v-skeleton-loader type="list-item@7"></v-skeleton-loader>
  </div>
  <div v-else>
    <v-row class="d-flex align-center py-5 px-1">
      <v-col cols="6">
        <p>Cotización</p>
      </v-col>
      <v-col class="d-flex justify-end" cols="6">
        <p>{{ selectedInstrument?.price?.datetimeLastPrice }}</p>
      </v-col>
    </v-row>
    <v-divider class="mb-3" :thickness="4"></v-divider>
    <v-row class="d-flex align-center px-1">
      <v-col class="py-0" cols="6">
        <p>MERCADO</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p>{{ selectedInstrument?.info.marketName }}</p>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center px-1">
      <v-col class="py-0" cols="6">
        <p>APERTURA</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p>{{ formatPrice(selectedInstrument?.price?.openPrice) }}</p>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center px-1">
      <v-col class="py-0" cols="6">
        <p>CIERRE ANTERIOR</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p>{{ formatPrice(selectedInstrument?.price?.closePrice) }}</p>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center px-1">
      <v-col class="py-0" cols="6">
        <p>MÁXIMO DIARIO</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p>{{ formatPrice(selectedInstrument?.price?.maxDay) }}</p>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center px-1">
      <v-col class="py-0" cols="6">
        <p>MÍNIMO DIARIO</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p>{{ formatPrice(selectedInstrument?.price?.minDay) }}</p>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center px-1">
      <v-col class="py-0" cols="6">
        <p>MÁXIMO 52</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p>{{ formatPrice(selectedInstrument?.price?.max52W) }}</p>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center px-1">
      <v-col class="py-0" cols="6">
        <p>SEMANAS</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p></p>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center px-1">
      <v-col class="py-0" cols="6">
        <p>MÍNIMO 52 SEMANAS</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p>{{ formatPrice(selectedInstrument?.price?.min52W) }}</p>
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
    <v-row class="d-flex align-center px-1 pb-1">
      <v-col class="py-0" cols="6">
        <p>1 MES</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p
          :class="{
            'text-end': true,
            'text-white': selectedInstrument?.price.pct30D === 0,
            'text-green': selectedInstrument?.price.pct30D > 0,
            'text-red': selectedInstrument?.price.pct30D < 0,
          }"
        >
          {{ formatPercentage(selectedInstrument?.price?.pct30D ?? 0) }}
        </p>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center px-1 pb-1">
      <v-col class="py-0" cols="6">
        <p>1 AÑO</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p
          :class="{
            'text-end': true,
            'text-white': selectedInstrument?.price.pctRelW52 === 0,
            'text-green': selectedInstrument?.price.pctRelW52 > 0,
            'text-red': selectedInstrument?.price.pctRelW52 < 0,
          }"
        >
          {{ formatPercentage(selectedInstrument?.price?.pctRelW52 ?? 0) }}
        </p>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center px-1 pb-1">
      <v-col class="py-0" cols="6">
        <p>AÑO A LA FECHA</p>
      </v-col>
      <v-col class="d-flex justify-end py-0" cols="6">
        <p
          :class="{
            'text-end': true,
            'text-white': selectedInstrument?.price.pctRelCY === 0,
            'text-green': selectedInstrument?.price.pctRelCY > 0,
            'text-red': selectedInstrument?.price.pctRelCY < 0,
          }"
        >
          {{ formatPercentage(selectedInstrument?.price?.pctRelCY ?? 0) }}
        </p>
      </v-col>
    </v-row>
  </div>
</template>
