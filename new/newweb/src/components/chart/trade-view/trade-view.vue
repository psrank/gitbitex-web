<template lang="jade">
    div.chart.panel.chart-trade-view

        h2 PRICE CHART
            span.pannel-tabbar
                a(@click='switchPrice', :class='{active: tabIndex==0}') Price Chart
                a(@click='switchDepth', :class='{active: tabIndex==1}') Depth Chart
        div.kline(:class="{'chart-active': tabIndex==0}")
            chart-candle(:productId='productId')
        div.depth(:class="{'chart-active': tabIndex==1}")
            chart-depth(:productId='productId')

</template>

<script lang="ts">


    import {DomWatch} from './../../../watch';
    import {Dom, Prop} from "../../component";
    import {Vue} from 'vue-property-decorator'

    @Dom('chart-trade-view', require('./trade-view.jade')())
    export class TradeViewChartComponent extends Vue {

        @Prop()
        productId: string;

        tabIndex: number = 0;

        mounted() {
            super.mounted();
        }

        switchPrice() {
            this.tabIndex = 0;
            DomWatch.visibleChanged();
        }

        switchDepth() {
            this.tabIndex = 1;
            DomWatch.visibleChanged();
        }

    }
</script>
