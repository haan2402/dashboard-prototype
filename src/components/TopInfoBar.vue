<script setup>
</script>

<!--topp-info-->
<template>
    <div class="info-bar mb-4">
        
        <div class="level-left left-group">
            <div class="company-box box">
                Demoföretaget

                <span class="avatar tag is-rounded">HA</span>
            </div>

            <div class="greeting">
                God förmiddag, Hanna!
            </div>
        </div>
        </div>
</template>

<style scoped>
    .company-box {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 40px 50px 40px 50px;
        color: #4A4A4A;
        background-color: white;
        font-weight: 500;
    }

    .avatar {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
        font-weight: 700;
        background-color: #EBF2F4;
        color: #4A4A4A;
    }

    .left-group {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .greeting {
        color: #4A4A4A;
        font-size: 30px;
    }

    @media screen and (max-width: 768px) {
        .left-group {
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 10px;
        }
    }
</style>