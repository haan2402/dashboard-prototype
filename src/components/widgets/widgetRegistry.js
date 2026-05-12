import AssignedToMe from "./AssignedToMe.vue";
import AttentionRequired from "./AttentionRequired.vue";
import BillingChart from "./BillingChart.vue";
import LineChart from "./LineChart.vue";
import NoticeBoard from "./NoticeBoard.vue";
import Planning from "./Planning.vue";
import RecentlyVisited from "./RecentlyVisited.vue";
import SystemInfo from "./SystemInfo.vue";
import TimeReport from "./TimeReport.vue";
import Tips from "./Tips.vue";

//titel för varje komponent, till mobilläge samt färger om det är andra färger
export const widgetRegistry = {
    attention: {
        component: AttentionRequired,
        title: "Kräver uppmärksamhet",
        background: "#FFEFF7",
        color: "#B3003C"
    },
    assigned: {
        component: AssignedToMe,
        title: "Tilldelat mig"
    },
    billing: {
        component: BillingChart,
        title: "Fakturering"
    },
    line: {
        component: LineChart,
        title: "Debiteringsgrad"
    },
    notice: {
        component: NoticeBoard,
        title: "Anslagstavla"
    },
    planning: {
        component: Planning,
        title: "Planering"
    },
    recently: {
        component: RecentlyVisited,
        title: "Senast besökta"
    },
    system: {
        component: SystemInfo,
        title: "Systeminfo",
        accent: "#34565F"
    },
    time: {
        component: TimeReport,
        title: "Tidrapportering"
    },
    tips: {
        component: Tips,
        title: "Tips",
        accent: "#93136B"
    }
}