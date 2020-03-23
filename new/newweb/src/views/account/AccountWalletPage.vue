<template lang="jade">
    div.page.page-account.page-account-wallet
    header-navbar(active=0)
    div.account-container
        h1 MY WALLETS
        div.content(:class="{'show-wallets': showWallets}")
            div.cover
                div.menu(@click='showWallets=true')
                    icon-arrow
                panel-wallet(:wallet='wallet', @send='withdrawal', @receive='deposit')
            div.wallets
                panel-wallet-list(:selected-wallet='wallet',
                    @send='withdrawal', @receive='deposit', @select='walletSelect')
            div.transaction
                panel-transaction(:currency='wallet.currency', @detail='transaction')
</template>

<script lang="ts">
    import {Page, Route} from "../BasePage.vue";

    @Route('/account/wallet', require('./wallet/wallet.jade')())
    export class AccountWalletPage extends Page {

        wallet: any = {};
        showWallets: boolean = false;

        mounted() {
            this.needLogin = true;
            super.mounted();
            this.pageLoadingHide();
            this.setTitle('Gitbiex | Digital Asset Exchange');
        }

        walletSelect(wallet: any) {
            this.wallet = wallet;
            this.showWallets = false;
        }

        deposit(currency: string) {
            this.createModal('modal-deposit', {currencies: [currency]});
        }

        withdrawal(currency: string) {
            this.createModal('modal-withdrawal', {currencies: [currency]});
        }

        transaction(transaction: any) {
            this.createModal('modal-transaction', {transaction: transaction});
        }

    }
</script>
