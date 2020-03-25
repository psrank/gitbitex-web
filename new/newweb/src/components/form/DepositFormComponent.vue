<template lang="jade">
    div.form-deposit
        div.qrcode(ref='qrcode')
        input.form-control.address-control(v-model='address')

</template>

<script lang="ts">
import { HttpService } from "@/service/http";
//import {Dom, Prop, Watch} from "../component";
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

//@Dom('form-deposit', require('./deposit/deposit.jade')())
@Component
export class DepositFormComponent extends Vue {
  @Prop()
  currency = "";

  address: string = "";
  qrcode: any;

  mounted() {
    //super.mounted();
    this.onCurrencyChange();
    this.qrcode = new (window as any).QRCode(this.$refs.qrcode);
  }

  @Watch("currency")
  onCurrencyChange() {
    HttpService.Account.getDepositAddress(this.currency).then(
      (response: any) => {
        this.address = response.address;
        this.qrcode && this.qrcode.clear();
        this.qrcode.makeCode({
          text: this.address,
          width: 400,
          height: 400,
          colorDark: "#000000",
          colorLight: "#ffffff"
        });
      }
    );
  }
}
</script>
