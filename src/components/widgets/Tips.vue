<!--widget för tips om abonnemang-->
<template>
    <div class="tips-card box">

        <div class="header">
            <h3 class="widget-title is-5 mb-4 has-text-weight-semibold">Tips!</h3>
        </div>

        <div class="version-tag mb-3">
            <p>Abonnemang</p>
        </div>

        <p class="text">
            Hantera och få överblick över era abonnemang och återkommande avtal.
        </p>
    </div>
</template>

<script setup>
</script>

<!--kompletterande styling-->
<style scoped>
    .tips-card {
        border-left: 8px solid #93136B;
    }
    .widget-title {
        color: #4A4A4A;
    }

    .version-tag {
        background-color: #FFEFF7;
        color: #93136B;
        border-radius: 15px;
        display: inline-block;
        padding: 6px 12px;
        font-weight: 600;
    }   
</style>