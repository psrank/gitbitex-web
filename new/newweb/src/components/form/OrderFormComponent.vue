<template lang="jade">
    div.form-order

        h2 ORDER FORM

        div.login(v-if='!logined')
            button(@click='toSigninPage') Sign in
            span.divider or
            button(@click='toSignupPage') create account
        div.balance(v-else)
            h3 BALANCE
            div.row.funds
                div.col-xs-3 {{object.product.quoteCurrency}}
                div.col-xs-9.text-right
                    b {{quoteBalance}}
                    br
                    i HOLD {{quoteHold}}
                div.col-xs-3 {{object.product.baseCurrency}}
                div.col-xs-9.text-right
                    b {{baseBalance}}
                    br
                    i HOLD {{baseHold}}
            div.btns
                button(@click='deposit')
                    icon-transaction
                    | DEPOSIT
                button(@click='withdrawal')
                    icon-transaction
                    | WITHDRAWAL
        div.trade-form
            div.group-btns
                span(:class='{active: trade.side==0}', @click='tradeSideChange(0)') BUY
                span(:class='{active: trade.side==1}', @click='tradeSideChange(1)') SELL
            div.trade-tabbar
                span(:class='{active: trade.type==0}', @click='tradeTypeChange(0)') MARKET
                span(:class='{active: trade.type==1}', @click='tradeTypeChange(1)') LIMIT
            div.input-group(v-show='trade.side==1 || (trade.side==0 && trade.type==1)')
                label Amount
                input.form-control(type="number", placeholder="0.00", min="0", autocomplete="off",
                    v-model.number='trade.size')
                span.input-group-btn {{object.product.baseCurrency}}
            div.input-group(v-show='trade.side==0 && trade.type==0')
                label Amount
                input.form-control(type="number", placeholder="0.00",  min="0", autocomplete="off",
                    v-model.number='trade.quote')
                span.input-group-btn {{object.product.quoteCurrency}}
            div.input-group(v-show='trade.type==1')
                label Limit Price
                input.form-control(type="number", placeholder="0.00",  min="0", autocomplete="off",
                    v-model.number='trade.price')
                span.input-group-btn {{object.product.quoteCurrency}}
            div.preview
                div.row(v-show='!(trade.side==0 && trade.type==0)')
                    span.col-xs-6 Total ({{object.product.quoteCurrency}}) ≈
                    span.col-xs-6.text-right {{format.quote}}
                div.row(v-show='trade.side==0 && trade.type==0')
                    span.col-xs-6 Total ({{object.product.baseCurrency}}) ≈
                    span.col-xs-6.text-right {{format.size}}

            div.submit
                button.buy(@click='submit', v-show='trade.side==0 && !status') PLACE BUY ORDER
                button.sell(@click='submit', v-show='trade.side==1 && !status') PLACE SELL ORDER
                button.success(v-show='status == 1', disabled) ✓SUCCESS
                button.error(v-show='status == 2') ERROR

            div.submit-error(v-if='error') {{error}}


</template>

<script lang="ts">
import { HttpService } from "@/service/http";
import { StoreService } from "@/store/service";
//import {Emit, Prop, Watch} from "../component";
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";

//@Dom('form-order', require('./order/order.jade')())
@Component
export class OrderFormComponent extends Vue {
  @Prop()
  productId: string;

  account: Account;
  trade: {
    side: number;
    price: number;
    size: number;
    quote: number;
    type: number;
    productId: string;
  } = {
    side: 0,
    type: 0,
    price: undefined,
    size: undefined,
    quote: undefined,
    productId: ""
  };

  format: any = {};
  status: number = 0;
  error: string = "";

  created() {
    this.format.size = Number(0).toFixed(
      this.object.product.baseMinSize.length - 2
    );
    this.trade.productId = this.productId;
  }

  mounted() {
    //super.mounted();
    StoreService.Account.logined &&
      StoreService.Trade.loadFunds([
        this.object.product.baseCurrency,
        this.object.product.quoteCurrency
      ]);
  }

