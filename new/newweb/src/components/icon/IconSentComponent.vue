<template>
  <span class="icon icon-sent">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 30 30"
    >
      <g fill="none" fill-rule="evenodd" transform="translate(1 1)">
        <path
          d="M14 17.684V5.894M18.421 10.315L14 5.894l-4.421 4.421M20.268 20.632H7.731"
        ></path>
        <circle cx="14" cy="14" r="14"></circle>
      </g>
    </svg>
  </span>
</template>

<script lang="ts">
//import {Dom} from "../component";
import { Component, Vue } from "vue-property-decorator";

//@Dom('icon-sent', require('./sent/sent.html'))
@Component
export default class IconSentComponent extends Vue {
  // mounted() {
  //     super.mounted();
  // }
}
</script>
