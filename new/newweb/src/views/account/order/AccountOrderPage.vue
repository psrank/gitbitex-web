<template lang="jade">
    div.page.page-account.page-account-order
        header-navbar(active=1)
        div.account-container
            h1 MY ORDERS
                v-select.select-lg(:options="products", :search='true', v-model="selected")
            div.content
                panel-order-list(:orders='orders', :product='product', theme='light', :loading='loading')
            div.pagination-wrapper(v-show='!loading')
                div.pagination-inner
                    pagination(v-model='cursorDirection', count=10000)
</template>

<script lang="ts">

    import Vue from 'vue';
    import {Moment} from './../../../vendor';
    import {Watch} from './../../../component/component';
    import {StoreService} from './../../../store/service';
    import {Helper} from './../../../helper';
    import {HttpService} from './../../../service/http';
    import {Route} from "../../BasePage.vue";

    @Route('/account/order', require('./order.jade')())
    export class AccountOrderPage extends Vue {

        selected = 0;
        selectedProduct = '';
        products: string[] = [];
        orders: any[] = [];
        loading = false;
        cursor: any = {};
        cursorDirection = 1;
        cursorBefore = 0;
        cursorAfter = 0;

        created() {
            this.products = Helper.map(StoreService.Trade.products, (item: any) => {
                return item.id;
            });
        }

        mounted() {
            this.needLogin = true;
            super.mounted();
            this.pageLoadingHide();
            this.onSelected();
            this.setTitle('Gitbiex | Digital Asset Exchange');
        }

        get product() {
            return StoreService.Trade.getObject(this.products[this.selected]).product;
        }

        @Watch('selected')
        onSelected() {
            this.loading = true;
            HttpService.Order.getOrders(this.product.id, 30, [], this.cursor).then((response: any) => {
                response.items.forEach((order: any) => {
                    order.statusFormat = order.status;
                    order.price = Number(order.price).toFixed(this.product.quoteScale);
                    order.fillFees = Number(order.fillFees).toFixed(this.product.quoteScale);
                    order.filledSize = Number(order.filledSize).toFixed(4);
                    order.size = Number(order.size).toFixed(4);
                    order.timeFormat = Moment(order.createdAt).format('MM-DD hh:mm:ss');
                    order.priceFormat = Number(order.price) ? order.price : 'MARKET';
                });
                this.cursorAfter = response.after;
                this.cursorBefore = response.before;
                this.orders = response.items;
                this.loading = false;
            });
        }

        @Watch('cursorDirection')
        onCursorDirection(_new: number, _old: number) {
            if (_new > _old) {
                this.cursor = {
                    after: this.cursorAfter
                }
            } else {
                this.cursor = {
                    before: this.cursorBefore
                }
            }
            this.onSelected();
        }

    }
</script>
