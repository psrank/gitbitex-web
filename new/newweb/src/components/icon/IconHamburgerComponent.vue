<template>
  <span class="icon icon-hamburger">
    <svg
      width="18"
      height="16"
      viewBox="0 0 18 16"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      fill="#fff"
    >
      <use xlink:href="#path0_stroke" transform="translate(0 1)"></use>
      <use xlink:href="#path0_stroke" transform="translate(0 8)"></use>
      <use xlink:href="#path0_stroke" transform="translate(0 15)"></use>
      <defs><path id="path0_stroke" d="M0 1h18v-2H0v2z"></path></defs>
    </svg>
  </span>
</template>

<script lang="ts">
//import {Dom} from "../component";
import { Component, Vue } from "vue-property-decorator";

//@Dom('icon-hamburger', require('./hamburger/hamburger.html'))
@Component
export default class IconHamburgerComponent extends Vue {
  // mounted() {
  //   //super.mounted();
  // }
}
</script>
