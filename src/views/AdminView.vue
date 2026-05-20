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

//för att kunna spara olika layouter för olika vyer, för att kunna spara olika vyer
const storageKey = `dashboard-layout-${user.role}`
const versionKey = `version-layout-${user.role}`

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
  {x: 0, y: 4, w: 4, h: 8, i: 'recently', type: 'recently', static: false},
  {x: 4, y: 4, w: 4, h: 8, i: 'planning', type: 'planning', static: false},
  {x: 8, y: 4, w: 4, h: 9, i: 'notice', type: 'notice', static: true},
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

  const savedVersion = localStorage.getItem(versionKey);
  const saved = localStorage.getItem(storageKey);

  if(saved && savedVersion === layoutVersion) {
    const parsedLayout = JSON.parse(saved);

    layout.value = parsedLayout.filter(item => widgetMaps[item.type]);
  } else {
    layout.value = defaultLayout.map(item => ({...item}));
  }
});

//sparar användarens nuvarande layout i localStorage, och avslutar redigeringsläget 
function saveLayout () {
  localStorage.setItem(storageKey, JSON.stringify(layout.value));
  localStorage.setItem(versionKey, layoutVersion);
  isEditing.value = false;
}

//återställer dashboarden till standardlayout och tar bort sparad layout från localStorage 
function resetLayout () {
  layout.value = defaultLayout.map(item => ({...item}));
  localStorage.removeItem(storageKey)
  localStorage.removeItem(versionKey)
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
  <div class="top-section is-flex is-justify-content-space-between is-align-items-center">
    <TopInfoBar />

    <!--anpassa knapp (alltid synlig - ej på mobil)-->
    <div v-if="!isMobile" class="edit-toolbar is-flex">
      <button class="edit-btn" :class="{active: isEditing}" @click="isEditing = !isEditing">
        {{ isEditing ? 'Avsluta' : 'Anpassa' }}
      </button>
    </div>
  </div>

    <!--redigeringsbanner-->
  <div v-if="isEditing && !isMobile" class="edit-banner is-flex is-justify-content-space-between mb-5 p-5">
    <div class="edit-info">
      <h3>Redigeringsläge aktivt</h3>
      <p>Flytta, ändra storlek eller lägg till widgets. Vissa widgets är låsta och kan inte ändras.</p>
    </div>

    <div class="edit-actions is-flex">
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
<div v-else class="mobile-stack is-flex is-flex-direction-column">
  <div v-for="item in layout" :key="item.i">
    <DashboardWidget
      :title="widgetRegistry[item.type].title"
      :accent="widgetRegistry[item.type].accent"
      :color="widgetRegistry[item.type].background"
      :textColor="widgetRegistry[item.type].color"
      :mobileBadge="widgetRegistry[item.type].mobileBadge"
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
<div v-if="isEditing && !isMobile" class="add-widget-card is-flex is-justify-content-center is-align-items-center mt-5" @click="showWidgets = true">
  + Lägg till widget
</div>

<div v-if="showWidgets && !isMobile" class="widget-library is-flex is-justify-content-center is-align-items-center">
  <div class="library-widget p-5">

    <div class="library-header is-flex is-justify-content-space-between is-align-items-flex-start mb-5">
      <div class="library-title">
      <h3 class="mb-3">Välj widget</h3>
      <p class="mb-2">Klicka på en widget för att lägga till den.</p>
      </div>
      <button class="close-library is-flex is-justify-content-center is-align-items-center" @click="showWidgets = false">
        X
      </button>
    </div>

    <div v-for="widget in availableWidgets" 
        :key="widget.type" 
        class="widget-option is-flex is-justify-content-space-between is-align-items-center mb-3 p-4" 
        :class="{ added: widgetExists(widget.type) }">
      <div class="widget-option-content">
        <h4 class="mb-1">{{ widget.title }}</h4>
        <p>{{ widget.description }}</p>
      </div>
      <button class="add-widget-btn" :disabled="widgetExists(widget.type)" @click="addWidget(widget.type)">
        {{ widgetExists(widget.type) ? 'Tillagd' : 'Lägg till' }}
      </button>
    </div> 
  </div>
</div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;
  .mobile-stack {
    gap: 15px;
  }

  /*styling redigeringsläge*/
  .edit-banner {
    background-color: $edit-banner-primary;
    border: 2px solid $edit-banner-border;
    border-radius: 14px;
  }

  .edit-banner h3 {
    font-size: 1.1em;
  }

  .edit-actions {
    gap: 12px;
  }

  .edit-btn,
  .primary-btn,
  .secondary-btn {
    border: none;
    border-radius: 10px;
    padding: 8px 15px;
    font-weight: $widget-title-weight;
    color: $surface-white;
  }

  .primary-btn {
    background-color: $success;
  }

  .secondary-btn {
    background-color: $time-report-progress;
  }

  .edit-btn {
    background-color: $primary;
  }

  .edit-btn.active {
    background: $delete-primary;
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
    border: 2px dashed $edit-border-color;
    border-radius: 16px;
    pointer-events: none;
  }

  .widget-wrapper.locked {
    opacity: 0.6;
  }
  
  .locked-overlay {
    position: absolute;
    top: 10px;
    right: 10px;
    background: rgba(0,0,0,0.7);
    color: $surface-white;
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
    background-color: $delete-primary;
    color: $surface-white;
    font-weight: $widget-title-weight;
    cursor: pointer;
    z-index: 20;
  }

  .add-widget-card {
    height: 160px;
    border: 2px dashed $add-widget-border;
    background: $add-widget-primary;
    border-radius: 16px;
    color: $text-title;
    font-weight: $widget-title-weight;
    cursor: pointer;
    transition: 0.2s;
  }

  .add-widget-card:hover {
    background: $add-widget-primary;
    border-color: $edit-border-color;
    color: $edit-border-color;
  }

  /*widgetbibliotek*/
  .widget-library {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 999;
  }

  .library-widget {
    width: 600px;
    max-width: 90%;
    background: $text-white;
    border-radius: 18px;
  }

  .library-header {
    gap: 20px;
    border-bottom: 1px solid $text-title;
  }

  .library-title h3 {
    font-size: 1.3em;
    color: $text-title;
    font-weight: $widget-title-weight;
  }

  .library-title p {
    color: $text-primary;
    font-size: 0.9em;
  }

  .close-library {
    border: none;
    background: none;
    font-size: 1.3em;
    cursor: pointer;
  }

  .widget-option {
    border: 1px solid $add-widget-border;
    background-color: $add-widget-primary;
    border-radius: 12px;
    gap: 16px;
    transition: 0.2s;
  }

  .widget-option:hover {
    border-color: $edit-border-color;
  }

  .widget-option.added{
    opacity: 0.6;
  }

  .widget-option h4 {
    font-size: 1em;
  }

  .widget-option p {
    font-size: 0.9em;
    color: $text-title;
  }

  .add-widget-btn {
    border: none;
    background-color: $primary;
    color: $text-white;
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: $widget-title-weight;
    min-width: 90px;
  }

  .add-widget-btn:disabled {
    background: $success;
    opacity: 1;
    color: $text-white;
    cursor: not-allowed;
  }

  @media(max-width: 768px) {
    .top-section {
      justify-content: center !important;
    }
  }
</style>

<style>
.vue-grid-item {
    display: flex;
  }

  .vue-grid-item > div {
    width: 100%;
    height: 100%
  }

  .vue-grid-item.dragging {
    z-index: 20;
  }
  </style>