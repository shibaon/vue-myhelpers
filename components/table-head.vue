<template>
<thead><tr><th v-for="c in cols" :key="c[0]">
    <a v-if="c[0]" href="" @click.prevent="order = order[0] === c[0] ? ([c[0], order[1] === 'asc' ? 'desc' : 'asc']) : [c[0], order[1]]">{{ c[1] }}
        <template v-if="order[0] === c[0]"><span v-if="order[1] === 'asc'">↓</span><span v-else>↑</span></template>
    </a>
    <template v-else>{{ c[1] }}</template>
</th></tr></thead>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop()
    private value!: [string, 'asc'|'desc']
    @Prop()
    private cols!: Array<[string, string]>
    private order = this.value

    @Watch('order')
    onOrderChange() {
        this.$emit('input', this.order)
    }
}
</script>
