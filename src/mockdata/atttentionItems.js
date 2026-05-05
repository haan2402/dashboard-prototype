//mockdata för kräver uppmärksamhet, används i komponenten AttentionRequired.vue

export const attentionItems = {
    montor: [
        {
        id: 1,
        text: "3 ej avslutade ordrar",
        color: "#B3003D",
        icon: "fas fa-file-lines"
    }
    ],
    admin: [
        {
        id: 1,
        text: "8 ej avslutade ordrar",
        color: "#B3003D",
        icon: "fas fa-file-lines"
    },
    {
        id: 2,
        text: "5 saknar tid föregående vecka",
        color: "#39378E",
        icon: "fas fa-clock"
    },
    {
        id: 3,
        text: "4 EDI-ordrar som inte kunde kopplas automatiskt",
        color: "#003D4F",
        icon: "fas fa-envelope"
    },
    {
        id: 4,
        text: "3 abonnemang att fakturera",
        color: "#93136B",
        icon: "fas fa-repeat"
    },
    {
        id: 5,
        text: "5 säljmöjligheter",
        color: "#00606B",
        icon: "fas fa-filter"
    },
    {
        id: 6,
        text: "2 att attestera",
        color: "#005EA7",
        icon: "fas fa-file-invoice-dollar"
    },
]
}