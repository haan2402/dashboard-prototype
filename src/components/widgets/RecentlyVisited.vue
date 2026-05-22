<!--widget för senast besökta-->
<template>
  <section class="recent-card">

    <div v-for="item in recentItems" :key="item.title" class="recent-item is-flex is-align-items-center">

        <div class="icon-circle is-flex is-justify-content-center is-align-items-center">
            <i :class="item.icon"></i>
        </div>

        <div>
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-time">{{ item.time }}</p>
        </div>
    </div>
  </section>
</template>

<script setup>
    import { recentItems } from '@/mockdata/recentItems';
</script>

<!--kompletterande styling-->
<style scoped>
    .recent-item {
        gap: 20px;
        padding: 15px 0;
        border-bottom: 1px solid var(--text-title);
    }

    .icon-circle {
        width: 50px;
        height: 50px;
        background-color: var(--recenty-icon-bg);
        border-radius: 50%;
        color: var(--recently-icon-color);
        flex-shrink: 0;
    }

    .icon-circle i {
        font-size: 1.4em;
    }

    .item-title {
        font-weight: var(--font-weight-secondary);
        color: var(--text-title);
        font-size: 0.9em;
    }

    .item-time {
        font-size: 0.8em;
        color: var(--text-title);
        font-style: italic;
    }
    
</style>