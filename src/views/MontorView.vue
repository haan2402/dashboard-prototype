<script setup>
import DashboardWidget from '@/components/DashboardWidget.vue';
import TopInfoBar from '@/components/TopInfoBar.vue';
import AssignedToMe from '@/components/widgets/AssignedToMe.vue';
import AttentionRequired from '@/components/widgets/AttentionRequired.vue';
import NoticeBoard from '@/components/widgets/NoticeBoard.vue';
import Planning from '@/components/widgets/Planning.vue';
import RecentlyVisited from '@/components/widgets/RecentlyVisited.vue';
import SystemInfo from '@/components/widgets/SystemInfo.vue';
import TimeReport from '@/components/widgets/TimeReport.vue';
import { widgetRegistry } from '@/components/widgets/widgetRegistry';

const user = {
  role: "montor"
}
</script>

<!--vy för montörer-->
<template>
  <TopInfoBar />

  <div class="dashboard-layout">

    <div class="dashboard-column">
      <div class="widget">
        <DashboardWidget :title="widgetRegistry.time.title">
        <TimeReport />
        </DashboardWidget>
      </div>

      <div class="widget">
        <DashboardWidget :title="widgetRegistry.planning.title">
        <Planning />
        </DashboardWidget>
      </div>

      <div class="widget">
        <DashboardWidget :title="widgetRegistry.recently.title">
        <RecentlyVisited />
        </DashboardWidget>
      </div>
    </div>

    <div class="dashboard-column">
      <div class="widget">
        <DashboardWidget :title="widgetRegistry.attention.title" :color="widgetRegistry.attention.background" :textColor="widgetRegistry.attention.color">
        <AttentionRequired role="montor" />
        </DashboardWidget>
      </div>

      <div class="widget">
        <DashboardWidget :title="widgetRegistry.assigned.title">
        <AssignedToMe />
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