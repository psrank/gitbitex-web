<template lang="jade">
    </template>

    <script lang="ts">

import { HttpService } from './../../../service/http';
import { Page, Route } from "../../Page.vue";

@Route('/account/signup', require('./signup.jade')())
export class AccountSignupPage extends Page {

    account: {
        email: string,
        password: string
    } = {
        email: '',
        password: ''
    };

    error: string = '';
    checkArg: number = 0;

    mounted() {
        super.mounted();
        this.pageLoadingHide();
        this.setTitle('Gitbiex | Digital Asset Exchange');
        setTimeout(() => {
            (this.$refs.inputEmail as HTMLInputElement).disabled = false;
            (this.$refs.inputPassword as HTMLInputElement).disabled = false;
        }, 400)

    }

    submit() {

        if (!this.checkArg) {
            this.error = 'Please accept the user agreement';
            return;
        }

        HttpService.Account.signup(this.account).then(() => {
            this.$router.push(`/account/signin`);
        }).catch((res: any) => {
            this.error = res.message;
        });


    }

}