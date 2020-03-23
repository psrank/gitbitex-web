<template lang="jade">
    div.header.header-trade
        logo(@click.native='toHome')
        div.market-info-wrapper
            li
                div.product-selector-btn(
                    @mouseover="productSelectorHide(false)"
                    @mouseout="productSelectorHide(true)")
                    | {{product.baseCurrency}}/{{product.quoteCurrency}}
                    span.arrow
                    span.description
                div.product-selector-panel(
                    v-show='productSelectorShowing',
                    @mouseover="productSelectorHide(false)"
                    @mouseout="productSelectorHide(true)")
                    panel-trade(:groups='productGroups')
            li
                div.product-last-price
                    | {{parseFloat(product.price).toFixed(product.quoteScale)}} {{product.quoteCurrency}}
                    span.description Last trade price
                div.product-last-price
                    span(:class="{'text-color-red': product.rate24h < 0, 'text-color-green': product.rate24h >= 0}")
                        | {{product.rate24h}} %
                    span.description 24h price
                div.product-last-price
                    | {{product.volume24h}} {{product.baseCurrency}}
                    span.description 24h volume
        div.navbar
            li(v-if='!logined')
                a(@click='toSign') Sign in
            li.user(@click.stop='dropdownToggle', v-if='logined')
                a {{userInfo.nickname}}
                span.avatar
                    img(:src='userInfo.avatar')
                span.arrow
            div.dropdown-panel(:class='{active: showDropdown}')
                span.group
                    router-link(to='/account/wallet') My Wallets
                    router-link(to='/account/order') My Orders
                span.group
                    router-link(to='/account/profile') My Profile
                    a(@click='signOut') Sign out

</template>

<script lang="ts">


    import {Constant} from './../../../constant';
    import {StoreService} from './../../../store/service';
    import {Dom, Prop} from "../../component";
    import {Vue} from 'vue-property-decorator'

    @Dom('header-trade', require('./trade.jade')())
    export class TradeHeaderComponent extends Vue {

        @Prop()
        products: any[];

        @Prop()
        productId: string;

        private productSelectorShowing: boolean = false;
        private timeout: any;
        private nickname: string = '';
        private showDropdown: boolean = false;
        private documentListener: any;

        mounted() {
            super.mounted();
            this.nickname = StoreService.Account.userInfo.nickname;
            this.documentListener = document.addEventListener('click', () => {
                this.showDropdown = false;
            });
        }

        get userInfo() {
            return StoreService.Account.userInfo;
        }

        get product() {
            return StoreService.Trade.getObject(this.productId).product;
        }

        get productGroups() {

            let groups: any = {};

            StoreService.Trade.products.forEach((item: any) => {
                item.symbol = Constant.CURRENCY_SYMBOL[item.quoteCurrency];
                groups[item.quoteCurrency] || (groups[item.quoteCurrency] = []);
                groups[item.quoteCurrency].push(item);
            });

            return groups;

        }

        productSelectorHide(hidden: boolean) {
            clearTimeout(this.timeout);
            this.timeout = setTimeout(() => {
                this.productSelectorShowing = !hidden;
            }, 100);
        }

        dropdownToggle() {
            this.showDropdown = !this.showDropdown;
        }

        destroyed() {
            clearInterval(this.documentListener);
        }

        signOut() {
            StoreService.Account.signOut();
            this.showDropdown = false;
        }

        toSign() {
            this.$router.replace(`/account/signin?ref=${this.$route.fullPath}`)
        }

        toHome() {
            this.$router.push(`/`);
        }

        get logined() {
            return StoreService.Account.logined;
        }

    }
</script>
