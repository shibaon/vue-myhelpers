import { Vue, Component } from 'vue-property-decorator'

@Component({
    watch: {
        order: 'updateQuery',
        page: 'updateQuery',
        filter: 'updateQuery',
    },
})
export default class extends Vue {
    protected cols: Array<[string, string]> = [['id', '#'], ['name', 'Add columns!!!']]
    protected count = 0
    protected limit = 10
    protected page = this.$route.query.page ? parseInt(this.$route.query.page, 10) : 0
    protected filter: { [key: string]: any } = this.$route.query.filter ? JSON.parse(this.$route.query.filter) : {}
    protected order: [string, 'asc'|'desc'] = [this.$route.query.ob ? this.$route.query.ob : 'id', this.$route.query.od === 'asc' ? 'asc' : 'desc']

    get pages() {
            return Math.ceil(this.count / this.limit)
    }

    public created() {
        this.updateQuery()
    }

    public updateQuery() {
        this.$router.push({ path: this.$route.path, query: { ob: this.order[0], od: this.order[1], page: this.page, filter: JSON.stringify(this.filter) } } as any)
    }
}
