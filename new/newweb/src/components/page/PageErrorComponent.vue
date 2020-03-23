<template lang="jade">
    div.page-error {{content}}
</template>

<script lang="ts">

    //import {Dom, Prop} from "../component";
    import {Component, Vue, Emit, Prop} from 'vue-property-decorator'

    //@Dom('page-error', require('./error/error.jade')())
    @Component
    export class PageErrorComponent extends Vue {

        @Prop()
        content: string;

        // mounted() {
        //     super.mounted();
        // }
    }
</script>
