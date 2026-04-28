<script setup>
import { RouterView } from 'vue-router';

const menuItems = [
  { text: "Dashboard", icon: ""},
  { text: "Tidsredovisning", icon: ""},
  { text: "Planering", icon: ""},
  { text: "Arbetsordrar", icon: ""},
  { text: "Projekt", icon: ""},
  { text: "EDI inköpsordrar", icon: ""},
  { text: "Leverantörsfakturor", icon: ""},
  { text: "Anläggningar", icon: ""},
  { text: "Abonnemang", icon: ""},
  { text: "Säljmöjligheter", icon: ""},
  { text: "Fakturaunderlag", icon: ""},
  { text: "Löneunderlag", icon: ""},
]
</script>

<template>
  <div class="layout">

    <!--top-menu-->
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

    <div class="main-layout">

      <!--side-menu-->
      <aside class="sidebar">

        <div class="siderbar-section-title">START</div>
          <a class="sidebar-item">
            <span>Dashboard</span>
          </a>

          <div class="siderbar-section-title">APPLIKATIONER</div>
        
        <a v-for="item in menuItems.slice(1)" :key="item.text" class="sidebar-item">
          <span class="icon">{{ item.icon }}</span>
          <span>{{ item.text }}</span>
        </a>
      </aside>


    <main class="content">
      <RouterView />
    </main>
    </div>
    </div>
</template>

<style scoped>
  .top-menu {
    height: 60px;
    background-color: #003D4F;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: white;
    padding: 0 20px;
  }

  .top-left h1 {
    margin: 0;
    font-size: 20px;
  }

  .top-right {
    display: flex;
    gap: 24px;
    align-items: center;
  }

  .top-right a {
    color: white;
    text-decoration: none;
  }

  .user-name {
    font-weight: bold;
    border-left: 1px solid white;
    padding-left: 10px;
  }

  .main-layout {
    display: flex;
    min-height: calc(100vh - 60px);
  }

  .siderbar-section-title {

    text-transform: uppercase;
    color: #939393;
    margin: 16px 0 8px;
    padding-left: 10px;
    letter-spacing: 0.5px;
  }

  .sidebar {
    width: 240px;
    background-color: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    box-shadow: 6px 0 18px rgba(0,0,0,0.1);
    position: relative;
    z-index: 10;
  }

  .sidebar-item {
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
    color: #595959;
  }

  .content {
    flex: 1;
    padding: 24px;
    background-color: #FAFAFA;
  }
</style>
