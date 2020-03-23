<template lang="jade">
    div.panel.panel-order-list(:class='theme')
        div.thead
            div.row
                span Side
                span
                    label Size
                        small ({{product.baseCurrency}})
                    label Filled
                        small ({{product.baseCurrency}})
                span
                    label Price
                        small ({{product.quoteCurrency}})
                    label Fee
                        small ({{product.quoteCurrency}})
                span Time
                span.text-center Status
        div.tbody(v-show='!loading')
            div.row(v-for='order in orders', :class="{disabled: order.status!='open'}")
                span(:class='order.side') &nbsp;&nbsp;&nbsp;{{order.side}}
                span
                    label {{order.size}}
                    label {{order.filledSize}}
                span
                    label {{order.priceFormat}}
                    label {{order.fillFees}}
                span {{order.timeFormat}}
                span.text-center {{order.statusFormat}}
                    b(v-if="order.status=='open'")   (
                        a(@click='cancel(order)') cancel
                        | )
            div.no-data(v-if='orders.length==0') No orders to show
        div.tbody(v-show='loading')
            div.no-data Loading...


</template>

<script lang="ts">

    import {HttpService} from './../../../service/http';
    import {Dom, Prop} from "../component";
    import {Component, Vue} from 'vue-property-decorator'

    @Dom('panel-order-list', require('./order-list/order-list.jade')())
    @Component
    export class OrderListPanelComponent extends Vue {

        @Prop()
        orders: any[];

        @Prop()
        theme: string;

        @Prop()
        product: any;

        @Prop()
        loading: boolean;

        mounted() {
            super.mounted();
        }

        cancel(order: any) {

            order.status = 'canceling';
            order.statusFormat = 'canceling';

            HttpService.Order.cancelOrder(order.id).then(() => {
                order.status = 'cancelled';
                order.statusFormat = 'cancelled';
            })

        }

    }
</script>
