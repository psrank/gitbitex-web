<template lang="jade">
</template>

<script lang="ts">
    import Vue from 'vue';
    import {Route} from "../BasePage";

    @Route('/', require('./home.jade')())
    export class HomePage extends Vue {

        mounted() {
            super.mounted();
            this.pageLoadingHide();
            this.setTitle('Gitbitex | Digital Asset Exchange');
        }

    }

</script>
