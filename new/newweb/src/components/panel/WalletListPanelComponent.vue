<template lang="jade">
    div.panel-wallet
        li(v-for='f in funds', :class='{active: f.currency == selectedWallet.currency}', @click='select(f)')
            div.left
                img(:src='f.currencyIcon')
            div.right
                span.name {{f.currency}} Wallet
                span.balance {{f.available}} {{f.currency}} ≈
                span.btns
                    button(@click.stop='send(f.currency)')
                        icon-send
                        | Send
                    button(@click.stop='receive(f.currency)')
                        icon-qrcode
                        | Receive
</template>

<script lang="ts">
import { HttpService } from "@/service/http";
//import {Dom, Emit, Prop} from "../component";
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

//@Dom('panel-wallet-list', require('./wallet-list/wallet-list.jade')())
@Component
export default class WalletListPanelComponent extends Vue {
  @Prop()
  selectedWallet!: any;

  funds: any[] = [];

  mounted() {
    //super.mounted();
    HttpService.Account.getFunds([]).then((response: any) => {
      response.forEach((balance: any) => {
        balance.available = Number(balance.available).toFixed(8);
        balance.total = (
          Number(balance.available) + Number(balance.hold)
        ).toFixed(8);
        balance.hold = Number(balance.hold).toFixed(8);
      });
      this.funds = response;
      this.select(response[0]);
    });
  }

  @Emit("send")
  send(productId: string) {
    return;
  }

  @Emit("receive")
  receive(productId: string) {
    return;
  }

  @Emit("select")
  select(wallet: any) {
    return;
  }
}
</script>
