<template lang="jade">
    div.panel.panel-order-book
        h2 ORDER BOOK
            span.pannel-tabbar
                a.active Order Book
                a(@click='switchHistory') Trade History
        div.col-name.flex
            span &nbsp;
            span.text-right Market Size
            span Price ({{object.product.quoteCurrency}})
        div.book-list(ref='book')
            div.asks
                li.flex(v-for='ask in orderBook.asks', :class="ask[3]", @click='selectAction(0, ask)')
                    span
                        em(:style="{ width: ask[2] +'%'}")
                    span
                        format-number(:num='ask[1]', v-if='ask[1]', :fixed='object.product.baseScale')
                        i(v-else) -
                    span
                        format-price(:price='ask[0]', v-if='ask[0]', type=1, :fixed='object.product.quoteScale')
                        i(v-else) -
            div.col-name.flex
                span &nbsp;
                span {{object.product.baseCurrency}} Spread
                span {{tradePriceDiff}}
            div.bids
                li.flex(v-for='bid in orderBook.bids', :class="bid[3]", @click='selectAction(1, bid)')
                    span
                        em(:style="{ width: bid[2] +'%'}")
                    span
                        format-number(:num='bid[1]', v-if='bid[1]', :fixed='object.product.baseScale')
                        i(v-else) -
                    span
                        format-price(:price='bid[0]', v-if='bid[0]', type=1, :fixed='object.product.quoteScale')
                        i(v-else) -
        div.aggregation.flex
            span
            span.text-right Aggregation
            span
                div.operation
                    button(@click='aggregationDown', :disabled='!scaleDownBtnEnable')
                        icon-down
                    label {{parseFloat(priceScale).toFixed(object.product.quoteScale)}}
                    button(@click='aggregationUp', :disabled='!scaleUpBtnEnable')
                        icon-up


</template>

<script lang="ts">

    import {DomWatch} from '@/watch';
    import {Constant} from '@/constant';
    import {Helper} from '@/helper';
    import {Collect} from '@/vendor';
    import {StoreService} from '@/store/service';
    //import {Dom, Emit, Prop} from "../component";
    import {Component, Vue, Emit, Prop} from 'vue-property-decorator'


    //@Dom('panel-order-book', require('./order-book/order-book.jade')())
    @Component
    export class OrderBookPanelComponent extends Vue {

        @Prop()
        productId: string;

        lineMax: number = 50;
        lastedAsks: any[] = [];
        lastedBids: any[] = [];
        tradePriceDiff: string = '0';
        aggregationIndex: number = 0;
        priceScale: number = 0;
        nativeScale: number = 0;
        scaleUpBtnEnable: boolean = true;
        scaleDownBtnEnable: boolean = false;

        created() {
            this.nativeScale = Number(Math.pow(0.1, this.object.product.quoteScale).toFixed(this.object.product.quoteScale));
            this.priceScale = this.nativeScale;
        }

        mounted() {
            //super.mounted();
            let bookDom = (this.$refs.book as HTMLDivElement);
            DomWatch.visibleChange(bookDom, (state: boolean) => {
                if (state) {
                    bookDom.scrollTop = (1832 - bookDom.clientHeight) / 2;
                }
            });

        }

        get orderBook(): any {

            let orderBook = Helper.Trade_margeOrderBook(this.object.orderBook, this.priceScale);

            let formatBids = [],
                formatAsks = [];

            let sizeMax = 0;
            for (let i = 0; i < this.lineMax; i++) {
                let bid = orderBook.bids.length > i ? orderBook.bids[i] : [0, 0];
                formatBids.push(bid);
                sizeMax = Math.max(sizeMax, Number(bid[1]));
            }

            formatBids.forEach((bid) => {
                bid[2] = Math.floor((bid[1] ? bid[1] / sizeMax : 0) * 100);
            });

            this.toMark(formatBids, this.lastedBids);
            this.lastedBids = formatBids;

            sizeMax = 0;
            for (let i = 0; i < this.lineMax; i++) {
                let ask = orderBook.asks.length >= this.lineMax - i ? orderBook.asks[this.lineMax - i - 1] : [0, 0];
                formatAsks.push(ask);
                sizeMax = Math.max(sizeMax, Number(ask[1]));
            }

            formatAsks.forEach((ask) => {
                ask[2] = Math.floor((ask[1] ? ask[1] / sizeMax : 0) * 100);
            });

            this.toMark(formatAsks, this.lastedAsks);
            this.lastedAsks = formatAsks;

            let firstBid = Collect(this.object.orderBook.bids).first(),
                lastAsk = Collect(this.object.orderBook.asks).first();
            if (firstBid && lastAsk) {
                this.tradePriceDiff = (lastAsk[0] - firstBid[0]).toFixed(this.object.product.quoteScale);
            }

            return {asks: formatAsks, bids: formatBids};
        }

        get object(): any {
            return StoreService.Trade.getObject(this.productId);
        }

        toMark(items: any[], lastedItems: any[]) {

            if (lastedItems.length > 0) {

                items.forEach((item: any) => {
                    let first = Collect(lastedItems).first((_item: any) => {
                        return item[0] == _item[0];
                    })
                    if (first) {
                        if (Number(first[1]) != Number(item[1])) {
                            item[3] = ['am-0-0', 'am-0-1'][Math.floor(new Date().getTime()) % 2];
                        } else {
                            item[3] = '';
                        }
                    } else {
                        item[3] = 'am-1';
                    }
                });

            }

        }

        @Emit('tabbar-change')
        tabbarChange(index: number) {
        }

        switchHistory() {
            this.tabbarChange(1);
        }

        @Emit('select')
        select(type: number, data: any) {
        }

        selectAction(type: number, data: any) {
            this.select(type, data);
        }

        aggregationDown() {
            this.aggregationIndex--;
            this.priceScale = this.nativeScale * Constant.AGGREGATION[this.aggregationIndex];
            this.scaleDownBtnEnable = this.aggregationIndex > 0;
            this.scaleUpBtnEnable = true;
        }

        aggregationUp() {
            this.aggregationIndex++;
            this.priceScale = this.nativeScale * Constant.AGGREGATION[this.aggregationIndex];
            this.scaleUpBtnEnable = this.aggregationIndex < Constant.AGGREGATION.length - 1;
            this.scaleDownBtnEnable = true;
        }

    }
</script>
