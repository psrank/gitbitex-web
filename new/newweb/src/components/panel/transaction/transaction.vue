<template lang="jade">
    div.panel-transaction
        h2 Transactions
        div.list
            li(v-for='item in transactions', @click='detail(item)')
                div.left
                    div.date
                        div.month {{item.createdAt.format('MMM')}}
                        div.day {{item.createdAt.format('DD')}}
                    icon-sent(v-if="item.type=='send'")
                    icon-received(v-if="item.type=='received'")
                    div.title
                        b {{item.type=='send'?'Sent':'Received'}} {{item.currency}}
                        span(v-if="item.type=='send'") To {{item.currency}} address
                        span(v-if="item.type=='received'") From {{item.currency}} address
                div.right
                    b  {{item.amountSymbol}}{{item.amount}} {{item.currency}}
                    span {{item.amountSymbol}}{{item.nativeAmount}} {{item.nativeCurrency}}
</template>

<script lang="ts">


    import {Moment} from './../../../vendor';
    import {HttpService} from './../../../service/http';
    import {Dom, Emit, Prop, Watch} from "../../component";
    import {Vue} from 'vue-property-decorator'

    @Dom('panel-transaction', require('./transaction.jade')())
    export class TransactionPanelComponent extends Vue {

        @Prop()
        currency: string;

        transactions: any[] = [];

        mounted() {
            super.mounted();
        }

        @Watch('currency')
        onCurrencyChange() {

            HttpService.Account.getTransactions(this.currency).then((response: any) => {
                this.transactions = response;
                this.transactions.forEach((tran: any) => {
                    tran.amountSymbol = tran.type == 'send' ? '−' : '+';
                    tran.createdAt = Moment(tran.createdAt);
                });
            });
        }

        @Emit('detail')
        detail(transaction: any) {
        }

    }
</script>
