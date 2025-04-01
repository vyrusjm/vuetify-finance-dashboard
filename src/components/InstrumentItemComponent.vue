
<template>
    <tr class="text-no-wrap">
        <td>{{ instrument.id }}</td>
        <td>{{ instrument.name }}</td>
        <td>{{ instrument.department }}</td>
        <td>{{ instrument.role }}</td>
        <td
          :class="{
            'text-end': true,
            'bg-success': instrument.salary > 80000,
            'bg-warning': instrument.salary > 70000 && instrument.salary <= 80000,
            'bg-error': instrument.salary <= 70000
          }"
          v-text="`$${instrument.salary.toLocaleString()}`"
        ></td>
        <td>{{ instrument.hireDate }}</td>
        <td class="text-end">{{ instrument.hoursPerWeek }}</td>

      </tr>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from 'vue'
  
  const props = defineProps({
    instrument: {
      type: Object,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  })
  
  const emit = defineEmits(['select'])
  
  const onSelect = () => {
    emit('select', props.instrument.id)
  }
  
  function formatPrice(price) {
    return new Intl.NumberFormat('es-CL', { 
      style: 'currency', 
      currency: 'CLP',
      maximumFractionDigits: 2
    }).format(price)
  }
  
  function formatVariation(variation) {
    return variation >= 0 ? `+${variation.toFixed(2)}` : variation.toFixed(2)
  }
  
  function formatPercentage(percentage) {
    return percentage >= 0 ? `+${percentage.toFixed(2)}%` : `${percentage.toFixed(2)}%`
  }
  </script>
  
  <style scoped>
  .instrument-symbol {
    font-weight: bold;
    min-width: 80px;
  }
  </style>