  get userInfo() {
    return StoreService.Account.userInfo;
  }

  get logined() {
    return StoreService.Account.logined;
  }

  get object() {
    return StoreService.Trade.getObject(this.productId);
  }

  get baseBalance() {
    const fund = StoreService.Trade.funds[this.object.product.baseCurrency];
    return fund ? Number(fund.available).toFixed(4) : "--";
  }

  get baseHold() {
    const fund = StoreService.Trade.funds[this.object.product.baseCurrency];
    return fund ? Number(fund.hold).toFixed(4) : "--";
  }

  get quoteHold() {
    const fund = StoreService.Trade.funds[this.object.product.quoteCurrency];
    return fund ? Number(fund.hold).toFixed(4) : "--";
  }

  get quoteBalance() {
    const fund = StoreService.Trade.funds[this.object.product.quoteCurrency];
    return fund ? Number(fund.available).toFixed(4) : "--";
  }

  toSigninPage() {
    this.$router.push(`/account/signin?ref=/trade/${this.productId}`);
  }

  toSignupPage() {
    this.$router.push("/account/signup");
  }

  tradeSideChange(side: number) {
    this.trade.side = side;
    this.trade.price = this.object.product.price;
    this.trade.size = undefined;
    this.trade.quote = undefined;
  }

  tradeTypeChange(type: number) {
    this.trade.type = type;
    this.trade.price = this.object.product.price;
    this.trade.size = undefined;
    this.trade.quote = undefined;
  }

  @Watch("trade.quote")
  tradeQuoteChange(_old: number, _new: number) {
    if (this.trade.side == 0 && this.trade.type == 0) {
      if (this.trade.type == 0) {
        this.trade.size = this.trade.quote / this.object.product.price;
      } else {
        this.trade.size = this.trade.quote / this.trade.price;
      }
    }

    this.formatTrade();
  }

  @Watch("trade.size")
  tradeSizeChange(_old: number, _new: number) {
    if (
      this.trade.side == 1 ||
      (this.trade.side == 0 && this.trade.type == 1)
    ) {
      if (this.trade.type == 0) {
        this.trade.quote = this.trade.size * this.object.product.price;
      } else {
        this.trade.quote = this.trade.size * this.trade.price;
      }
    }

    this.formatTrade();
  }

  @Watch("trade.price")
  tradePriceChange() {
    if (this.trade.side == 1) {
      this.trade.quote = this.trade.size * this.trade.price;
    }

    this.formatTrade();
  }

  formatTrade() {
    this.format.size = Number(this.trade.size || 0).toFixed(
      this.object.product.baseMinSize.length - 2
    );
    this.format.quote = Number(this.trade.quote || 0).toFixed(
      this.object.product.quoteIncrement.length - 2
    );
  }

  submit() {
    this.trade.type == 0 &&
      (this.trade.price = Number(this.object.product.price));

    if (!this.trade.size || this.trade.size <= 0) {
      this.alert(2, "Amount must be specified");
      return;
    }
    if (this.trade.type == 1 && (!this.trade.price || this.trade.price <= 0)) {
      this.alert(2, "Price must be specified");
      return;
    }

    HttpService.Order.createOrder(this.trade)
      .then(() => {
        this.alert(1);
        this.trade.size = 0;
        this.trade.quote = 0;
      })
      .catch((error: any) => {
        console.log(error);
        this.alert(2, error.message);
      });
  }

  alert(status: number, msg: string = "") {
    this.status = status;
    this.error = msg;
    setTimeout(() => {
      this.status = 0;
    }, 3000);
  }

  setTrade(side: number, price: number, size: number) {
    this.trade.type = 1;
    this.trade.side = side;
    this.trade.price = price;
    this.trade.size = size;
  }

  @Emit("deposit")
  deposit() {}

  @Emit("withdrawal")
  withdrawal() {}
}
</script>
