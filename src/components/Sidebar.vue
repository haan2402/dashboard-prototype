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
      <aside class="sidebar is-flex is-flex-direction-column">

        <div class="siderbar-section-title">START</div>
          <a class="sidebar-item active">
            <span class="icon">
                <i :class="menuItems[0].icon"></i>
            </span>
            <span>{{menuItems[0].text}}</span>
          </a>

          <div class="siderbar-section-title">APPLIKATIONER</div>
        
        <a v-for="item in menuItems.slice(1)" :key="item.text" class="sidebar-item p-3">
            <span class="icon">
                <i :class="item.icon"></i>
            </span>
            <span>{{ item.text }}</span>
        </a>
      </aside>
</template>

<style scoped>
    .siderbar-section-title {
        text-transform: uppercase;
        color: var(--text-secondary);
        margin: 16px 0 8px;
        padding-left: 10px;
        letter-spacing: 0.5px;
    }

    .sidebar {
        width: 240px;
        background-color: var(--sidebar-bg);
        padding: 20px 0;
        box-shadow: 6px 0 18px rgba(0,0,0,0.1);
        position: relative;
        z-index: 10;
    }

    .sidebar-item {
        border-radius: 6px;
        color: var(--text-secondary);
    }

    .sidebar-item.active {
        background-color: var(--sidebar-active-bg);
        border-left: 4px solid var(--sidebar-active-text);
        color: var(--sidebar-active-text);
        border-radius: 0;
        width: 100%;
    }

    .icon {
        margin-right: 5px;
    }

    @media(max-width: 768px) {
        .sidebar {
            display: none !important;
        }
    }

    @media(max-width: 1024px) {
        .sidebar {
            display: none !important;
        }
    }
</style>