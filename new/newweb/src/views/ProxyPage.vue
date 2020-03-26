<template lang="jade">
    div.page Jumping...
</template>

<script lang="ts">
import Vue from "vue";
import { RawLocation } from "vue-router";

//@Route('/proxy', require('./proxy/proxy.jade')())
export class ProxyPage extends Vue {
  mounted() {
    this.$router.replace(this.$route.query.href as RawLocation);
  }
}
</script>
