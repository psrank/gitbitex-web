<template lang="jade">
    span.logo(:class="{'logo-light': theme=='light'}")
</template>

<script lang="ts">
//import {Dom, Prop} from "../component";
import { Component, Vue, Prop } from "vue-property-decorator";

//@Dom('logo', require('./logo.jade')())
@Component
export default class LogoComponent extends Vue {
  @Prop()
  theme = "";

  // mounted() {
  //     super.mounted();
  // }
}
</script>
