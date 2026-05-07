<!--widget för senast besökta-->
<template>
  <div class="box recent-card">
    <h3 class="widget-title mb-2">Senast besökta</h3>

    <div v-for="item in recentItems" :key="item.title" class="recent-item">

        <div class="icon-circle">
            <i :class="item.icon"></i>
        </div>

        <div>
            <p class="item-title">{{ item.title }}</p>
            <p class="item-time">{{ item.time }}</p>
        </div>
    </div>
  </div>
</template>

<script setup>
    import { recentItems } from '@/mockdata/recentItems';
</script>

<!--kompletterande styling-->
<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .widget-title {
        color: $text-title;
        font-size: $widget-title-size;
        font-weight: $widget-title-weight;
        border-bottom: 2px solid $text-title;
        padding-bottom: 15px;
    }

    .recent-item {
        display: flex;
        align-items: center;
        gap: 20px;
        padding: 15px 0;
        border-bottom: 1px solid $text-title;
    }

    .icon-circle {
        width: 50px;
        height: 50px;
        background-color: $secondary;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: $primary;
        flex-shrink: 0;
    }

    .icon-circle i {
        font-size: 1.4em;
    }

    .item-title {
        font-weight: $font-weight-secondary;
        color: $text-title;
        font-size: 0.9em;
    }

    .item-time {
        font-size: 0.8em;
        color: $text-title;
        font-style: italic;
    }
    
</style>