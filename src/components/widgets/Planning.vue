<!--widget för min planering-->
<template>
    <div class="box planning-card">
        <h3 class="widget-title mb-4">
            Min planering - <span class="week-number">Vecka {{ weekNumber }}</span>
        </h3>

        <!--visar rad med knappar för att byta vecka samt veckans datum-->
        <div class="week-row mb-5">
            <button class="nav-btn is-small is-light" @click="previousWeek">&lt;</button>

            <div v-for="(day, index) in weekDays" 
                :key="index" 
                class="day-pill" 
                :class="{
                    active: selectedDay === index, 
                    today: isCurrentWeek && currentDayIndex === index
                    }" 
                    @click="selectedDay =index">

                <div class="day-name">{{ day.day }}</div>
                <div class="day-date">{{ day.dateNumber }}</div>
                <span v-if="day.tasks.length > 0" class="task-dot"></span>
            </div>

            <button class="nav-btn is-small is-light" @click="nextWeek">&gt;</button>
        </div>

        <!--planering dag för dag-->
        <div>
            <div v-if="selectedDayData.tasks.length === 0" class="no-tasks">
                Inget planerat denna dag
            </div>

            <div v-for="(task, i) in selectedDayData.tasks" :key="i" class="task-item">

                <div class="left-bar"></div>

                <div class="task-content">
                <div class="task-title">{{ task.task }}</div>
                <div class="task-address">{{ task.address }}</div>

                <div class="task-footer">
                    <div class="task-coworker">
                    <i :class="task.icon"></i>
                    {{ task.coworker || "Ingen kollega"}}
                    </div>

                    <div class="task-time">{{ task.time }}</div>
                
                </div>
                
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref, computed } from 'vue';
    import { planningItems } from '@/mockdata/planningItems';

    //veckodagar som alltid visas i planeringen
    const days = ["mån", "tis", "ons", "tors", "fre"];

    //hämtar måndag för den vecka som ett datum tillhör
    function getMonday(date) {
        const d = new Date(date);
        const day = d.getDay();

        //beräknar skillnaden till måndag
        const diff = day === 0 ? -6 : 1 - day;      

        //flyttar datumet till veckans måndag
        d.setDate(d.getDate() + diff);   
        
        //nollställer tiden 
        d.setHours(0,0,0,0);                        

        return d;
    }

    //hämtar ISO-veckonummer från ett datum 
    function getWeekNumber(date) {
        const d = new Date(date);
        d.setHours(0,0,0,0);

        //flyttar datumet till torsdag i samma vecka, används i ISO beräkningen 
        d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));

        //Första veckan i året innehålelr alltid fjärde januari
        const weekOne = new Date(d.getFullYear(), 0, 4);

        //räknar ut antal veckor mellan datumen 
        return (
            1 + Math.round(((d - weekOne) / 86400000 - 3 + ((weekOne.getDay() + 6) % 7)) / 7)
        );
    }

    //sparar aktuell veckas måndag 
    const currentMonday = ref(getMonday(new Date()));

    //hämtar dagens datum 
    const today = new Date();

    //hämtar index för dagen veckodag 
    const currentDayIndex = computed(() => {
        const day = today.getDay();

        //döljer markering på helger 
        if(day === 0 || day === 6) {
            return -1;
        }
        return day -1;
    });

    //starta på dagens dag om det är vardag
    const selectedDay = ref(currentDayIndex.value >= 0 ? currentDayIndex.value : 0);

    //hämtar data för veckan
    const weekDays = computed(() => {

        return days.map((dayName, index) => {
            const date = new Date(currentMonday.value);
            date.setDate(date.getDate() + index);

            //skapar nyckel för mockdatan ex 2026-19
            const key = `${date.getFullYear()}-${getWeekNumber(date)}`;
            const weekData = planningItems[key] || {};

            return {
                day: dayName,
                date,
                dateNumber: date.getDate(),
                tasks: weekData[dayName] || []
            }
        });
    });

    //hämtar data för vald dag
    const selectedDayData = computed(() => {
        return weekDays.value[selectedDay.value] || { tasks: []};
    });

    //visar aktuellt veckonummer i UI
    const weekNumber = computed(() => {
        return getWeekNumber(currentMonday.value);
    });

    //kontroll om det är aktuell vecka som visas
    const isCurrentWeek = computed(() => {
        return (
            getWeekNumber(today) === getWeekNumber(currentMonday.value)
            && today.getFullYear() === currentMonday.value.getFullYear()
        );
    });

    //funktioner för att hämta nästa/föregående vecka
    function nextWeek() {
        const next = new Date(currentMonday.value);
        next.setDate(next.getDate() + 7);
        currentMonday.value = next;
        selectedDay.value = 0;
    }

    function previousWeek() {
        const next = new Date(currentMonday.value);
        next.setDate(next.getDate() - 7);
        currentMonday.value = next;
        selectedDay.value = 0;
    }
