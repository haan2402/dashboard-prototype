<!--widget för tidrapportering - enskild rapportering-->
<template>
  <div class="time-report box">
    <h3 class="widget-title is-3 mb-4">Tidrapportering - denna vecka</h3>

    <div class="time-summary mb-2">
        <span class="reported-hours is-size-5 has-text-weight-semibold">23h</span>
        <span class="total-hours is-size-6 ml-2">av 40h</span>
    </div>

    <progress class="custom-progress progress mb-4" value="23" max="40">23/40</progress>

    <a href="#" class="report-link">Rapportera</a>
  </div>
</template>

<script setup></script>

<!--kompletterande styling-->
<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .widget-title {
        color: $text-title;
        font-size: $widget-title-size;
        font-weight: $widget-title-weight;
    }

    .reported-hours {
        color: $text-primary;
    }

    .total-hours {
        color: $text-primary;
        font-weight: 500;
    }

    .custom-progress::-webkit-progress-value {
        background-color: $time-report-progress;
    }

    .custom-progress::-moz-progress-bar {
        background-color: $time-report-progress;
    }

    .report-link {
        color: $time-report-text;
        font-weight: $font-weight-secondary;
        font-size: 0.9em;
    }

    .report-link:hover {
        text-decoration: underline;
    }
    
</style>