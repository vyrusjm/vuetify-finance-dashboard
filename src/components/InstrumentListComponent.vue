<script setup lang="ts">
import InstrumentItemComponent from "@/components/InstrumentItemComponent.vue";

const headers = [
  { title: "Nombre", key: "id", align: "start" },
  { title: "Último*", key: "name" },
  { title: "Monto (MM)", key: "department" },
  { title: "Var día", key: "role" },
  { title: "Var 30d**", key: "salary", align: "end" },
  { title: "Año Actual", key: "hireDate" },
  { title: "12 Meses", key: "score", align: "end" },
];
const employees = [
  {
    id: "E001",
    name: "Alice Johnson",
    department: "Engineering",
    role: "Software Dev",
    salary: 95000,
    hireDate: "2020-03-15",
    hoursPerWeek: 40,
    location: "New York",
    status: "Full-Time",
    score: 4.5,
  },
  {
    id: "E002",
    name: "Bob Carter",
    department: "Sales",
    role: "Account Manager",
    salary: 72000,
    hireDate: "2019-11-01",
    hoursPerWeek: 35,
    location: "Chicago",
    status: "Full-Time",
    score: 4.2,
  },
  {
    id: "E003",
    name: "Clara Diaz",
    department: "HR",
    role: "Recruiter",
    salary: 65000,
    hireDate: "2021-06-10",
    hoursPerWeek: 32,
    location: "Remote",
    status: "Part-Time",
    score: 4.0,
  },
  {
    id: "E004",
    name: "David Lee",
    department: "Engineering",
    role: "DevOps Engineer",
    salary: 105000,
    hireDate: "2018-09-22",
    hoursPerWeek: 40,
    location: "San Francisco",
    status: "Full-Time",
    score: 4.7,
  },
  {
    id: "E005",
    name: "Ella Smith",
    department: "Marketing",
    role: "Social Media Mgr",
    salary: 80000,
    hireDate: "2020-01-05",
    hoursPerWeek: 38,
    location: "Los Angeles",
    status: "Full-Time",
    score: 4.3,
  },
];
</script>
<template>
  <v-row>
    <v-col cols="6">
      <v-data-table
        :headers="headers"
        :items="employees"
        class="text-caption"
        density="compact"
        item-value="name"
        hide-default-footer
        hover
        multi-sort
      >
        <template v-slot:item="{ item }">
          <instrument-item-component :instrument="item" />
        </template>
      </v-data-table>
    </v-col>
    <v-col cols="6">
      <v-data-table
        :headers="headers"
        :items="employees"
        class="text-caption"
        density="compact"
        item-value="name"
        hide-default-footer
        hover
        multi-sort
      >
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
