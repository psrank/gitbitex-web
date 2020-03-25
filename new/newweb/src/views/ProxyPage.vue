<template lang="jade">
    div.page Jumping...
</template>

<script lang="ts">
import Vue from "vue";

//@Route('/proxy', require('./proxy/proxy.jade')())
export class ProxyPage extends Vue {
  mounted() {
    this.$router.replace(this.$route.query.href);
  }
}
</script>
