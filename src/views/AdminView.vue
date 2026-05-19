<script setup>
import TopInfoBar from '@/components/TopInfoBar.vue';
import AttentionRequired from '@/components/widgets/AttentionRequired.vue';
import BillingChart from '@/components/widgets/BillingChart.vue';
import LineChart from '@/components/widgets/LineChart.vue';
import NoticeBoard from '@/components/widgets/NoticeBoard.vue';
import Planning from '@/components/widgets/Planning.vue';
import RecentlyVisited from '@/components/widgets/RecentlyVisited.vue';
import SystemInfo from '@/components/widgets/SystemInfo.vue';
import Tips from '@/components/widgets/Tips.vue';
import DashboardWidget from '@/components/DashboardWidget.vue';
import { widgetRegistry } from '@/components/widgets/widgetRegistry';
import { ref, onMounted } from 'vue';
import {GridLayout, GridItem } from 'vue-grid-layout-v3';

const user = { role: "admin" }

const isEditing = ref(false)
const isMobile = ref(false)
const layout = ref([])
const showWidgets = ref(false)

//koppling mellan namn och komponenten
const widgetMaps = {
  attention: AttentionRequired,
  recently: RecentlyVisited,
  line: LineChart,
  tips: Tips,
  planning: Planning,
  billing: BillingChart,
  system: SystemInfo,
  notice: NoticeBoard
}

const availableWidgets = [
  { type: 'attention', title: 'Kräver uppmärksamhet', description: 'Uppgifter som kräver uppmärksamhet' },
  { type: 'recently', title: 'Senast besökta', description: 'Anläggningar och dokument' },
  { type: 'planning', title: 'Planering', description: 'Veckovy med arbetsplanering' },
  { type: 'line', title: 'Debiteringsgrad', description: 'Linjediagram över debiteringsfrekvens' },
  { type: 'billing', title: 'Fakturering', description: 'Donut-diagram över fakturering' },
]

//standard layout, används om ingen sparad layout finns, eller när layout återställs 
const defaultLayout = [
  {x: 0, y: 0, w: 4, h: 10, i: 'attention', type: 'attention', static: false},
  {x: 4, y: 0, w: 4, h: 4, i: 'tips', type: 'tips', static: true},
  {x: 8, y: 0, w: 4, h: 4, i: 'system', type: 'system', static: true},
  {x: 0, y: 4, w: 4, h: 8,i: 'recently', type: 'recently', static: false},
  {x: 4, y: 4, w: 4, h: 6, i: 'planning', type: 'planning', static: false},
  {x: 8, y: 4, w: 4, h: 9,i: 'notice', type: 'notice', static: true},
  {x: 0, y: 10, w: 4, h: 9, i: 'line', type: 'line', static: false},
  {x: 4, y: 14, w: 4, h: 12, i: 'billing', type: 'billing', static: false},
]

//versionshantering för sparad layout, om layout strukturen ändras kan versionen uppdateras 
const layoutVersion = '1'

//växlar mellan desktop och mobilläge beroende på skärmstorlek 
const checkScreen = () => {
  isMobile.value = window.innerWidth <= 768
}

//hämtar sparad layout från localStorage när sidan laddas 
onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)

  const savedVersion = localStorage.getItem('layout-version');
  const saved = localStorage.getItem('dashboard-layout');

  if(saved && savedVersion === layoutVersion) {
    layout.value = JSON.parse(saved);
  } else {
    layout.value = defaultLayout.map(item => ({...item}));
  }
});

//sparar användarens nuvarande layout i localStorage, och avslutar redigeringsläget 
function saveLayout () {
  localStorage.setItem('dashboard-layout', JSON.stringify(layout.value));
  localStorage.setItem('layout-version', layoutVersion);
  isEditing.value = false;
}

//återställer dashboarden till standardlayout och tar bort sparad layout från localStorage 
function resetLayout () {
  layout.value = defaultLayout.map(item => ({...item}));
  localStorage.removeItem('dashboard-layout')
  localStorage.removeItem('layout-version')
}

