<!--widget för kräver uppmärksamhet-->
<template>
    <section class="attention-card">

    <div v-for="item in items" :key="item.id" class="attention-item mb-4 is-flex is-align-items-center">

        <!--vänster färgkant-->
        <div class="left-bar" :style="{backgroundColor: item.color}"></div>

        <!--ikon-->
        <div class="icon p-1" :style="{color: item.color}">
            <i :class="item.icon"></i>
        </div>

        <!--text-->
        <div class="text">
            {{ item.text }}
        </div>
    </div>
</section>
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
<style scoped>

    .attention-card {
        background-color: var(--attention-primary);
    }

    .attention-item {
        background-color: var(--attention-item-bg);
        border-radius: 0 12px 12px 0;
    }

    .left-bar {
        width: 10px;
        align-self: stretch;
    }

    .icon {
        margin-right: 8px;
        margin-left: 10px;
    }

    .text {
        padding: 10px 10px 10px 0;
        color: var(--text-title);
        font-size: 0.9em;
    }
    
</style>