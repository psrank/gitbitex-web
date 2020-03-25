<template lang="jade">
    div.modal-withdrawal
        div.modal-header
            h2 WITHDRAWAL FUNDS
            span.close(@click='close') ✕
        div.tabbar
            span(v-for='(item, index) in tabbarItems', @click='tabbarChange(index)', :class='{active: item.active}')
                | {{item.currency}} Address
        div.modal-body(v-if='!withdrawn')
            form-withdrawal(:currency='currency', @success='withdrawalSuccess')
            div.clear-fixed
        div.success-panel(v-if='withdrawn')
            icon-success

</template>

<script lang="ts">
//import {Dom, Emit, Prop} from "../component";
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

//@Dom('modal-withdrawal', require('./withdrawal/withdrawal.jade')())
@Component
export default class WithdrawalModalComponent extends Vue {
  @Prop()
  data!: any;

  @Emit("close")
  close() {
    return;
  }

  transfer: {
    amount: number;
    address: string;
  } = {
    amount: 0,
    address: ""
  };

  tabbarItems: any[] = [];
  error = "";
  loading = false;
  currency = "";
  withdrawn = false;

  created() {
    this.data.currencies.forEach((currency: string) => {
      this.tabbarItems.push({
        currency: currency,
        active: false
      });
    });

    this.tabbarChange(0);
  }

  // mounted() {
  //     super.mounted();
  // }

  tabbarChange(index: number) {
    this.tabbarItems.forEach((item: any, i: number) => {
      item.active = i == index;
    });
    this.currency = this.tabbarItems[index].currency;
  }

  withdrawalSuccess() {
    this.withdrawn = true;
  }
}
</script>
