<template lang="jade">
    div.panel.panel-order
        h2 OPEN ORDERS
            button(v-show='cancelAllBtnEnable', @click='cancelAll') cancel all
        div.panel-loading(v-if='loading')
            span.loading-spinner
        div.order-list
            panel-order-list(:orders='openOrders', :product='object.product')


</template>

<script lang="ts">
import { HttpService } from "@/service/http";
import { StoreService } from "@/store/service";
//import {Dom, Prop} from "../component";
import { Component, Vue, Prop } from "vue-property-decorator";

//@Dom('panel-order', require('./order/order.jade')())
@Component
export default class OrderPanelComponent extends Vue {
  @Prop()
  productId = "";

  loading = true;
  cancelAllBtnEnable = false;

  mounted() {
    //super.mounted();
    if (StoreService.Account.loggedIn) {
      StoreService.Trade.loadOpenOrders(this.productId, () => {
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }

  get object(): any {
    return StoreService.Trade.getObject(this.productId);
  }

  get openOrders() {
    if (!StoreService.Account.loggedIn) {
      return [];
    }

    this.cancelAllBtnEnable = false;
    return this.object.openOrders
      .map((order: any) => {
        if (order.status == "open") this.cancelAllBtnEnable = true;
        return order;
      })
      .slice(0, 30);
  }

  cancelAll() {
    this.openOrders.forEach((order: any) => {
      if (order.status == "open") {
        order.status = "canceling";
        order.statusFormat = "canceling";
      }
    });

    HttpService.Order.cancelAll(this.productId).then(() => {
      return;
    });
  }
}
</script>
