<template lang="jade">
    div(@click='goto')
        slot
</template>

<script lang="ts">
//import {Dom, Prop} from "../component";
import { Component, Vue, Prop } from "vue-property-decorator";

//@Dom('link-proxy', require('./link-proxy.jade')())
@Component
export class LinkProxyComponent extends Vue {
  @Prop()
  to = "";

  // mounted() {
  //     super.mounted();
  // }

  goto() {
    this.$router.push(`/proxy?href=${this.to}`);
  }
}
</script>
