<template lang="jade">
    div.modal-transaction(v-if='transaction.amount')
        div.modal-header
            h2 {{transaction.type=='send'?'Sent':'Received'}} {{transaction.currency}}
            span.close(@click='close') ✕
        div.modal-body.amount
            icon-sent(v-if="transaction.type=='send'")
            icon-received(v-if="transaction.type=='receive'")
            div.value {{transaction.amountSymbol}}{{transaction.amount}} {{transaction.currency}}
            div.native ≈ {{transaction.nativeAmount}} {{transaction.nativeCurrency}}
        div.modal-body.detail
            li(v-if="transaction.type=='send'")
                label To
                span {{transaction.toAddress}}
            li()
                label Price per coin
                span {{transaction.price}}
            li(v-if="transaction.type=='send'")
                label Confirmations
                span {{transaction.network.confirmations}}
            li(v-if="transaction.type=='send'")
                label Fee
                span {{transaction.network.feeAmount}} {{transaction.currency}}
            li
                label Transaction
                a(:href='transaction.network.resourceUrl', target='_blank') View transaction

        div.modal-body.status
            span {{transaction.createdAt.format("DD/MM/YYYY h:mm:ss A")}}
            label {{transaction.status}}
</template>

<script lang="ts">
//import {Dom, Emit, Prop} from "../component";
import { Component, Vue, Emit, Prop } from "vue-property-decorator";

//@Dom('modal-transaction', require('./transaction/transaction.jade')())
@Component
export default class TransactionModalComponent extends Vue {
  @Prop()
  data!: any;

  @Emit("close")
  close() {
    return;
  }

  transaction: any = {};

  mounted() {
    //super.mounted();
    this.transaction = this.data.transaction;
  }
}
</script>
