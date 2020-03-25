<template lang="jade">
    span.logo(:class="{'logo-light': theme=='light'}")
</template>

<script lang="ts">
//import {Dom, Prop} from "../component";
import { Component, Vue, Prop } from "vue-property-decorator";

//@Dom('logo', require('./logo.jade')())
@Component
export class LogoComponent extends Vue {
  @Prop()
  theme: string;

  // mounted() {
  //     super.mounted();
  // }
}
</script>
