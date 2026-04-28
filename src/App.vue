<script setup>
import Sidebar from './components/Sidebar.vue';
import Topbar from './components/Topbar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <Topbar />

    <div class="main-layout">
        <Sidebar />
 
      <main class="content">
        <RouterView />
      </main>
    </div>
</template>

<style scoped>
  .main-layout {
    display: flex;
    min-height: calc(100vh - 60px);
  }

  .content {
    flex: 1;
    padding: 24px;
    background-color: #FAFAFA;
  }
</style>
