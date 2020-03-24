<template lang="jade">
    div.panel.panel-trade-history
        h2 TRADE HISTORY
            span.pannel-tabbar
                a(@click='switchOrderBook') Order Book
                a.active Trade History
        div.col-name.flex
            span Trade Size
            span.text-right Price ({{object.product.quoteCurrency}})
            span Time
        div.history-list(ref='list')
            li.flex(v-for='item in history', :class="{'am-0-0': item.css}")
                span
                    format-number(:num='item.size', :fixed='object.product.baseScale')
                span(:class="{buy: item.side == 'sell', sell: item.side=='buy'}")
                    format-price(:price='item.price', type=1, :fixed='object.product.quoteScale')
                span {{item.localTime}}


</template>

<script lang="ts">

    import {Helper} from '@/helper';
    import {StoreService} from '@/store/service';
    //import {Dom, Emit, Prop} from "../component";
    import {Component, Vue, Emit, Prop} from 'vue-property-decorator'

    //@Dom('panel-trade-history', require('./trade-history/trade-history.jade')())
    @Component
    export class TradeHistoryPanelComponent extends Vue {

        @Prop()
        productId: string;

        lastedHistory: string[] = [];

        // mounted() {
        //     super.mounted();
        // }

        @Emit('tabbar-change')
        tabbarChange(index: number) {
        }

        switchOrderBook() {
            this.tabbarChange(0);
        }

        get object() {
            return StoreService.Trade.getObject(this.productId);
        }

        get history() {

            let history = this.object.tradeHistory;

            history.forEach((item: any) => {
                item.size = Number(item.size);
                item.price = Number(item.price);
            });

            this.lastedHistory = Helper.map(history, (item: any) => {
                return item.makerOrderId;
            });

            return history;
        }

    }
</script>
