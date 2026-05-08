<!--widget för graf-->
<template>
    <div class="box billing-card">

        <h3 class="widget-title mb-4">Fakturering denna månad</h3>
        <span class="text-title mb-1">Januari - April 2026</span>

       <hr class="divider">
        
        <!--graf-->
        <div class="chart-wrapper">
            <apexchart type="donut" height="260" :options="chartOptions" :series="series" />
        </div>

        <!--information-->
        <div class="legend">

            <div class="legend-item">
                <span class="dot billed"></span>
                Fakturerat
            </div>

            <div class="legend-item">
                <span class="dot unbilled"></span>
                Ej fakturerat
            </div>

            <div class="legend-item">
                <span class="dot ongoing"></span>
                Pågående
            </div>
        </div>

        <hr class="divider">

        <!--total-->
        <div class="total-section">
            <div class="total-label">
                Totalt denna månad
            </div>

            <div class="total-amount">
                125 000 kr
            </div>
        </div>

    </div>
</template>

<script setup>

  //data för donut chart
  const series = [62, 23, 15];

  //konfigurations för ApexCharts
  const chartOptions = {
    chart: {
        type: "donut",

        states: {
            hover: {
                filter: {
                    type: "lighten",
                    value: 0.03
                }
            }
        },

        animations: {
            enabled: true,
            speed: 300
        }
    },

    colors: [
        "#008A40",
        "#FFE15C",
        "#AAD6FF"
    ],

    labels: [
        "Fakturerat",
        "Ej fakturerat",
        "Pågående"
    ],

    dataLabels: {
        enabled: false
    },

    legend: {
        show: false
    },

    stroke: {
        width: 5,
        colors: ["#ffffff"]
    },

    tooltip: {
        enabled: false
    },

    plotOptions: {
        pie: {
            expandOnClick: false,

            donut: {
                size: "75%",

                labels: {
                    show: true,
                },

                value: {
                    fontSize: "30px",
                    fontWeight: 700,
                },

                total: {
                    show: false
                }
            }
        }
    }
  }
</script>

<!--kompletterande styling-->
<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .billing-card {
        display: flex;
        flex-direction: column;
    }

    .widget-title {
        color: $text-title;
        font-size: $widget-title-size;
        font-weight: $widget-title-weight;
    }

    .chart-wrapper {
        display: flex;
        justify-content: center;
    }

    .divider {
        margin: 12px 0;
        border: none;
        height: 1px;
        background: $text-title;
    }

    .legend {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-top: 10px;
    }

    .legend-item {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 0.95em;
        margin-top: 5px;
        color: $text-title;
    }

    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }

    .billed {
        background-color: #008A40;
    }

    .unbilled {
        background-color: #FFE15C;
    }

    .ongoing {
        background-color: #AAD6FF;
    }

    .total-section {
        display: flex;
        justify-content: space-between;
    }

    .total-label {
        font-size: 1em;
        color: $text-title;
    }

    .total-amount {
        font-size: 1.3em;
        color: $text-title;
    }
    
</style>