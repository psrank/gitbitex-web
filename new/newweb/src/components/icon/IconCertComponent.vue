<template>
  <span class="icon icon-cert">
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      theme="[object Object]"
      class="sc-drlKqa hUoSsr"
    >
      <g fill-rule="nonzero" fill="none">
        <path
          d="M48 55H7c-.55 0-1-.45-1-1V16c0-.27.11-.52.29-.71l12-12c.19-.18.44-.29.71-.29h29c.55 0 1 .45 1 1v50c0 .55-.45 1-1 1zM8 53h39V5H19.41L8 16.41V53z"
          fill="#0667D0"
        ></path>
        <path fill="#FFF" d="M53 42H43v18l5.26-4L53 60z"></path>
        <path
          d="M53 61c-.23 0-.46-.08-.65-.24l-4.13-3.48-4.62 3.52c-.3.23-.71.27-1.05.1-.33-.17-.55-.52-.55-.9V42c0-.55.45-1 1-1h10c.55 0 1 .45 1 1v18c0 .39-.23.74-.58.91-.13.06-.28.09-.42.09zm-9-18v14.98l3.66-2.78c.37-.28.89-.27 1.25.03L52 57.85V43h-8z"
          fill="#0667D0"
        ></path>
        <g transform="translate(38 29)">
          <circle fill="#9BC2EC" cx="10" cy="10" r="9"></circle>
          <path
            d="M10 20C4.49 20 0 15.51 0 10S4.49 0 10 0s10 4.49 10 10-4.49 10-10 10zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8z"
            fill="#0667D0"
          ></path>
        </g>
        <path fill="#9BC2EC" d="M19 16H7L19 4z"></path>
        <path
          d="M19 17H7c-.4 0-.77-.24-.92-.62-.15-.37-.07-.8.22-1.09l12-12c.29-.29.71-.37 1.09-.22.37.16.61.53.61.93v12c0 .55-.45 1-1 1zm-9.59-2H18V6.41L9.41 15zM42 25H13c-.55 0-1-.45-1-1s.45-1 1-1h29c.55 0 1 .45 1 1s-.45 1-1 1zM33 35H13c-.55 0-1-.45-1-1s.45-1 1-1h20c.55 0 1 .45 1 1s-.45 1-1 1zM33 45H13c-.55 0-1-.45-1-1s.45-1 1-1h20c.55 0 1 .45 1 1s-.45 1-1 1z"
          fill="#0667D0"
        ></path>
      </g>
    </svg>
  </span>
</template>

<script lang="ts">
//import {Dom} from "../component";
import { Component, Vue } from "vue-property-decorator";

//@Dom('icon-cert', require('./cert/cert.html'))
@Component
export default class IconCertComponent extends Vue {
  // mounted() {
  //     super.mounted();
  // }
}
</script>
