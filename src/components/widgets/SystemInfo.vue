<!--widget för systeminformation-->
<template>
    <div class="system-card box">

        <div class="header">
            <h3 class="widget-title is-5 mb-4 has-text-weight-semibold">Systeminfo</h3>
        </div>

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
    }

    .version-tag {
        background-color: $system-tag;
        color: $system-primary;
        font-weight: $font-weight-secondary;
        border-radius: 15px;
        display: inline-block;
        padding: 6px 12px;
    }

    .link {
        color: $system-primary;
        font-weight: $font-weight-secondary;
    }

    .link:hover {
        text-decoration: underline;
    }
    
</style>