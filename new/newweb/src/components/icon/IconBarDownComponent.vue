<template>
  <span class="icon icon-bar-down">
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      theme="[object Object]"
      class="sc-hMrMfs brfJKb"
    >
      <g fill-rule="nonzero" fill="none">
        <path
          d="M19 53H5c-.55 0-1-.45-1-1s.45-1 1-1h14c.55 0 1 .45 1 1s-.45 1-1 1z"
          fill="#0667D0"
        ></path>
        <path fill="#FFF" d="M25 32h14v20H25z"></path>
        <path
          d="M39 53H25c-.55 0-1-.45-1-1V32c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v20c0 .55-.45 1-1 1zm-13-2h12V33H26v18z"
          fill="#0667D0"
        ></path>
        <g>
          <path fill="#9BC2EC" d="M45 12h14v40H45z"></path>
          <path
            d="M59 53H45c-.55 0-1-.45-1-1V12c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v40c0 .55-.45 1-1 1zm-13-2h12V13H46v38z"
            fill="#0667D0"
          ></path>
        </g>
        <path
          d="M12 47c-.55 0-1-.45-1-1V12c0-.55.45-1 1-1s1 .45 1 1v34c0 .55-.45 1-1 1z"
          fill="#0667D0"
        ></path>
        <path
          d="M12 47c-.26 0-.51-.1-.71-.29l-4.24-4.24a.996.996 0 1 1 1.41-1.41L12 44.59l3.54-3.54a.996.996 0 1 1 1.41 1.41l-4.24 4.24c-.2.2-.45.3-.71.3z"
          fill="#0667D0"
        ></path>
      </g>
    </svg>
  </span>
</template>

<script lang="ts">
//import {Dom} from "../component";
import { Component, Vue } from "vue-property-decorator";

//@Dom('icon-bar-down', require('./bar-down/bar-down.html'))
@Component
export default class IconBarDownComponent extends Vue {
  // mounted() {
  //     super.mounted();
  // }
}
</script>
