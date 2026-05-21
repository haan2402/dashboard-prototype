<!--widget för graf-->
<template>
    <section class="is-flex is-flex-direction-column">

        <span class="text-title mb-1">Januari - April 2026</span>

       <hr class="divider">
        
        <!--graf-->
        <div class="is-flex is-justify-content-center">
            <apexchart type="donut" height="260" :options="chartOptions" :series="series" />
        </div>

        <!--information-->
        <div class="legend is-flex is-flex-direction-column">

            <div class="legend-item is-flex is-align-items-center mt-1">
                <span class="dot billed"></span>
                Fakturerat
            </div>

            <div class="legend-item is-flex is-align-items-center mt-1">
                <span class="dot unbilled"></span>
                Ej fakturerat
            </div>

            <div class="legend-item is-flex is-align-items-center mt-1">
                <span class="dot ongoing"></span>
                Pågående
            </div>
        </div>

        <hr class="divider">

        <!--total-->
        <div class="is-flex is-justify-content-space-between">
            <div class="total-label">
                Totalt denna månad
            </div>

            <div class="total-amount">
                125 000 kr
            </div>
        </div>

    </section>
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
    .divider {
        margin: 12px 0;
        border: none;
        height: 1px;
        background: $text-title;
    }

    .legend {
        gap: 8px;
        margin-top: 10px;
    }

    .legend-item {
        gap: 10px;
        font-size: 0.95em;;
        color: $text-title;
    }

    .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
    }

    .billed {
        background-color: $success;
    }

    .unbilled {
        background-color: $billing-chart-yellow;
    }

    .ongoing {
        background-color: $billing-chart-blue;
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