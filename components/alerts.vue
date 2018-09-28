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

<script>
import Vue from 'vue'

const component = Vue.extend({
    props: ['value'],
    data() {
        return { alerts: this.value ? this.value : this.$alerts, counter: 0 }
    },
    watch: {
        value() {
            this.alerts = this.value
        },
        alerts() {
            for (const alert of this.alerts) {
                if (alert.initialized) {
                    continue
                }
                alert.initialized = true
                setTimeout(() => {
                    this.close(alert)
                }, 10000)
            }
        },
    },
    methods: {
        remove(alert) {
            this.alerts.splice(this.alerts.indexOf(alert), 1)
            this.$emit('input', this.alerts)
        },
        close(alert) {
            alert.hidding = true
            this.$set(this.alerts, this.alerts.indexOf(alert), alert)
            setTimeout(() => {
                this.remove(alert)
            }, 1000)
        }
    },
})

export default component
export function install(Vue) {
    Vue.prototype.$alerts = []
    Vue.prototype.$addAlert = function(type, text) {
        if (!this.$alerts.find(item => item.type === type && item.text === text)) {
            this.$alerts.push({type, text})
        }
    }
    Vue.component('alerts', component)
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