</script>

<!--kompletterande styling-->
<style scoped lang="scss">
@use "@/assets/styles/_variables.scss" as*;

    .widget-title {
        color: $text-title;
        font-size: $widget-title-size;
        font-weight: $widget-title-weight;
    }

    .week-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .nav-btn {
        font-size: 1.5em;
        padding: 6px 10px;
        margin: 0 8px;
    }

    .day-pill {
        width: 60px;
        flex: none;
        text-align: center;
        padding: 6px 4px;
        border: 1px solid $text-secondary;
        border-radius: 8px;
        cursor: pointer;
        position: relative;
    }

    .day-pill:hover {
        background-color: $secondary;
        border-color: $planner-primary;
    }

    .day-pill.active {
        background-color: $secondary;
        border-color: $planner-primary;
        box-shadow: 0 4px 10px rgba(0,0,0,0.12);
    }

    .day-pill.today {
        border: 2px solid $planner-primary;
    }

    .day-pill.today:after {
        content: "";
        width: 7px;
        height: 7px;
        background-color: $planner-primary;
        border-radius: 50%;
        position: absolute;
        top: 5px;
        right: 5px;
    }

    .day-pill.today.active {
        background-color: $secondary;
        border-color: $planner-primary;
        box-shadow: 0 4px 10px rgba(0,0,0,0.12);
    }

    .day-name {
        font-size: 1em;
        color: $text-primary;
        text-transform: capitalize;
    }

    .day-date {
        font-size: 1em;
        font-weight: $font-weight-secondary;
        color: $text-primary;
    }

    .no-tasks {
        font-size: 0.9em;
        padding: 1em;
    }

    .task-item {
        display: flex;
        background-color: $surface-white;
        margin-top: 10px;
        border-radius: 0 10px 10px 0;
        border: 1px solid $text-secondary;
        overflow: hidden;
    }

    .left-bar {
        width: 5px;
        background-color: $planner-primary;
        flex-shrink: 0;
    }

    .task-content {
        padding: 10px 12px;
        flex: 1;
    }

    .task-title {
        font-weight: $font-weight-secondary;
        color: $text-title;
        font-size: 0.9em;
    }

    .task-address {
        font-size: 0.9em;
        color: $text-primary;
        
    }

    .task-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 8px;

    }

    .task-time {
        background-color: $secondary;
        border: 1px solid $planner-primary;
        padding: 4px 8px;
        border-radius: 12px;
        font-size: 0.9em;
        font-weight: 600;
    }

    .task-coworker {
        display: flex;
        align-items: center;
        gap: 10px;
        color: $text-primary;
        font-size: 0.9em;
    }

    @media (max-width: 1600px) {
        .day-pill {
            width: 45px;
            padding: 4px 2px;
        }

        .day-name,
        .day-date {
            font-size: 0.85em;
        }

        .nav-btn {
            font-size: 1.2em;
            margin: 0 4px;
        }

        .day-pill.today:after {
            width: 5px;
            height: 5px;
        }
    }
</style>