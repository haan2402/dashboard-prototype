<script setup>
    const menuItems = [
        { text: "Dashboard", icon: "fas fa-gauge-high"},
        { text: "Tidsredovisning", icon: "fas fa-clock"},
        { text: "Planering", icon: "fas fa-calendar-days"},
        { text: "Arbetsordrar", icon: "fas fa-file-lines"},
        { text: "Projekt", icon: "fas fa-lightbulb"},
        { text: "EDI inköpsordrar", icon: "fas fa-envelope"},
        { text: "Leverantörsfakturor", icon: "fas fa-file-invoice"},
        { text: "Anläggningar", icon: "fas fa-building"},
        { text: "Abonnemang", icon: "fas fa-repeat"},
        { text: "Säljmöjligheter", icon: "fas fa-filter"},
        { text: "Fakturaunderlag", icon: "fas fa-file-invoice-dollar"},
        { text: "Löneunderlag", icon: "fas fa-user"}
    ]
</script>

<!--sido-menyn-->
<template>
      <aside class="sidebar">

        <div class="siderbar-section-title">START</div>
          <a class="sidebar-item active">
            <span class="icon">
                <i :class="menuItems[0].icon"></i>
            </span>
            <span>{{menuItems[0].text}}</span>
          </a>

          <div class="siderbar-section-title">APPLIKATIONER</div>
        
        <a v-for="item in menuItems.slice(1)" :key="item.text" class="sidebar-item">
            <span class="icon">
                <i :class="item.icon"></i>
            </span>
            <span>{{ item.text }}</span>
        </a>
      </aside>
</template>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .siderbar-section-title {
        text-transform: uppercase;
        color: $text-secondary;
        margin: 16px 0 8px;
        padding-left: 10px;
        letter-spacing: 0.5px;
    }

    .sidebar {
        width: 240px;
        background-color: $surface-white;
        padding: 20px 0;
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
        color: $text-primary;
    }

    .sidebar-item.active {
        background-color: $sidebar-active-bg;
        border-left: 4px solid $primary;
        color: $primary;
        border-radius: 0;
        width: 100%;
    }

    .icon {
        margin-right: 5px;
    }

    @media screen and (max-width: 768px) {
        .sidebar {
            display: none;
        }
    }
</style>