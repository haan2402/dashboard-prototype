<script setup>
</script>

<!--topp-info-->
<template>
    <div class="info-bar mb-4">
        
        <div class="level-left left-group  is-flex is-align-items-cente">
            <div class="company-box box is-flex is-align-items-center">
                Demoföretaget

                <span class="avatar tag is-rounded is-flex is-justify-content-center is-align-items-cente">HA</span>
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
        gap: 10px;
        padding: 40px 50px 40px 50px;
        color: var(--text-primary);
        background-color: var(--topbar-info-bg);
    }

    .avatar {
        position: absolute;
        top: -10px;
        right: -10px;
        width: 60px;
        height: 60px;
        font-size: 1.5em;
        font-weight: var(--font-weight-secondary);
        background-color: var(--topbar-info-avatar);
        color: var(--topbar-info-avatar-text);
    }

    .left-group {
        gap: 16px;
    }

    .greeting {
        color: var(--topbar-info-text);
        font-size: 1.6em;
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