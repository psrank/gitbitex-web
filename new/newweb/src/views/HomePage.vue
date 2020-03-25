<template lang="jade">
    div.page.page-home
    div.header-wapper
        header-home
    div.landing
        span The most trusted platform for trading cryptocurrency
        p Gitbitex offers individuals the ability to trade a variety of digital assets on a secure, insurance backed platform.
        button GET STARTED
    div.products
        chart-slider
    div.introduction
        h2 Gitbitex is the best place to trade digital currency
        div.items
            div.item
                icon-code
                b Industry leading API
                span Our Websocket feed lets you easily gain access to real-time market data, while our trading API lets you develop secure, programmatic trading bots.
                router-link(to='/') Full API documentation →
            div.item
                icon-cert
                b Insurance protection
                span All digital assets held in online storage are fully insured. All USD balances are covered by FDIC insurance, up to a maximum of $250,000 per customer.
                router-link(to='/') Learn more →
            div.item
                icon-bar-down
                b 0% maker fees
                span Gitbitex offers no fees on maker trades and offers volume-based discounts on all taker fees, going as low as 0.1%.
                router-link(to='/') See our fee structure →
    div.footer
        span © 2018 Gitbitex

</template>

<script lang="ts">
//import Vue from "vue";
//import { Route } from "./BasePage";
import { Component } from "vue-property-decorator";
import IconCodeComponent from "@/components/icon/IconCodeComponent.vue";
import IconCertComponent from "@/components/icon/IconCertComponent.vue";
import ChartSliderComponent from "@/components/chart/ChartSliderComponent.vue";
import NavbarHomeComponent from "@/components/header/NavbarHomeComponent.vue";
import { mixins } from "vue-class-component";
import PageMixin from "@/shared/pageMixin";

//@Route('/', require('./home/home.jade')())
@Component({
  components: {
    IconCodeComponent,
    IconCertComponent,
    ChartSliderComponent,
    NavbarHomeComponent
  }
})
export default class HomePage extends mixins(PageMixin) {
  mounted() {
    //super.mounted();
    this.pageLoadingHide();
    this.setTitle("Gitbitex | Digital Asset Exchange");
  }
}
</script>
