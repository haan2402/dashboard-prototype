<script setup>
    import { RouterLink } from 'vue-router';
</script>

<!--topp-meny-->
<template>
    <header class="top-menu">
      <div class="top-left">
        <h1>mbiz</h1>
      </div>

      <div class="top-right">
        <RouterLink to="/montor">Montör</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
        <span class="user-name">Hanna</span>
      </div>
    </header>
</template>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .top-menu {
        height: 60px;
        background-color: $primary;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: $text-white;
        padding: 0 20px;
    }

    .top-left h1 {
        margin-left: 60px;
        font-size: 20px;
    }

    .top-right {
        display: flex;
        gap: 24px;
        align-items: center;
    }

    .top-right a {
        color: $text-white;
        text-decoration: none;
    }

    .user-name {
        font-weight: bold;
        border-left: 1px solid $surface-white;
        padding-left: 40px;
        padding-right: 20px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>