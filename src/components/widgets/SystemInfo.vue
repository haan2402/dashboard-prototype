<!--widget för systeminformation-->
<template>
    <section class="system-card">

        <div class="version-tag mb-3">
            {{ version }}
        </div>

        <p class="text">
            Vi har uppdaterat mbiz! <a class="link">Läs mer</a>
        </p>

    </section>
</template>

<script setup>
    const version = "v3.2.99"
</script>

<!--kompletterande styling-->
<style scoped>

    .version-tag {
        background-color: var(--system-tag);
        color: var(--system-primary);
        font-weight: var(--font-weight-secondary);
        border-radius: 15px;
        display: inline-block;
        padding: 6px 12px;
        font-size: 0.9em;
    }

    .text {
        font-size: 0.9em;
    }

    .link {
        color: var(--system-primary);
        font-weight: var(--font-weight-secondary);
    }

    .link:hover {
        text-decoration: underline;
    }
    
</style>