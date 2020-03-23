<template lang="jade">
    div.page-loading
        span.spinner
</template>

<script lang="ts">


    import {Dom} from "../../component";
    import {Vue} from 'vue-property-decorator'

    @Dom('page-loading', require('./loading.jade')())
    export class PageLoadingComponent extends Vue {

        mounted() {
            super.mounted();
        }

    }
</script>
