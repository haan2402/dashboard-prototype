<!--widget föranslagstavlan-->
<template>
  <div class="board-card">

    <!--visar alla inlägg-->
    <div v-for="post in paginatedPosts" :key="post.id" class="post">
        <div class="post-header">
        <div class="post-title">{{ post.title }}</div>
        <div class="post-date">{{ formatDate(post.date) }}</div>
        </div>

        <div class="post-text">{{ post.text }}</div>
    </div>

    <!--endast "admin" kan skriva nytt inlägg-->
    <button v-if="isAdmin" class="button is-link is-small mt-2" @click="showForm =!showForm">
        Nytt inlägg
    </button>

    <div v-if="showForm && isAdmin" class="new-post">
        <div class="form-header">
            <span>Nytt inlägg</span>
            <button class="close-btn" @click="showForm = false">x</button>
        </div>
        <input  v-model="newTitle" class="input mb-2" placeholder="Titel">

        <textarea v-model="newText" class="textarea" placeholder="Text"></textarea>

        <button class="button button-add is-small mt-4" @click="addPost">Lägg till</button>
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
    import { ref, computed, onMounted } from 'vue';
    import { noticeBoardItems } from '@/mockdata/noticeBoardItem';

    //props för att avgöra om användaren är admin eller inte och om formuläret visas i vyn 
    defineProps({isAdmin: Boolean})

    //states för formulärets synlighet
    const showForm = ref(false);
    const newTitle = ref('');
    const newText = ref('');

    //states för pagination och mobilanpassning 
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

    //hämtar data från localStorage eller mockdata
    const savedPosts = localStorage.getItem('noticeBoard');
    const posts = ref(savedPosts ? JSON.parse(savedPosts) : noticeBoardItems);

    //sparar inlägg i localStorage
    function savePost() {
        localStorage.setItem('noticeBoard', JSON.stringify(posts.value));
    }

    //lägger till nytt inlägg
    function addPost() {
        if(!newTitle.value || !newText.value) return;

        posts.value.unshift({
            id: Date.now(),
            title: newTitle.value,
            text: newText.value,
            date: new Date()
        })

        savePost();

        newTitle.value = '';
        newText.value = '';
        showForm.value = false;
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
<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .post {
        padding: 12px 0;
        border-bottom: 1px solid $text-title;
        margin-bottom: 15px;
    }

    .post-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .post-title {
        font-weight: $font-weight-secondary;
        color: $text-title;
        font-size: 0.9em;
    }

    .post-text {
        color: $text-primary;
        font-size: 0.9em;
        margin-top: 5px;
    }

    .post-date {
        color: $text-primary;
        font-size: 0.9em;
    }

    .button.is-link {
        background-color: $primary;
        color: $text-white;
        border: none;
        font-size: 1em;
    }

    .button-add {
        background-color: $success;
        color: $text-white;
        border: none;
        font-size: 1em;
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

    .form-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 8px;
        font-weight: $font-weight-secondary;
    }

    .close-btn {
        width: 35px;
        height: 35px;
        border-radius: 8px;
        border: 2px solid $text-secondary;
        font-size: 1.5em;
        color: $text-secondary;
    }

    .new-post {
        margin-top: 12px;
        padding-top: 10px;
    }

    .input,
    .textarea {
        border: 1px solid $text-secondary;
    }

    .input:focus,
    .textarea:focus {
        border-color: $primary;
        box-shadow: none;
    } 
    
</style>