//lägger till en ny widget i layouten
function addWidget(type) {
  const exists = layout.value.some(item => item.i === type)

  if(exists) return

  //hittar längst ner i layouten och placerar widget där
  const maxY = Math.max(...layout.value.map(item => item.y + item.h), 0)

  layout.value.push({x: 0, y: maxY, w: 4, h: 5, i: type, type, static: false})

  showWidgets.value = false
}

//tar bort en widget baserat på id
function removeWidget(id) {
  layout.value = layout.value.filter(item => item.i !== id)
}

//kontroll om widget redan finns i layouten, används för att inaktivera lägg till knappen i widgetbiblioteket 
function widgetExists(type) {
  return layout.value.some(item => item.i === type)
}
</script>

<!--vy för admin/ekonomi-->
<template>
  <div class="top-section">
    <TopInfoBar />

    <!--anpassa knapp (alltid synlig)-->
    <div v-if="!isMobile" class="edit-toolbar">
      <button class="edit-btn" :class="{active: isEditing}" @click="isEditing = !isEditing">
        {{ isEditing ? 'Avsluta' : 'Anpassa' }}
      </button>
    </div>
  </div>

    <!--redigeringsbanner-->
  <div v-if="isEditing" class="edit-banner">
    <div class="edit-info">
      <h3>Redigeringsläge aktivt</h3>
      <p>Flytta, ändra storlek eller lägg till widgets. Vissa widgets är låsta och kan inte ändras.</p>
    </div>

    <div class="edit-actions">
    <button class="secondary-btn" @click="resetLayout">
      Återställ
    </button>
  
    <button class="primary-btn" @click="saveLayout">
      Spara
    </button>
  </div>
  </div>

    <!--Desktop grid-->
    <GridLayout 
      v-if="!isMobile && layout.length"
      v-model:layout="layout"
      :col-num="12"
      :row-height="40"
      :margin="[12,12]"
      :is-draggable="isEditing"
      :is-resizable="isEditing"
      :vertical-compact="true"
      :use-css-transforms="true"
      :auto-size="true"
    >

    <GridItem
      v-for="item in layout"
      :key="item.i"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.i"
      :static="item.static"
    >

    <!--för att tydligt visa låsta widgets i redigeringsläge, samt ta bort-knapp-->
    <div class="widget-wrapper" :class="{ locked: item.static  && isEditing, editing: isEditing && !item.static}">
      <button v-if="isEditing && !item.static" class="delete-widget" @click="removeWidget(item.i)">
        X
      </button>
      <div v-if="isEditing && item.static" class="locked-overlay">
        Låst
      </div>

    <DashboardWidget
      :title="widgetRegistry[item.type].title"
      :accent="widgetRegistry[item.type].accent"
      :color="widgetRegistry[item.type].background"
      :textColor="widgetRegistry[item.type].color"
    >
    <component 
      :is="widgetMaps[item.type]"
      :role="user.role"
      :isAdmin="user.role === 'admin'"
    />
    </DashboardWidget>
    </div>
  </GridItem>
</GridLayout>

<!--mobilvy-->
<div v-else class="mobile-stack">
  <div v-for="item in layout" :key="item.i">
    <DashboardWidget
      :title="widgetRegistry[item.type].title"
      :accent="widgetRegistry[item.type].accent"
      :color="widgetRegistry[item.type].background"
      :textColor="widgetRegistry[item.type].color"
    >
    <component 
      :is="widgetMaps[item.type]"
      :role="user.role"
      :isAdmin="user.role === 'admin'"
    />
  </DashboardWidget>
  </div>
</div>

<!--lägg till widget-->
<div v-if="isEditing" class="add-widget-card" @click="showWidgets = true">
  + Lägg till widget
</div>

