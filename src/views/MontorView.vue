<script setup>
import TopInfoBar from '@/components/TopInfoBar.vue';
import TimeReport from '@/components/widgets/TimeReport.vue';
</script>

<!--vy för montörer-->
<template>
  <TopInfoBar />

  <div class="columns is-multiline">

  <div class="column is-4">
    <TimeReport />
  </div>

</div>
</template>

<style scoped></style>