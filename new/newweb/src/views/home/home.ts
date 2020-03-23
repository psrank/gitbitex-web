<template lang="jade">
    </template>

    <script lang="ts">

import { Page, Route } from "../Page.vue";

@Route('/', require('./home.jade')())
export class HomePage extends Page {

    mounted() {
        super.mounted();
        this.pageLoadingHide();
        this.setTitle('Gitbitex | Digital Asset Exchange');
    }

}
</script>