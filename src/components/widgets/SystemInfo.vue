<!--widget för systeminformation-->
<template>
    <div class="system-card box">

            <h3 class="widget-title mb-4">Systeminfo</h3>

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

    .system-card {
        border-left: 8px solid $system-primary;
    }

    .widget-title {
        color: $text-title;
        font-size: $widget-title-size;
        font-weight: $widget-title-weight;
    }

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