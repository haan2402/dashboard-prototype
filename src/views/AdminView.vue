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
      <DashboardWidget :title="widgetRegistry.attention.title" :color="widgetRegistry.attention.background" :textColor="widgetRegistry.attention.color">
        <AttentionRequired role="admin" :is="widgetRegistry.attention.component" />
      </DashboardWidget>
     </div>

      <div class="widget">
        <DashboardWidget :title="widgetRegistry.recently.title">
        <RecentlyVisited />
        </DashboardWidget>
      </div>

      <div class="widget">
        <DashboardWidget :title="widgetRegistry.line.title">
        <LineChart />
        </DashboardWidget>
      </div>
    </div>

    <div class="dashboard-column">
      <div class="widget">
        <DashboardWidget :title="widgetRegistry.tips.title" :accent="widgetRegistry.tips.accent">
        <Tips />
        </DashboardWidget>
      </div>

      <div class="widget">
        <DashboardWidget :title="widgetRegistry.planning.title">
        <Planning />
        </DashboardWidget>
      </div>

      <div class="widget">
        <DashboardWidget :title="widgetRegistry.billing.title">
        <BillingChart />
        </DashboardWidget>
      </div>
    </div>

    <div class="dashboard-column">
      <div class="widget">
        <DashboardWidget :title="widgetRegistry.system.title" :accent="widgetRegistry.system.accent">
        <SystemInfo />
        </DashboardWidget>
      </div>

      <div class="widget">
        <DashboardWidget :title="widgetRegistry.notice.title">
        <NoticeBoard :isAdmin="user.role === 'admin'" />
        </DashboardWidget>
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