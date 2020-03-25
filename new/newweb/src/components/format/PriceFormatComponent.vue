<template lang="jade">
    div.format-price(:class="css")
        i {{format[0]}}
        | .
        i {{format[1]}}
</template>

<script lang="ts">
//import {Dom, Prop, Watch} from "../component";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

//@Dom('format-price', require('./price/price.jade')())
@Component
export default class PriceFormatComponent extends Vue {
  @Prop()
  price!: number;

  @Prop()
  type!: number;

  @Prop()
  fixed!: number;

  format: any = [0, 0];
  css = "";
  priceFixed = "";

  created() {
    this.css = `type-${this.type}`;
  }

  mounted() {
    //super.mounted();
    this.onPriceChange();
  }

  @Watch("price")
  onPriceChange() {
    this.priceFixed = this.fixed
      ? this.price.toFixed(this.fixed)
      : String(this.price);
    this.format = String(this.priceFixed).split(".");
  }
}
</script>
