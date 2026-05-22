<script setup>
    import { RouterLink } from 'vue-router';
</script>

<!--topp-meny-->
<template>
    <header class="top-menu is-flex is-justify-content-space-between is-align-items-center p-5">
      <div class="top-left">
        <h1 class="ml-6">mbiz</h1>
      </div>

      <div class="top-right is-flex is-align-items-center">
        <RouterLink to="/montor">Montör</RouterLink>
        <RouterLink to="/admin">Admin</RouterLink>
        <span class="user-name is-flex is-justify-content-center is-align-items-center">Hanna</span>
      </div>
    </header>
</template>

<style scoped>
    .top-menu {
        height: 60px;
        background-color: var(--topbar-bg);
        color: var(--topbar-text);
    }

    .top-left h1 {
        font-size: 1.3em;
    }

    .top-right {
        gap: 24px;
    }

    .top-right a {
        color: var(--topbar-text);
        text-decoration: none;
    }

    .user-name {
        border-left: 1px solid var(--topbar-text);
        padding-left: 40px;
        padding-right: 20px;
        height: 60px;
    }
</style>