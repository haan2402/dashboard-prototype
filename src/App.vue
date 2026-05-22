<script setup>
import Sidebar from './components/Sidebar.vue';
import Topbar from './components/Topbar.vue';
import { RouterView } from 'vue-router';
import { onMounted } from 'vue';

function applyTheme(e) {
  if(e.matches) {
    document.documentElement.setAttribute('dark-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('dark-theme');
  }
}

onMounted(() => {
  const media = window.matchMedia('(prefers-color-scheme: dark)');

  //sätter initialt tema baserat på systeminställning
  applyTheme(media);

  //lyssnar på ändringar i systeminställingar 
  media.addEventListener('change', applyTheme);
})

</script>

<template>
  <Topbar :toggleTheme="toggleTheme"/>

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
    background-color: var(--page-background);
  }
</style>
