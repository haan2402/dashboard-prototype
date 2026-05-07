<!--widget för tilldelat till mig-->
<template>
    <div class="box assigned-card">

        <h3 class="widget-title">Tilldelat mig</h3>

        <!--försenade-->
        <div class="section-title">Försenade</div>

        <div v-for="item in paginatedOverdue" :key="item.id" class="task-item">

            <div class="icon-circle">
            <i :class="item.icon"></i>
            </div>

            <div class="task-info">
            <div class="task-title mt-1">{{ item.title }}</div>
            <div class="task-place mt-1">{{ item.place }}</div>
            <div class="task-date mt-1">{{ formatDate(item.date) }}</div>
            </div>
        </div>

        <!--inget slutdatum-->
        <div class="section-title mt-4">Inget slutdatum</div>

        <div v-for="item in paginatedNoDeadline" :key="item.id" class="task-item">

            <div class="icon-circle">
            <i :class="item.icon"></i>
            </div>

            <div class="task-info">
            <div class="task-title">{{ item.title }}</div>
            <div class="task-place">{{ item.place }}</div>
            </div>
        </div>

        <div class="button-controls">
            <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">&lt;</button>

            <button v-for="page in totalPages" :key="page" class="page-btn" :class="{active: currentPage === page}" @click="currentPage = page">
            {{page}}
            </button>

            <button class="page-btn" @click="nextPage">&gt;</button>
        </div>

    </div>
</template>

<script setup>
    import { ref, computed, onMounted  } from 'vue';
    import { assignedItems } from '@/mockdata/assignedItems';

    const currentPage = ref(1);
    const isMobile = ref(false);

    //vid mounting kontrolleras skärmstorlek och uppdateras vid resize 
    onMounted(() => {
        const checkMobile = () => {
            isMobile.value = window.innerWidth < 768
        }

        checkMobile();
        window.addEventListener('resize', checkMobile);
    });

    //antal inlägg beroende på skärmstorlek
    const pageSize = computed(() => (isMobile.value ? 3 : 5));

    //delar upp listan
    const itemOverdue = computed(() => assignedItems.overdue);
    const itemNoDeadline = computed(() => assignedItems.noDeadline);

    //logik för att byta sida 
    function changeSide(list = []) {
        const start = (currentPage.value - 1) * pageSize.value
        return list.slice(start, start + pageSize.value);
    }

    //listor paginerade
    const paginatedOverdue = computed(() => {
        const start = (currentPage.value -1) * pageSize.value;
        return itemOverdue.value.slice(start, start + pageSize.value);
    });

    const paginatedNoDeadline = computed(() => {
        const start = (currentPage.value -1) * pageSize.value;
        return itemNoDeadline.value.slice(start, start + pageSize.value);
    });

    //antal sidor
    const totalPages = computed(() => {
        return Math.max(
            Math.ceil(itemOverdue.value.length / pageSize.value),
            Math.ceil(itemNoDeadline.value.length / pageSize.value)
        );
    });

    //funktioner för att navigera mellan sidor
    function nextPage() {
        if(currentPage.value < totalPages.value) currentPage.value++
    }

    function prevPage() {
        if(currentPage.value > 1) currentPage.value--
    }

    //formaterar datum
    function formatDate(date) {
        if(!date) return ''

        const d = new Date(date);

        const weekday = d.toLocaleDateString('sv-SE', {weekday: 'long'})
        
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');

        return `${yyyy}-${mm}-${dd} ${weekday}`
    }
</script>

<!--kompletterande styling-->
<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .widget-title {
        color: $text-title;
        font-size: $widget-title-size;
        font-weight: $widget-title-weight;
    }

    .section-title {
        color: $text-title;
        border-bottom: 2px solid #40B8AF;
        font-size: 1em;
        padding: 5px;
    }

    .task-item {
        display: flex;
        gap: 20px;
        padding: 15px 0;
        border-bottom: 1px solid $text-title;
    }

    .task-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .task-title {
        font-weight: $font-weight-secondary;
        color: $text-title;
        font-size: 0.9em;
    }

    .task-place {
        color: $text-primary;
        font-size: 0.8em;
    }

    .task-date {
        color: $text-primary;
        font-size: 0.8em;
        font-style: italic;
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
    
    .button-controls {
        display: flex;
        justify-content: flex-end;
        gap: 15px;
        margin-top: 30px;
    }

    .page-btn {
        width: 35px;
        height: 35px;
        border-radius: 8px;
        border: 1px solid $text-secondary;
        font-size: 1.2em;
    }

    .page-btn.active {
        border: 2px solid $text-primary;
    }

    .page-btn:disabled {
        opacity: 0.4;
        cursor: default;
    }
</style>