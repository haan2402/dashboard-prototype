<!--widget för tips om abonnemang-->
<template>
    <section class="tips-card">

        <div class="version-tag mb-3">
            <p>Abonnemang</p>
        </div>

        <p class="text">
            Hantera och få överblick över era abonnemang och återkommande avtal.
        </p>
    </section>
</template>

<script setup>
</script>

<!--kompletterande styling-->
<style scoped>
    .version-tag {
        background-color: var(--tips-tag);
        color: var(--tips-primary);
        font-weight: var(--font-weight-secondary);
        border-radius: 15px;
        display: inline-block;
        padding: 6px 12px;
        font-size: 0.9em;
    }   

    .text {
        font-size: 0.9em;
        color: var(--text-title);
    }
</style>