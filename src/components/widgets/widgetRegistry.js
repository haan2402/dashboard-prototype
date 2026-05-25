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
        background: "var(--attention-primary)",
        color: "var(--text-attention)",
        mobileBadge: "2 aktiva",
        defaultOpen: false
    },
    assigned: {
        component: AssignedToMe,
        title: "Tilldelat mig",
        defaultOpen: true
    },
    billing: {
        component: BillingChart,
        title: "Fakturering",
        defaultOpen: false
    },
    line: {
        component: LineChart,
        title: "Debiteringsgrad",
        defaultOpen: false
    },
    notice: {
        component: NoticeBoard,
        title: "Anslagstavla",
        mobileBadge: "2 inlägg",
        defaultOpen: false
    },
    planning: {
        component: Planning,
        title: "Planering",
        defaultOpen: true
    },
    recently: {
        component: RecentlyVisited,
        title: "Senast besökta",
        defaultOpen: false
    },
    system: {
        component: SystemInfo,
        title: "Systeminfo",
        accent: "#34565F",
        mobileBadge: "v3.2.99",
        defaultOpen: false
    },
    time: {
        component: TimeReport,
        title: "Tidrapportering",
        defaultOpen: false
    },
    tips: {
        component: Tips,
        title: "Tips",
        accent: "#93136B",
        defaultOpen: false
    }
}