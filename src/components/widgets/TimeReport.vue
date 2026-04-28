<!--widget för tidrapportering - enskild rapportering-->
<template>
  <div class="time-report box">
    <h3 class="widget-title title is-5 mb-4">Tidrapportering - denna vecka</h3>

    <div class="time-summary mb-4">
        <span class="reported-hours is-size-3 has-text-weight-bold">23h</span>
        <span class="total-hours is-size-6 has-text-grey ml-2">av 40h</span>
    </div>

    <progress class="custom-progress progress" value="23" max="40">23/40</progress>

    <a href="#" class="report-link has-text-weight-medium">Rapportera</a>
  </div>
</template>

<script setup></script>

<!--kompletterande styling-->
<style scoped>
    .widget-title {
        color: #4A4A4A;
    }

    .reported-hours {
        color: #595959;
    }

    .total-hours {
        color: #595959;
        font-weight: 500;
    }

    .custom-progress::-webkit-progress-value {
        background-color: #FEAC31;
    }

    .custom-progress::-moz-progress-bar {
        background-color: #FEAC31;
    }

    .report-link {
        color: #39378E;
        font-weight: 600;
    }
    
</style>