<template lang="jade">
    div.header.header-home
        div.navbar-inner
            logo(theme='light')
            div.navbar
                li
                    router-link(to='/') Help
                li
                    router-link(to='/') Api
                li
                    router-link(to='/') Fees
                li
                    router-link(to='/trade/BTC-USDT') View Exchange
                li.login
                    router-link(to='/account/signin') Log In
                li.signup
                    router-link(to='/account/signup') Sign Up
            div.menu(@click.stop='dropdownToggle')
                icon-hamburger(v-show='!showDropdown')
                span.close(v-show='showDropdown') ✕
            div.dropdown-panel.dark(:class='{active: showDropdown}')
                span.group
                    router-link(to='/') Help
                    router-link(to='/') Api
                    router-link(to='/') Fees
                    router-link(to='/trade/BTC-USDT') View Exchange

</template>

<script lang="ts">

    import {StoreService} from '../../store/service';
    import {Dom, Prop} from "../component";
    import {Component, Vue} from 'vue-property-decorator'

    //@Dom('header-home', require('./home/home.jade')())
    @Component
    export class NavbarHomeComponent extends Vue {

        @Prop()
        active: number;

        private nickname: string = '';
        private showDropdown: boolean = false;
        private documentListener: any;

        mounted() {
            //super.mounted();
            this.documentListener = document.addEventListener('click', () => {
                this.showDropdown = false;
            });
        }

        get userInfo() {
            return StoreService.Account.userInfo;
        }

        dropdownToggle() {
            this.showDropdown = !this.showDropdown;
        }

        destroyed() {
            clearInterval(this.documentListener);
        }

    }
</script>
