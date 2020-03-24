<template lang="jade">
    div.header.header-navbar
        div.navbar-inner
            div.menu(@click.stop='menuDropdownToggle')
                icon-hamburger
            logo(theme='light', @click.native='toHome')
            div.navbar
                li(:class='{active: active==2}')
                    router-link(to='/trade/BTC-USDT') Trade
                li(:class='{active: active==0}')
                    router-link(to='/account/wallet') My Wallets
                li(:class='{active: active==1}')
                    router-link(to='/account/order') My Orders
                li(v-if='!logined')
                    a(@click='toSign') Sign in
                li.user(@click.stop='dropdownToggle', v-if='logined')
                    a {{userInfo.nickname}}
                    span.avatar
                        img(:src='userInfo.avatar')
                    span.arrow
                div.dropdown-panel(:class='{active: showDropdown}')
                    span.info
                        | {{userInfo.nickname}}
                    span.my-link
                        router-link(to='/account/wallet') My Wallets
                        router-link(to='/account/order') My Orders
                    span.group
                        router-link(to='/account/profile') My Profile
                        a(@click='signOut') Sign out
                div.dropdown-panel.dark(:class='{active: showMenuDropdown}')
                    span.group
                        router-link(to='/trade/BTC-USDT') Trade
</template>

<script lang="ts">


    import {StoreService} from '../../store/service';
    //import {Dom, Prop} from "../component";
    import {Component, Vue, Prop} from 'vue-property-decorator'

    //@Dom('header-navbar', require('./navbar/navbar.jade')())
    @Component
    export class NavbarHeaderComponent extends Vue {

        @Prop()
        active: number;

        private nickname: string = '';
        private showDropdown: boolean = false;
        private showMenuDropdown: boolean = false;
        private documentListener: any;

        mounted() {
           // super.mounted();
            this.documentListener = document.addEventListener('click', () => {
                this.showDropdown = false;
                this.showMenuDropdown = false;
            });
        }

        get userInfo() {
            return StoreService.Account.userInfo;
        }

        dropdownToggle() {
            this.showDropdown = !this.showDropdown;
            this.showMenuDropdown = false;
        }

        menuDropdownToggle() {
            this.showMenuDropdown = !this.showMenuDropdown;
            this.showDropdown = false;
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
            this.$router.replace(`/`);
        }

        get logined() {
            return StoreService.Account.logined;
        }

    }
</script>
