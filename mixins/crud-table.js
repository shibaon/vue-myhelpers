export default {
    data() {
        return {
            cols: [['id', '#'], ['name', 'Add columns!!!']],
            count: 0,
            limit: 10,
            page: 0,
            filter: {},
            order: ['id', 'desc'],
            page: this.$route.query.page ? parseInt(this.$route.query.page, 10) : 0,
            filter: this.$route.query.filter ? JSON.parse(this.$route.query.filter) : {},
            order: [this.$route.query.ob ? this.$route.query.ob : 'id', this.$route.query.od ? this.$route.query.od : 'desc'],
        }
    },
    computed: {
        pages() {
            return Math.ceil(this.count / this.limit)
        },
    },
    watch: {
        order: 'updateQuery',
        page: 'updateQuery',
        filter: 'updateQuery',
    },
    async created() {
        this.updateQuery()  
    },
    methods: {
        updateQuery() {
            this.$router.push({ path: this.$route.path, query: { ob: this.order[0], od: this.order[1], page: this.page, filter: JSON.stringify(this.filter) } })
        },
    }
}
