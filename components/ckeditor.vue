<template>
    <div class="ckeditor"><textarea :id="id" :value="value"></textarea></div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class extends Vue {
    @Prop()
    private value!: string
    @Prop({ default: 'editor' })
    private id!: string
    @Prop({ default: 300 })
    private height!: number
    @Prop({ default: () => [
        { name: 'document', groups: [ 'mode', 'document', 'doctools' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
        { name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { name: 'forms', groups: [ 'forms' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        '/',
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'tools', groups: [ 'tools' ] },
        { name: 'others', groups: [ 'others' ] },
        { name: 'about', groups: [ 'about' ] },
    ] })
    private toolbarGroups!: Array<{ name: string, groups: string[] }>
    @Prop({ default: 'Save,NewPage,Preview,Print,Templates,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField' })
    private removeButtons!: string
    @Prop({ default: 'en' })
    private language!: string
    @Prop({ default: '' })
    private extraplugins!: string
    private instance: any

    public beforeUpdate() {
        if (this.value !== this.instance.getData()) {
            this.instance.setData(this.value)
        }
    }

    public mounted() {
        const ckeditorConfig = {
            toolbarGroups: this.toolbarGroups,
            removeButtons: this.removeButtons,
            language: this.language,
            height: this.height,
            extraPlugins: this.extraplugins
        }
        this.instance = CKEDITOR.replace(this.id, ckeditorConfig)
        this.instance.setData(this.value)
        setTimeout(() => {
            this.instance.setData(this.value)
        }, 200)
        this.instance.on('change', () => {
            let ckeditorData = CKEDITOR.instances[this.id].getData()

            if (ckeditorData !== this.value) {
                this.$emit('input', ckeditorData)
            }
        })
    }

    public beforeDestroy() {
        this.instance.destroy(true)
    }
}
</script>
