<script setup>
import TopInfoBar from '@/components/TopInfoBar.vue';
import AttentionRequired from '@/components/widgets/AttentionRequired.vue';
import BillingChart from '@/components/widgets/BillingChart.vue';
import LineChart from '@/components/widgets/LineChart.vue';
import NoticeBoard from '@/components/widgets/NoticeBoard.vue';
import Planning from '@/components/widgets/Planning.vue';
import RecentlyVisited from '@/components/widgets/RecentlyVisited.vue';
import SystemInfo from '@/components/widgets/SystemInfo.vue';
import TimeReport from '@/components/widgets/TimeReport.vue';
import Tips from '@/components/widgets/Tips.vue';

const user = {
  role: "admin"
}
</script>

<!--vy för admin/ekonomi-->
<template>
  <TopInfoBar />

  <div class="dashboard-layout">

    <div class="dashboard-column">
      <div class="widget">
        <AttentionRequired role="admin" />
      </div>

      <div class="widget">
        <RecentlyVisited />
      </div>

      <div class="widget">
        <LineChart />
      </div>
    </div>

    <div class="dashboard-column">
      <div class="widget">
        <Tips />
      </div>

      <div class="widget">
        <Planning />
      </div>

      <div class="widget">
        <BillingChart />
      </div>
    </div>

    <div class="dashboard-column">
      <div class="widget">
        <SystemInfo />
      </div>

      <div class="widget">
        <NoticeBoard :isAdmin="user.role === 'admin'" />
      </div>
    </div>

</div>
</template>

<style scoped>
  .dashboard-layout {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    align-items: start;
  }

  .dashboard-column {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  
  @media (max-width: 1024px) {
    .dashboard-layout {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .dashboard-layout {
      grid-template-columns: 1fr;
    }    
  }
</style>