<template lang="jade">
    div.chart-slider
        div.slider-inner(:style="'width: ' +products.length*270+ 'px'")
            div.slide(v-for='product in products')
                div.left
                    label {{product.baseCurrency}}/{{product.quoteCurrency}}
                    span(:class="{'red': product.rate24h < 0}")
                        | {{product.rate24h>0?'+':''}}{{product.rate24h}}%
                    b {{product.price}}
                        small   {{product.quoteCurrency}}
                div.right
                    img(:src='`/api/products/${product.id}/svg`')
</template>

<script lang="ts">
import { StoreService } from "../../store/service";
//import {Dom} from "../component";
import { Component, Vue } from "vue-property-decorator";

// @Dom('chart-slider', require('./slider/slider.jade')())
@Component
export default class ChartSliderComponent extends Vue {
  // mounted() {
  //     super.mounted();
  // }

  get products() {
    return StoreService.Trade.products.concat(StoreService.Trade.products);
  }
}
</script>
