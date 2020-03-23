<template lang="jade">
    div.page-error {{content}}
</template>

<script lang="ts">


    import {Dom, Prop} from "../component";
    import {Vue} from 'vue-property-decorator'

    @Dom('page-error', require('./error/error.jade')())
    export class PageErrorComponent extends Vue {

        @Prop()
        content: string;

        mounted() {
            super.mounted();
        }
    }
</script>