<div v-if="showWidgets" class="widget-library">
  <div class="library-widget">
    <div class="library-header">
      <h3>Välj widget</h3>
      <p>Klicka på en widget för att lägga till den.</p>
      <button class="close-library" @click="showWidgets = false">
        X
      </button>
    </div>

    <div v-for="widget in availableWidgets" :key="widget.type" class="widget-option" :class="{ added: widgetExists(widget.type) }">
      <div class="widget-option-content">
        <h4>{{ widget.title }}</h4>
        <p>{{ widget.description }}</p>
      </div>
      <button class="add-widget-btn" :disabled="widgetExists(widget.type)" @click="addWidget(widget.type)">
        {{ widgetExists(widget.type) ? 'Tillagd' : 'Lägg till' }}
      </button>
    </div> 
  </div>
</div>
</template>

<style scoped>
  .top-section {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .mobile-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  /*styling redigeringsläge*/
  .edit-banner {
    background-color: #D6F1F8;
    border: 2px solid #002936;
    border-radius: 14px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .edit-banner h3 {
    font-size: 1.1em;
  }

  .edit-actions {
    display: flex;
    gap: 12px;
  }

  .edit-btn,
  .primary-btn,
  .secondary-btn {
    border: none;
    border-radius: 10px;
    padding: 8px 15px;
    cursor: pointer;
    font-weight: 600;
    color: white;
  }

  .primary-btn {
    background-color: #008A40;
  }

  .secondary-btn {
    background-color: #f59e0b;
  }

  .edit-toolbar {
    display: flex;
  }

  .edit-btn {
    background-color: #003D4F;
  }

  .edit-btn.active {
    background: #b91c1c;
  }

  .widget-wrapper {
    height: 100%;
    width: 100%;
    position: relative;
    box-sizing: border-box;
  }

  .widget-wrapper.editing {
    cursor: move;
  }

  .widget-wrapper.editing::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 2px dashed #40b8af;
    border-radius: 16px;
    pointer-events: none;
  }

  .widget-wrapper.locked {
    opacity: 0.75;
    filter: grayscale();
  }
  
  .locked-overlay {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 6px 10px;
    border-radius: 10px;
    font-size: 0.8em;
    z-index: 10;
  }

  .delete-widget {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 28px;
    height: 28px;
    border-radius: 10px;
    background-color: #b91c1c;
    color: white;
    font-weight: 600;
    cursor: pointer;
    z-index: 20;
  }

  .add-widget-card {
    margin-top: 20px;
    height: 160px;
    border: 2px dashed #c8c8c8;
    background: #f7f7f7;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #777;
    font-weight: 600;
    cursor: pointer;
    transition: 0.2s;
  }

  .add-widget-card:hover {
    background: #efefef;
    border-color: #40b8af;
    color: #40b8af;
  }

  .vue-grid-item {
    display: flex;
  }

  .vue-grid-item > div {
    width: 100%;
    height: 100%
  }

   .vue-grid-item.vue-grid-placeholder {
    background: rgba(64, 184, 175, 0.2);
    border-radius: 14px;
  }

  .vue-grid-item.dragging {
    z-index: 20;
  }

  .vue-grid-item.resizing {
    opacity: 0.9;
  }

  /*widgetbibliotek*/
  .widget-library {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
  }

  .library-widget {
    width: 600px;
    max-width: 90%;
    background: white;
    border-radius: 18px;
    padding: 20px;
  }

  .library-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .close-library {
    border: none;
    background: none;
    font-size: 1.2em;
    cursor: pointer;
  }

  .widget-option {
    border: 1px solid #dcdcdc;
    background-color: #f7f7f7;
    padding: 16px;
    margin-bottom: 15px;
    border-radius: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
    transition: 0.2s;
  }

  .widget-option:hover {
    border-color: #40b8af;
    background: #eefcf9;
  }

  .widget-option.added{
    opacity: 0.6;
    background: #ececec;
  }

  .widget-option h4 {
    margin-bottom: 4px;
    font-size: 1em;
  }

  .widget-option p {
    font-size: 0.9em;
    color: #4a4a4a;
    line-height: 1.4;
  }

  .add-widget-btn {
    border: none;
    background-color: #003D4F;
    color: white;
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    min-width: 90px;
  }

  .add-widget-btn:disabled {
    background: #008A40;
    opacity: 1;
    color: white;
    cursor: not-allowed;
  }
</style>