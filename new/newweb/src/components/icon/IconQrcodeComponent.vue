<template>
  <span class="icon icon-qrcode">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 14 14"
      class="AccountActionButtons__QRIcon-liMnje iknfew"
    >
      <path
        d="M6.417 6.417H0V0h6.417v6.417zM1.167 5.25H5.25V1.167H1.167V5.25zM14 6.417H7.583V0H14v6.417zM8.75 5.25h4.083V1.167H8.75V5.25zM6.417 14H0V7.583h6.417V14zm-5.25-1.167H5.25V8.75H1.167v4.083zM14 11.667h-1.167V8.75h-1.166v1.75h-3.5V7.583h1.166v1.75H10.5v-1.75H14zM14 14H8.167v-2.333h1.166v1.166H14z"
      ></path>
      <path
        d="M2.333 2.333h1.75v1.75h-1.75zM9.917 2.333h1.75v1.75h-1.75zM2.333 9.917h1.75v1.75h-1.75z"
      ></path>
    </svg>
  </span>
</template>

<script lang="ts">
//import {Dom} from "../component";
import { Component, Vue } from "vue-property-decorator";

//@Dom('icon-qrcode', require('./qrcode/qrcode.html'))
@Component
export default class IconQrcodeComponent extends Vue {
  // mounted() {
  //     super.mounted();
  // }
}
</script>
