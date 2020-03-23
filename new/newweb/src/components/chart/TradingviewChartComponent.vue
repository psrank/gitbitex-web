<template lang="jade">
    div.chart.panel.chart-tradingview
        div.chart-container(ref='container')
        div.chart-loading(v-if='loading')
            span.loading-spinner

</template>

<script lang="ts">


    import {DomWatch} from '@/watch';
    import {StoreService} from '@/store/service';
    import {Dom, Prop} from "../component";
    import {getTradingViewConfig} from '@/chart/config';
    import {UDFCompatibleDatafeed} from '@/chart/datafeed';
    import {Component, Vue} from 'vue-property-decorator'

    declare var TradingView: any;
    declare var AmCharts: any;

    //@Dom('chart-tradingview', require('./tradingview/tradingview.jade')())
    @Component
    export class TradingviewChartComponent extends Vue {

        @Prop()
        productId: string;

        loading: boolean = false;
        chart: any;

        mounted() {

            //super.mounted();

            let containerId = `TradeView-${String(Math.random()).slice(2)}`,
                container = this.$refs.container as HTMLDivElement;

            container.setAttribute('id', containerId);

            DomWatch.visibleChange(container, (state: boolean) => {
                if (state && !this.chart) {
                    this.loading = true;
                    this.chart = new TradingView.widget(
                        getTradingViewConfig(containerId, new UDFCompatibleDatafeed(this.productId, 5, 1))
                    );
                    this.chart.onChartReady(() => {
                        this.chart.chart().createStudy('Moving Average', false, false, [10], null, {
                            'Plot.color': '#626D80',
                            'Plot.linewidth': 2
                        });
                        this.chart.chart().createStudy('Moving Average', false, false, [30], null, {
                            'Plot.color': '#B7692B',
                            'Plot.linewidth': 2
                        });
                        this.loading = false;
                    });
                }
            });

        }

        get object() {
            return StoreService.Trade.getObject(this.productId);
        }

    }
</script>
