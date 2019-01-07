<template>
    <div class="imageField">
        <div class="imageContaner" v-if="fileUrl && isImage">
            <div class="icWrapper">
                <i class="icRemove fas fa-trash" @click="remove" title="Удалить"></i>
                <img :src="fileUrl" />
            </div>
        </div>
        <div class="fileContainer" v-else-if="fileUrl">
            <a class="filename" :href="fileUrl" target="_blank" title="Удалить">{{ fileUrl.split('/').slice(-1)[0] }}</a>
            <i class="icRemove fas fa-trash" @click="remove"></i>
        </div>
        <input type="file" :accept="imageOnly ? 'image/*' : false" >
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop({ default: null })
    private value!: string|null
    @Prop({ default: false })
    private imageOnly!: boolean
    private fileUrl = this.value

    @Watch('value')
    private onValueChange() {
        this.fileUrl = this.value
    }

    private get isImage(): boolean {
        if (!this.fileUrl) {
            return false
        }
        const ext = this.fileUrl.toLowerCase().split('.').slice(-1)[0]

        return ['jpg', 'jpeg', 'png', 'gif'].indexOf(ext) !== -1
    }

    private mounted() {
        this.onValueChange()

        const input = this.$el.getElementsByTagName('input')[0]

        input.onchange = async () => {
            const formData = new FormData()

            formData.append('file', input.files![0])
            
            const result = await fetch('/api/admin/upload', {
                method: 'POST',
                body: formData,
            }).then(result => {
                return result.json()
            })

            this.fileUrl = result.result
            this.$emit('input', this.fileUrl)
        }
    }

    private remove() {
        this.fileUrl = null
        this.$emit('input', this.fileUrl)
    }
}
</script>

<style scoped>
.imageField img {
    max-height: 100px;
    width: auto;
}
.imageContaner {
    margin-bottom: 10px;
}
.imageContaner .icWrapper {
    position: relative;
    display: inline-block;
}
.imageContaner .icRemove {
    background: #fff;
    position: absolute;
    width: 26px;
    height: 26px;
    right: 5px;
    top: 5px;
    color: #f00;
    cursor: pointer;
    transition: color .2s, transform .4s;
    box-sizing: border-box;
    text-align: center;
    line-height: 26px;
    border-radius: 13px;
}
.imageContaner .icRemove:hover {
    color: #000;
    transform: rotate(360deg) scale(1.4);
}
.fileContainer .icRemove {
    margin-left: 10px;
    color: #f00;
    cursor: pointer;
    transition: color .2s, transform .4s;
}
.fileContainer .icRemove:hover {
    color: #000;
    transform: rotate(360deg) scale(1.4);
}
</style>
