<template lang="jade">
    div.page-loading
        span.spinner
</template>

<script lang="ts">

    //import {Dom} from "../component";
    import {Component, Vue, Emit, Prop} from 'vue-property-decorator'

    //@Dom('page-loading', require('./loading/loading.jade')())
    @Component
    export class PageLoadingComponent extends Vue {

        // mounted() {
        //     super.mounted();
        // }

    }
</script>
