<template lang="jade">
    div.page.page-account.page-account-sign
    header-navbar
    div.container
        h2.header Forgot your password?
        div.account-form
            div.form.form-horizontal
                div.form-group
                    label.control-label.col-xs-3 Email
                    div.col-xs-9
                        input.form-control(type="email", placeholder="you@example.com", v-model='account.email')
                div(v-show='codeIsSend')
                    p.success-tip We sent verification code to your email, and enter the verification code
                    div.form-group
                        label.control-label.col-xs-3 Verify Code
                        div.col-xs-9
                            input.form-control(type="text", placeholder="enter the verification code", v-model='account.verifyCode')
                    div.form-group
                        label.control-label.col-xs-3 Password
                        div.col-xs-9
                            input.form-control(type="password", placeholder="enter the new password", v-model='account.newPassword')
                div.form-group.submit
                    p.error {{error}}
                    button.btn.btn-primary.btn-block.btn-lg(@click='submit') RESET PASSWORD
</template>

<script lang="ts">
    import Vue from 'vue';
    import {HttpService} from './../../../service/http';
    import {Route} from "../BasePage.vue";

    @Route('/account/forgot', require('./forgot/forgot.jade')())
    export class AccountForgotPage extends Vue {

        account: any = {};
        error: string = '';
        codeIsSend: boolean = false;

        mounted() {
            super.mounted();
            this.pageLoadingHide();
            this.setTitle('Gitbiex | Digital Asset Exchange');
        }

        submit() {
            if (this.codeIsSend) {
                if (!this.account.newPassword) {
                    this.error = "Password is required";
                    return;
                }

                HttpService.Account.resetPassword(this.account).then(() => {
                    this.$router.replace('signin?alert=forgot');
                }).catch((error: any) => {
                    this.error = error.response.data.message;
                });

            } else {
                let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
                if (!reg.test(this.account.email)) {
                    this.error = "Email doesn't look correct";
                    return;
                }

                HttpService.Account.sendEmailVerifyCode(this.account.email).then(() => {
                    this.codeIsSend = true;
                }).catch((error: any) => {
                    this.error = error.response.data.message;
                });
            }
        }
    }
</script>
