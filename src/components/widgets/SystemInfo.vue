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
<style scoped>
    .system-card {
        border-left: 8px solid #34565F;
    }
    .widget-title {
        color: #4A4A4A;
    }

    .version-tag {
        background-color: #D6F1F8;
        color: #34565F;
        border-radius: 15px;
        display: inline-block;
        padding: 6px 12px;
        font-weight: 600;
    }

    .link {
        color: #34565F;
        cursor: pointer;
        font-weight: 600;
    }

    .link:hover {
        text-decoration: underline;
    }
    
</style>