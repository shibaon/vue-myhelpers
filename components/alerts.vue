<template>
    <div class="alerts">
        <div v-for="alert in alerts" v-bind:key="alert.type + alert.text"
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

interface IAlert {
    type: string
    text: string
    initialized?: boolean
    hidding?: boolean
}

/**
 * Declaration for d.ts file
 * 
 * declare module 'vue/types/vue' {
 *     interface Vue {
 *         $alerts: Array<{ type: string, text: string, initialized?: boolean }>
 *         $addAlert: (type: string, text: string) => void
 *     }
 * }
 */

@Component
export default class Alerts extends Vue {
    @Prop()
    private value: Array<IAlert> = []
    private alerts = this.value

    public created() {
        this.onAlertsChanged()
    }

    @Watch('value')
    private onValueChanged() {
        this.alerts = this.value
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

    private close(alert: IAlert) {
        alert.hidding = true
        this.$set(this.alerts, this.alerts.indexOf(alert), alert)
        setTimeout(() => {
            this.remove(alert)
        }, 1000)
    }
}

export function install(Vue: VueConstructor) {
    Vue.prototype.$alerts = []
    Vue.prototype.$addAlert = function(type: string, text: string) {
        if (!this.$alerts.find((item: IAlert) => item.type === type && item.text === text)) {
            this.$alerts.push({type, text})
        }
    }
    Vue.component('alerts', Alerts)
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
