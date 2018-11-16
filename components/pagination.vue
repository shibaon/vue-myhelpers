<template>
<ul class="pagination pagination-sm">
    <li :class="['page-item', page === 0 ? 'disabled' : '']" @click.prevent="page = 0"><button class="page-link">«</button></li>
    <li :class="['page-item', page === 0 ? 'disabled' : '']" @click.prevent="page = Math.max(0, page - 1)"><button class="page-link">&lt;</button></li>
    <li :class="['page-item', 'active']" @click.prevent=""><button disabled class="page-link">Page {{ page + 1 }} of {{ pages }}</button></li>
    <li :class="['page-item', page === pages - 1 ? 'disabled' : '']" @click.prevent="page = Math.min(pages - 1, page + 1)"><button class="page-link">&gt;</button></li>
    <li :class="['page-item', page === pages - 1 ? 'disabled' : '']" @click.prevent="page = pages - 1"><button class="page-link">»</button></li>
</ul>
</template>

<script lang="ts">
import { Vue, Prop, Component, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop()
    private value
    @Prop()
    private pages: number
    private page: number = this.value

    @Watch('value')
    public onValueChange() {
        this.page = this.value
    }
    @Watch('page')
    public onPageChange() {
        this.$emit('input', this.page)
    }
}
</script>
