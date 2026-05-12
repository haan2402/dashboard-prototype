<!--widget för kräver uppmärksamhet-->
<template>
    <div class="attention-card">

    <div v-for="item in items" :key="item.id" class="attention-item mb-4">

        <!--vänster färgkant-->
        <div class="left-bar" :style="{backgroundColor: item.color}"></div>

        <!--ikon-->
        <div class="icon" :style="{color: item.color}">
            <i :class="item.icon"></i>
        </div>

        <!--text-->
        <div class="text">
            {{ item.text }}
        </div>
    </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { attentionItems } from '@/mockdata/atttentionItems';

    //props från vyer
    const props = defineProps({
        role: String
    });

    //rätt lista beroende på roll
    const items = computed(() => {
        return attentionItems[props.role] || [];
    });

    
</script>

<!--kompletterande styling-->
<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .attention-card {
        background-color: $attention-primary;
    }

    .attention-item {
        display: flex;
        align-items: center;
        background-color: $surface-white;
        border-radius: 0 12px 12px 0;
    }

    .left-bar {
        width: 10px;
        align-self: stretch;
    }

    .icon {
        margin-right: 8px;
        margin-left: 10px;
        padding: 10px;
    }

    .text {
        padding: 10px 10px 10px 0;
        color: $text-title;
        font-size: 0.9em;
    }
    
</style>