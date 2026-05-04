<!--widget föranslagstavlan-->
<template>
  <div class="box board-card">
    <h3 class="widget-title is-5 mb-4 has-text-weight-semibold">Anslagstavla</h3>

    <!--visar alla inlägg-->
    <div v-for="post in posts" :key="post.id" class="post">
        <div class="post-title">{{ post.title }}</div>
        <div class="post-text">{{ post.text }}</div>
        <div class="post-date">{{ formatDate(post.date) }}</div>
    </div>

    <!--endast "admin" kan skriva nytt inlägg-->
    <button v-if="isAdmin" class="button is-link is-small mt-2" @click="showForm =!showForm">
        Nytt inlägg
    </button>

    <div v-if="showForm && isAdmin" class="new-post">
        <input  v-model="newTitle" class="input mb-2" placeholder="Titel">

        <textarea v-model="newText" class="textarea" placeholder="Text"></textarea>

        <button class="button button-add is-small mt-4" @click="addPost">Lägg till</button>
    </div>
  </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { noticeBoardItems } from '@/mockdata/noticeBoardItem';

    //props för att avgöra om användaren är admin eller inte och om formuläret visas i vyn 
    defineProps({
        isAdmin: Boolean
    })

    const showForm = ref(false);
    const newTitle = ref('');
    const newText = ref('');

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

    .widget-title {
        color: $text-title;
    }

    .post {
        padding: 12px 0;
        border-bottom: 1px solid $text-title;
        margin-bottom: 15px;
    }

    .post-title {
        font-weight: $font-weight-secondary;
        color: $text-title;
        font-size: 1em;
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
        background-color: $sucess;
        color: $text-white;
        border: none;
        font-size: 1em;
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