<template>
  <span class="icon icon-down">
    <svg width="20" height="20" viewBox="0 0 20 20">
      <g fill="none" fill-rule="evenodd">
        <path stroke="#14181C" d="M.5.5h19v19H.5z"></path>
        <path d="M14 10H6" stroke="#fff" stroke-linecap="square"></path>
      </g>
    </svg>
  </span>
</template>

<script lang="ts">
//import {Dom} from "../component";
import { Component, Vue } from "vue-property-decorator";

//@Dom('icon-down', require('./down/down.html'))
@Component
export class IconDownComponent extends Vue {
  // mounted() {
  //     super.mounted();
  // }
}
</script>
