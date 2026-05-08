<!--widget för linjediagram-->
<template>
    <div class="box line-card">

        <!--rubrik-->
        <h3 class="widget-title mb-4">Debiteringsgrad per månad</h3>
        <span class="text-title mb-1">Januari - April 2026</span>
        
        <hr class="divider">

        <!--diagram-->
        <div class="chart-wrapper">
            <apexchart type="line" height="280" :options="chartOptions" :series="series" />
        </div>
    </div>
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

    
    .chart-card {
        display: flex;
        flex-direction: column;
    }

    .widget-title {
        color: $text-title;
        font-size: $widget-title-size;
        font-weight: $widget-title-weight;
    }

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