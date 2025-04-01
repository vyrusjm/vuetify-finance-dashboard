<script setup lang="ts">
import { ref } from 'vue'
const searchText = ref('')

const onSearch = () => {
    console.log('Search text:', searchText.value)
}
</script>
<template>
    <v-card flat class="mb-2">
      <v-text-field
        v-model="searchText"
        density="compact"
        variant="outlined"
        label="Buscar instrumento"
        prepend-inner-icon="mdi-magnify"
        single-line
        hide-details
        @input="onSearch"
        clearable
      ></v-text-field>
    </v-card>
  </template>
  
