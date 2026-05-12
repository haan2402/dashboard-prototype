<!--widget för systeminformation-->
<template>
    <div class="system-card">

        <div class="version-tag mb-3">
            {{ version }}
        </div>

        <p class="text">
            Vi har uppdaterat mbiz! <a class="link">Läs mer</a>
        </p>

    </div>
</template>

<script setup>
    const version = "v3.2.99"
</script>

<!--kompletterande styling-->
<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .version-tag {
        background-color: $system-tag;
        color: $system-primary;
        font-weight: $font-weight-secondary;
        border-radius: 15px;
        display: inline-block;
        padding: 6px 12px;
        font-size: 0.9em;
    }

    .text {
        font-size: 0.9em;
    }

    .link {
        color: $system-primary;
        font-weight: $font-weight-secondary;
    }

    .link:hover {
        text-decoration: underline;
    }
    
</style>