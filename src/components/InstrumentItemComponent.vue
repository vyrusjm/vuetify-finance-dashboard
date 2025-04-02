<script setup lang="ts">
import { defineProps, defineEmits } from "vue";
import { useInstrumentStore } from "@/store/instrumentStore";
import { formatPrice, formatPercentage } from "@/utils/index";
const store = useInstrumentStore();
const props = defineProps({
  instrument: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["select"]);

const onSelect = () => {
  store.selectInstrument(props.instrument.codeInstrument);
};
</script>
<template>
  <tr class="text-no-wrap cursor-pointer" @click="onSelect">
    <td>{{ instrument.shortName }}</td>
    <td class="text-end">{{ formatPrice(instrument.lastPrice) }}</td>
    <td class="text-end">{{ formatPrice(instrument.volumeMoney) }}</td>
    <td
      :class="{
        'text-end': true,
        'text-white': instrument.pctDay === 0,
        'text-green': instrument.pctDay > 0,
        'text-red': instrument.pctDay < 0,
      }"
    >
      {{ formatPercentage(instrument.pctDay) }}
    </td>
    <td
      :class="{
        'text-end': true,
        'text-white': instrument.pct30D === 0,
        'text-green': instrument.pct30D > 0,
        'text-red': instrument.pct30D < 0,
      }"
    >
      {{ formatPercentage(instrument.pct30D) }}
    </td>
    <td
      :class="{
        'text-end': true,
        'text-white': instrument.pctCY === 0,
        'text-green': instrument.pctCY > 0,
        'text-red': instrument.pctCY < 0,
      }"
    >
      {{ formatPercentage(instrument.pctCY) }}
    </td>
    <td
      :class="{
        'text-end': true,
        'text-white': instrument.pct1Y === 0,
        'text-green': instrument.pct1Y > 0,
        'text-red': instrument.pct1Y < 0,
      }"
    >
      {{ formatPercentage(instrument.pct1Y) }}
    </td>
  </tr>
</template>

<style scoped>
.instrument-symbol {
  font-weight: bold;
  min-width: 80px;
}
</style>
