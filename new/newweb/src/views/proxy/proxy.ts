<template lang="jade">
    </template>

    <script lang="ts">

import { Page, Route } from "../Page.vue";

@Route('/proxy', require('./proxy.jade')())
export class ProxyPage extends Page {

    mounted() {
        this.$router.replace(this.$route.query.href);
    }

}

</script>