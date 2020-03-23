<template lang="jade">
    div.panel-wallet.cover()
        img.brand(:src='wallet.currencyIcon')
        span.name {{wallet.currency}} Wallet
        span.balance {{wallet.available}} {{wallet.currency}} ≈
        span.btns
            button(@click.stop='send(wallet.currency)')
                icon-send
                | Send
            button(@click.stop='receive(wallet.currency)')
                icon-qrcode
                | Receive
</template>

<script lang="ts">


    import {Dom, Emit, Prop} from "../component";
    import {Vue} from 'vue-property-decorator'

    @Dom('panel-wallet', require('./wallet/wallet.jade')())
    export class WalletPanelComponent extends Vue {

        @Prop()
        wallet: any;

        mounted() {
            super.mounted();
        }

        @Emit('send')
        send(currency: string) {
        }

        @Emit('receive')
        receive(currency: string) {
        }

    }
</script>
