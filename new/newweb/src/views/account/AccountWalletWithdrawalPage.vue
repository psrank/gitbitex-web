<template lang="jade">
    div.page.page-account.page-account-withdrawal
        header-navbar(active=0)
        div.container
            h1 Withdrawal
            form-withdrawal(:currency='currency')
            h1 Depoist
            table.table
                thead
                    tr
                        th Coin
                        th.text-right Total balance
                        th.text-right Available balance
                        th.text-right In order
                        th.text-right BTC Value
                        th &nbsp;
                tbody
                    tr(v-for='b in balances')
                        td.text-left {{b.currency}}
                        td.text-right {{b.total}}
                        td.text-right {{b.available}}
                        td.text-right {{b.hold}}
                        td.text-right {{b.hold}}
                        td.text-right
                            button.btn.btn-primary.btn-sm.m-r-5(@click='deposit(b)') Deposit
                            button.btn.btn-primary.btn-sm(@click='withdrawal(b)') Withdrawal
</template>

<script lang="ts">
//import {Page, Route} from "../../../Page.vue";

//@Route('/account/balance/withdrawal', require('./wallet/withdrawal/withdrawal.jade')())
import { mixins } from "vue-class-component";
import PageMixin from "@/shared/pageMixin";
import ModalMixin from "@/shared/modalMixin";

export class AccountWalletWithdrawalPage extends mixins(PageMixin, ModalMixin) {
  currency = "";

  created() {
    this.currency = this.$route.query.currency.toString();
  }

  mounted() {
    //super.mounted();
    this.pageLoadingHide();
  }
}
</script>
