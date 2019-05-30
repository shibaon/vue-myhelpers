import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
    protected cols: Array<[string|null, string]> = [['id', '#'], ['name', 'Add columns!!!']]
    protected count = 0
    protected limit = 10
    protected page = 0
    protected filter: { [key: string]: any } = {}
    protected order: [string, 'asc'|'desc'] = ['id', 'desc']

    get pages() {
        return Math.ceil(this.count / this.limit)
    }
    get offset() {
        return this.limit * this.page
    }

    public created() {
        this.page = this.$route.query.page ? parseInt(this.$route.query.page as string, 10) : 0
        this.filter = this.$route.query.filter ? JSON.parse(this.$route.query.filter as string) : {}
        this.order = [this.$route.query.ob ? this.$route.query.ob as string : 'id', this.$route.query.od === 'asc' ? 'asc' : 'desc']
        this.updateQuery()
    }

    @Watch('page')
    @Watch('filter', { deep: true })
    @Watch('order')
    public updateQuery() {
        this.$router.replace({ path: this.$route.path, query: { ob: this.order[0], od: this.order[1], page: this.page, filter: JSON.stringify(this.filter) } } as any)
    }
}
