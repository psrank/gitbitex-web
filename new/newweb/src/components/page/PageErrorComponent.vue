<template lang="jade">
    div.page-error {{content}}
</template>

<script lang="ts">
//import {Dom, Prop} from "../component";
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

//@Dom('page-error', require('./error/error.jade')())
@Component
export default class PageErrorComponent extends Vue {
  @Prop()
  content = "";

  // mounted() {
  //     super.mounted();
  // }
}
</script>
