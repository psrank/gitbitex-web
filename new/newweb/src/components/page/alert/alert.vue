<template lang="jade">
    div.page-alert
        div.content
            div.title {{title}}
            div.text {{content}}
            div.btns
                button.cancel(@click='cancel', v-if='cancelText') {{cancelText}}
                button.submit(@click='submit')  {{submitText}}
</template>

<script lang="ts">


    import {Dom, Emit, Prop} from "./../../component";
    import {Vue} from 'vue-property-decorator'


    @Dom('page-alert', require('./alert.jade')())
    export class PageAlertComponent extends Vue {

        @Prop()
        title: string;

        @Prop()
        content: string;

        @Prop()
        cancelText: string;

        @Prop()
        submitText: string;

        mounted() {
            super.mounted();
        }

        @Emit('cancelEvent')
        cancel() {
        }

        @Emit('submitEvent')
        submit() {
        }

    }
</script>
