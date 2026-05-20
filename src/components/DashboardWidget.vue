<!--komponent för att kunna fälla ihop widget i mobilläge, wrappas runt komponenter i vyn-->
<template>
    <div class="box dashboard-widget is-flex is-flex-direction-column" 
        :style="{
            '--widget-color': props.color, 
            '--widget-text': props.textColor,
            '--widget-accent': props.accent}">

        <!--header-->
          <button class="widget-header is-flex is-justify-content-space-between is-align-items-center pb-4" @click="toggleWidget">
            <h3 class="widget-header-title">{{ title }}</h3>

            <!--mobil badge-->
            <span v-if="props.mobileBadge && isMobile" class="mobile-badge ml-4">
              {{ props.mobileBadge }}
            </span>
            <span class="arrow" :class="{open: isOpen}">&gt;</span>
          </button>

          <!--innehåll-->
          <div v-show="isOpen || !isMobile" class="widget-content">
            <slot></slot>
          </div>
    </div>
</template>

<script setup>
  import { ref, onMounted, onUnmounted } from 'vue';

  //props till komponent 
  const props = defineProps({
    title: String,
    color: {type: String, default: "#ffffff"},
    textColor: {type: String, default: "#4A4A4A"},
    accent: {type: String, default: "transparent"},
    mobileBadge: String
  });

  const isMobile = ref(false);
  const isOpen = ref(false);

  //kollar att det är mobilläge
  const checkScreen = () => {
    isMobile.value = window.innerWidth <= 768;
  }

  onMounted(() => {
    checkScreen();
    window.addEventListener('resize', checkScreen);
  });

  onUnmounted(() => {
    window.removeEventListener('resize', checkScreen);
  })

  //toggla mellan öppen och stängd
  const toggleWidget = () => {
    if(isMobile.value) {
        isOpen.value = !isOpen.value;
    }
  }
</script>

<!--kompletterande styling-->
<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .dashboard-widget {
        background: var(--widget-color);
        border-left: 8px solid var(--widget-accent);
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        overflow: hidden;
        height: 100%
    }

    .widget-header {
        width: 100%;
        background: none;
        border: none;
        cursor: pointer;
    }

    .widget-header-title {
        font-size: $widget-title-size;
        margin: 0;
        font-weight: $widget-title-weight;
        color: var(--widget-text);
    }

    .mobile-badge {
      font-size: 0.9em;
      font-weight: $widget-title-weight;
      color: var(--widget-text);
    }

    .arrow {
        font-size: 1.4em;
        color: $text-secondary;
        transition: transform 0.2s ease;
        transform: rotate(0deg);

        &.open {
            transform: rotate(90deg);
        }
    }

    //desktop
    @media (min-width: 769px) {
        .arrow {
            display: none;
        }

        .widget-header {
            cursor: default;
        }
    }
</style>