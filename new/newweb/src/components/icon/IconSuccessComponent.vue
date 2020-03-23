<template lang="jade">
    div.icon-success
        div.animate
            span.sa-line.sa-tip.animateSuccessTip
            span.sa-line.sa-long.animateSuccessLong
        div.animate-before
            div.circle
</template>

<script lang="ts">

    import {Dom} from "../component";
    import {Component, Vue} from 'vue-property-decorator'

    @Dom('icon-success', require('./success/success.jade')())
    @Component
    export class IconSuccessComponent extends Vue {

        mounted() {
            super.mounted();
        }

    }
</script>
