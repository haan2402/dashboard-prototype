<!--widget för senast besökta-->
<template>
  <div class="box recent-card">
    <h3 class="widget-title is-5 mb-4 has-text-weight-semibold">Senast besökta</h3>

    <div v-for="item in recentItems" :key="item.title" class="recent-item">

        <div class="icon-circle">
            <i :class="item.icon"></i>
        </div>

        <div class="text">
            <h4 class="item-title">{{ item.title }}</h4>
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
        border-bottom: 2px solid $text-title;
        padding-bottom: 10px;
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
        color: $text-title;
        font-size: 1em;
    }

    .item-time {
        font-size: 0.8em;
        color: $text-title;
        font-style: italic;
    }
    
</style>