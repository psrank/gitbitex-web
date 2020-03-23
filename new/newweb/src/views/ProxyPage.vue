<template lang="jade">
    div.page Jumping...
</template>

<script lang="ts">

    import Vue from 'vue';
    import {Route} from "./BasePage";

    //@Route('/proxy', require('./proxy/proxy.jade')())
    export class ProxyPage extends Vue {
        mounted() {
            this.$router.replace(this.$route.query.href);
        }

    }

</script>
