<script setup>
    const menuItems = [
        { text: "Dashboard"},
        { text: "Tidsredovisning"},
        { text: "Planering"},
        { text: "Arbetsordrar"},
        { text: "Projekt"},
        { text: "EDI inköpsordrar"},
        { text: "Leverantörsfakturor"},
        { text: "Anläggningar"},
        { text: "Abonnemang"},
        { text: "Säljmöjligheter"},
        { text: "Fakturaunderlag"},
        { text: "Löneunderlag"}
    ]
</script>

<!--sido-menyn-->
<template>
      <aside class="sidebar">

        <div class="siderbar-section-title">START</div>
          <a class="sidebar-item">
            <span>Dashboard</span>
          </a>

          <div class="siderbar-section-title">APPLIKATIONER</div>
        
        <a v-for="item in menuItems.slice(1)" :key="item.text" class="sidebar-item">
          <span>{{ item.text }}</span>
        </a>
      </aside>
</template>

<style scoped>
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

    @media screen and (max-width: 768px) {
        .sidebar {
            display: none;
        }
    }
</style>