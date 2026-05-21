<!--widget för linjediagram-->
<template>
    <section class="line-card is-flex is-flex-direction-column">

        <!--rubrik-->
        <span class="text-title mb-1">Januari - April 2026</span>
        
        <hr class="divider">

        <!--diagram-->
        <div class="chart-wrapper">
            <apexchart type="line" height="280" :options="chartOptions" :series="series" />
        </div>
    </section>
</template>

<script setup>

    //data för linjediagrammet
    const series = [
        {
            name: "Debiteringsgrad",
            data: [78, 82, 75, 88]
       }
   ];

   //konfigurations för ApexCharts
   const chartOptions = {
    chart: {
        type: "line",
        toolbar: {
            show: false
        },

        zoom: {
            enabled: false
        }
    },

    xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr"],
        axisBorder: {
            show: false
        },
        axisTicks: {
            show: false
        }
    },

    stroke: {
        curve: "smooth",
        width: 3
    },

    colors: ["#003D4F"],

    dataLabels: {
        enabled: false
    },

    grid: {
        strokeDashArray: 4,
        borderColor: "#eaeaea"
    },

    tooltip: {
        y: {
            formatter: (val) => `${val}%`
        }
    },

    markers: {
        size: 4
    }
   }
 
</script>

<!--kompletterande styling-->
<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .divider {
        margin: 12px 0;
        border: none;
        height: 1px;
        background: $text-title;
    }

    .chart-wrapper {
        width: 100%;
    }
    
</style>