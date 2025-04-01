<script setup lang="ts">
import { Line } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { ref } from "vue";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  Filler
);

const chartData = ref({
  labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
  datasets: [
    {
      label: "Ventas",
      data: [10, 20, 15, 30, 25],
      borderColor: "#0458a0",
      fill: true,
      tension: 0.25,
      backgroundColor: (ctx: any) => {
        const canvas = ctx.chart.ctx;
        const height = ctx.chart.height;
        const gradient = canvas.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, "rgba(4, 88, 160, 0.9)");
        gradient.addColorStop(0.7, "rgba(4, 88, 160, 0.6)");
        gradient.addColorStop(0.9, "rgba(4, 88, 160, 0.3)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0.6)");
        return gradient;
      },
    },
  ],
});

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    y: {
      beginAtZero: false,
    },
  },
});

const periods = ['1M', '3M', '6M', '1A'];
const currentPeriod = ref('1M') ;

const changePeriod = (period: string) => {
  currentPeriod.value = period;
}
</script>

<template>
  <div class="rounded-lg shadow-lg p-4 mt-5">
    <Line  :data="chartData" :options="chartOptions" />
    <div class="d-flex">
        <v-btn 
          v-for="period in periods" 
          :key="period" 
          size="small" 
          variant="flat"
          :color="currentPeriod === period ? '#0458a0' : ''" 
          @click="changePeriod(period)"
        >
          {{ period }}
        </v-btn>
      </div>
  </div>
</template>
