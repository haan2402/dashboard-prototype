<!--widget för senast besökta-->
<template>
  <div class="recent-card">

    <div v-for="item in recentItems" :key="item.title" class="recent-item is-flex is-align-items-center">

        <div class="icon-circle is-flex is-justify-content-center is-align-items-center">
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

    .recent-item {
        gap: 20px;
        padding: 15px 0;
        border-bottom: 1px solid $text-title;
    }

    .icon-circle {
        width: 50px;
        height: 50px;
        background-color: $secondary;
        border-radius: 50%;
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