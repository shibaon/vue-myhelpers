<template>
    <div class="alerts">
        <div v-for="alert in alerts" v-bind:key=alert.id
            :class="['alert', 'alert-' + alert.type, alert.hidding ? 'hidding' : '']"
        >
            {{ alert.text }}
            <button type="button" class="close" title="Закрыть" v-on:click="close(alert)">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import Vue, { VueConstructor } from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

export declare interface IAlert {
    id: number
    type: string
    text: string
    initialized?: boolean
    hidding?: boolean
}

declare module 'vue/types/vue' {
    interface Vue { 
        $alerts: IAlert[]
        $addAlert: (type: string, text: string) => void
    }
}

@Component
export default class Alerts extends Vue {
    @Prop()
    private value!: IAlert[]
    private alerts: IAlert[] = []

    @Watch('value', { immediate: true })
    public onValueChange() {
        this.alerts = this.value ? this.value : this.$alerts
    }

    public static install(Vue: VueConstructor) {
        Vue.prototype.$alerts = []
        Vue.prototype.$addAlert = function(this: Vue, type: string, text: string) {
            if (!this.$alerts.find((item: IAlert) => item.type === type && item.text === text)) {
                this.$alerts.push({ id: Math.random() * 10000000, type, text})
            }
        }
        Vue.component('alerts', Alerts)
    }

    @Watch('alerts')
    private onAlertsChanged() {
        for (const alert of this.alerts) {
            if (alert.initialized) {
                continue
            }
            alert.initialized = true
            setTimeout(() => {
                this.close(alert)
            }, 10000)
        }
    }

    private remove(alert: IAlert) {
        this.alerts.splice(this.alerts.indexOf(alert), 1)
        this.$emit('input', this.alerts)
    }

    private close(alrt: IAlert) {
        alrt.hidding = true
        this.$set(this.alerts, this.alerts.indexOf(alrt), alrt)
        setTimeout(() => {
            this.remove(alrt)
        }, 1000)
    }
}
</script>

<style scoped>
.alert {
    opacity: 1;
    margin-top: 0;
}
.alert.hidding {
    opacity: 0;
    margin-top: -65px;
    transition: margin-top 1s, opacity 1s;
}
</style>
