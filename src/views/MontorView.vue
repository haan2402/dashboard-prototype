<script setup>
import TopInfoBar from '@/components/TopInfoBar.vue';
import NoticeBoard from '@/components/widgets/NoticeBoard.vue';
import RecentlyVisited from '@/components/widgets/RecentlyVisited.vue';
import SystemInfo from '@/components/widgets/SystemInfo.vue';
import TimeReport from '@/components/widgets/TimeReport.vue';

const user = {
  role: "montor"
}
</script>

<!--vy för montörer-->
<template>
  <TopInfoBar />

  <div class="columns is-multiline">

  <div class="column is-4">
    <TimeReport />
  </div>

  <div class="column is-4">
    <SystemInfo />
  </div>


  <div class="column is-4">
    <NoticeBoard :isAdmin="user.role === 'admin'" />
  </div>


  <div class="column is-4">
    <RecentlyVisited />
  </div>
</div>
</template>

<style scoped></style>