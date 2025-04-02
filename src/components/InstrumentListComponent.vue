<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useInstrumentStore } from "@/store/instrumentStore";

const store = useInstrumentStore();
const constituents = computed(() => store.filteredConstituents);
const isLoading = computed(() => store.isLoadingInstrument);

onMounted(() => {
  store.loadConstituents();
});

watch(
  () => store.activeTab,
  () => {
    store.loadConstituents();
  }
);

const headers = [
  { title: "Nombre", key: "shortName", align: "start" },
  { title: "Último*", key: "lastPrice" },
  { title: "Monto (MM)", key: "volumeMoney" },
  { title: "Var día", key: "pctDay" },
  { title: "Var 30d**", key: "pct30D" },
  { title: "Año Actual", key: "pctCY" },
  { title: "12 Meses", key: "pct1Y" },
];

const firstHalf = computed(() =>
  constituents.value.slice(0, Math.ceil(constituents.value.length / 2))
);
const secondHalf = computed(() =>
  constituents.value.slice(Math.ceil(constituents.value.length / 2))
);
</script>

<template>
  <v-row>
    <v-col cols="12" lg="6">
      <v-data-table
        :headers="headers"
        :items="firstHalf"
        class="text-caption"
        density="compact"
        item-value="name"
        hide-default-footer
        hover
        multi-sort
        :items-per-page="constituents.length / 2"
        :loading="isLoading"
      >
        <template v-slot:loading>
          <v-skeleton-loader type="table-row@7"></v-skeleton-loader>
        </template>
        <template v-slot:item="{ item }">
          <instrument-item-component :instrument="item" />
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="12" lg="6">
      <v-data-table
        :headers="headers"
        :items="secondHalf"
        class="text-caption"
        density="compact"
        item-value="name"
        hide-default-footer
        hover
        multi-sort
        :items-per-page="constituents.length / 2"
        :loading="isLoading"
      >
        <template v-slot:loading>
          <v-skeleton-loader type="table-row@7"></v-skeleton-loader>
        </template>
        <template v-slot:item="{ item }">
          <instrument-item-component :instrument="item" />
        </template>
      </v-data-table>
    </v-col>

    <v-col cols="12" class="text-caption text-grey-lighten-1 py-2">
      <p>
        * Último precio, Monto Transado y Variación diaria con desfase de 15
        minutos. Haz click en cada instrumento para ver información actualizada
        en el gráfico.
      </p>
      <p>
        ** Variaciones a 30d, Año Actual y 12 Meses calculadas con el precio de
        cierre al último día hábil.
      </p>
    </v-col>
  </v-row>
</template>

<style>
.v-data-table th {
  background-color: #121212 !important;
}
.v-data-table td {
  border-bottom: none !important;
  background-color: #121212 !important;
}
</style>
