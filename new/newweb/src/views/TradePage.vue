<template lang="jade">
    div.page.page-trade
    header-trade(:products='products', :productId='productId')
    div.content
        div.content-left
            form-order(
                :class='{active: componentActive==0}',
                :productId='productId', ref='orderForm', @deposit='deposit', @withdrawal='withdrawal'
            )
        div.content-center
            div.order-book-panel(:class='{active: componentActive==1}')
                panel-order-book(:productId='productId', @tabbar-change='orderBookTabbarChange', @select='orderBookSelect')
            div.chart-panel(:class='{active: componentActive==2}')
                chart-trade-view(:productId='productId')
            div.order-history(:class='{active: componentActive==3}')
                panel-order(:productId='productId')
        div.content-right(:class='{active: componentActive==4, historyActive: tradeHistoryActive}')
            panel-trade-history(:productId='productId', @tabbar-change='tradeHistoryTabbarChange')
    div.bottom-menu
        span(:class='{active: componentActive==0}', @click='componentActive=0') TRADE
        span(:class='{active: componentActive==1}', @click='componentActive=1') BOOK
        span(:class='{active: componentActive==2}', @click='componentActive=2') CHARTS
        span(:class='{active: componentActive==3}', @click='componentActive=3') ORDERS
        span(:class='{active: componentActive==4}', @click='componentActive=4') HISTORY

</template>

<script lang="ts">
import { DomWatch } from "@/watch";
import { Component, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import OrderFormComponent from "@/components/form/OrderFormComponent.vue";
import { SubscribeChannel } from "@/store/channel";
import { StoreService } from "@/store/service";
import ModalMixin from "@/shared/modalMixin";
import PageMixin from "@/shared/pageMixin";

//@Route('/trade/:id', require('./trade.jade')())
@Component({
  components: { OrderFormComponent }
})
export class TradePage extends mixins(PageMixin, ModalMixin) {
  tradeHistoryActive = false;
  productId: string;
  titleListener!: any;
  componentActive = 0;

  constructor() {
    super();
    this.productId = this.$route.params["id"];
  }

  mounted() {
    this.init();
    this.pageLoadingHide();

    StoreService.Trade.loadTradeHistory(this.productId);

    this.titleListener = setInterval(() => {
      const product = this.object.product;
      if (product.price) {
        document.title = `${Number(product.price).toFixed(
          product.quoteScale
        )} · ${product.baseCurrency} to ${product.quoteCurrency}`;
      }
    }, 1000);

    this.subscribe();

    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState == "visible") {
        this.subscribe();
      } else {
        this.unsubscribe();
      }
    });
  }

  subscribe() {
    StoreService.Trade.subscribe(
      [this.productId],
      [
        SubscribeChannel.CANDLES,
        SubscribeChannel.MATCH,
        SubscribeChannel.LEVEL2,
        SubscribeChannel.ORDER
      ]
    );
  }

  unsubscribe() {
    StoreService.Trade.unsubscribe(
      [this.productId],
      [
        SubscribeChannel.CANDLES,
        SubscribeChannel.MATCH,
        SubscribeChannel.LEVEL2,
        SubscribeChannel.ORDER
      ]
    );
  }

  get products(): any {
    return StoreService.Trade.products;
  }

  get object(): any {
    return StoreService.Trade.getObject(this.productId);
  }

  orderBookTabbarChange(index: number) {
    this.tradeHistoryActive = true;
  }

  orderBookSelect(type: number, data: any) {
    (this.$refs.orderForm as OrderFormComponent).setTrade(
      type,
      Number(data[0]),
      Number(data[1])
    );
  }

  tradeHistoryTabbarChange(index: number) {
    this.tradeHistoryActive = false;
  }

  deposit() {
    this.createModal("modal-deposit", {
      currencies: [
        this.object.product.baseCurrency,
        this.object.product.quoteCurrency
      ]
    });
  }

  withdrawal(balance: any) {
    this.createModal("modal-withdrawal", {
      currencies: [
        this.object.product.baseCurrency,
        this.object.product.quoteCurrency
      ]
    });
  }

  @Watch("componentActive")
  componentActiveChange() {
    DomWatch.visibleChanged();
  }

  destroyed() {
    clearInterval(this.titleListener);
    this.unsubscribe();
  }
}
</script>
