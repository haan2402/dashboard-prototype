<!--widget för anslagstavlan-->
<template>
  <section class="board-card">

    <!--visar alla inlägg-->
    <article v-for="post in paginatedPosts" :key="post.id" class="post mb-4">
        <div class="post-header is-flex is-justify-content-space-between is-align-items-center">
        <h3 class="post-title">{{ post.title }}</h3>
        <p class="post-date">{{ formatDate(post.date) }}</p>
        </div>

        <p class="post-text mt-1">{{ post.text }}</p>
    </article>

    <div class="board-controls is-flex is-justify-content-space-between is-align-items-center mt-6">
        
        <!--endast "admin" ser denna knapp-->
        <div class="left-btn">
        <button v-if="isAdmin" class="button add-post-btn">
            Nytt inlägg
        </button>
        </div>

        <!--knappar för att byta sida-->
        <div class="button-controls is-flex">
            <button class="page-btn" @click="prevPage" :disabled="currentPage === 1">&lt;</button>

            <button v-for="page in totalPages" :key="page" class="page-btn" :class="{active: currentPage === page}" @click="currentPage = page">
                {{page}}
            </button>

            <button class="page-btn" @click="nextPage">&gt;</button>
        </div>
    </div>
</section>
</template>

<script setup>
    import { ref, computed, onMounted} from 'vue';
    import { noticeBoardItems } from '@/mockdata/noticeBoardItem';

    //props för att avgöra om användaren är admin eller inte och om formuläret visas i vyn 
    defineProps({isAdmin: Boolean})

    //states för pagination och mobilanpassning 
    const currentPage = ref(1);
    const isMobile = ref(false);

    const posts = ref([...noticeBoardItems]);

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

    //hämtar inlägg för aktuell sida och beräknar totala sidor
    const paginatedPosts = computed(() => {
        const start = (currentPage.value -1) * pageSize.value;
        return posts.value.slice(start, start + pageSize.value);
    })

    const totalPages = computed(() => Math.ceil(posts.value.length / pageSize.value));

    //funktioner för att navigera mellan sidor
    function nextPage() {
        if(currentPage.value < totalPages.value) currentPage.value++
    }

    function prevPage() {
        if(currentPage.value > 1) currentPage.value--
    }

    //formaterar datum
    function formatDate(date) {
        return new Date(date).toLocaleString('sv-SE', {
            day: 'numeric',
            month: 'short'
        })
    }
</script>

<!--kompletterande styling-->
<style scoped>

    .post {
        padding: 12px 0;
        border-bottom: 1px solid var(--text-title);
    }

    .post-title {
        font-weight: var(--font-weight-secondary);
        color: var(--text-title);
        font-size: 0.9em;
    }

    .post-text {
        color: var(--text-primary);
        font-size: 0.9em;
    }

    .post-date {
        color: var(--text-primary);
        font-size: 0.9em;
    }

    .board-controls {
        gap: 12px;
    }

    .left-btn {
        display: flex;
        align-items: center;
    }

    .button-controls {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
    }

    .add-post-btn {
        height: 35px;
        padding: 0 14px;
        border-radius: 8px;
        border: none;
        background-color: var(--primary);
        color: var(--text-white);
        font-size: 0.9em;
        font-weight: var(--font-weight-secondary);
    }

    .page-btn {
        width: 35px;
        height: 35px;
        border-radius: 8px;
        border: 1px solid var(--text-secondary);
        font-size: 1.2em;
    }    
</style>