<template lang="jade">
    div.panel-trade
        div.group(v-for='(products, key) in groups')
            h4 {{key}}
            link-proxy.item(v-for='product in products', :to="'/trade/'+product.id", :key='product.id')
                span {{product.baseCurrency}}/{{product.quoteCurrency}}
                span {{parseFloat(product.price).toFixed(product.quoteScale)}}
                    small   {{product.quoteCurrency}}
                span(:class="{'text-color-red': product.rate24h < 0, 'text-color-green': product.rate24h >= 0}")
                    | {{product.rate24h>0?'+':''}}{{product.rate24h}}
                    small %

</template>

<script lang="ts">
//import {Dom, Prop} from "../component";
import { Component, Vue, Prop } from "vue-property-decorator";

//@Dom('panel-trade', require('./trade/trade.jade')())
@Component
export class TradePanelComponent extends Vue {
  @Prop()
  groups!: any[];

  // mounted() {
  //   super.mounted();
  // }

  toTrade(product: any) {
    location.href = "/trade/" + product.id;
  }
}
</script>
