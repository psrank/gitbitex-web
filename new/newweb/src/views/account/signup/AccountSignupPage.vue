<template lang="jade">
    div.page.page-account.page-account-sign
    header-navbar
    div.container
        h2.header Sign up to
            b GITBITEX
        div.account-form
            div.form.form-horizontal
                div.form-group
                    label.control-label.col-xs-3 Email
                    div.col-xs-9
                        input.form-control(type="email", placeholder="you@example.com", disabled, ref='inputEmail', v-model='account.email')
                div.form-group
                    label.control-label.col-xs-3 Password
                    div.col-xs-9
                        input.form-control(type="password", placeholder="Minimum 8 characters", disabled, ref='inputPassword', v-model='account.password')
                    div.checkbox.col-xs-12.m-t-20
                        label
                            input(type="checkbox", value="1", v-model='checkArg')
                            | I certify that I am 18 years of age or older, and I agree to the
                            a(href="/legal/user_agreement", target="_blank") User Agreement
                            | and
                            a(href="/legal/privacy", target="_blank") Privacy Policy
                            | .
                div.form-group.submit
                    p.m-t-0.text-color-red {{error}}
                    button.btn.btn-primary.btn-block.btn-lg(@click='submit', :disabled='!account.email || !account.password') CREATE A ACCOUNT
                    p.m-t-10.text-center
                        router-link(to='signin') Already have an account?


</template>

<script lang="ts">
    import Vue from 'vue';
    import {HttpService} from './../../../service/http';
    import {Route} from "../../BasePage.vue";

    @Route('/account/signup', require('./signup.jade')())
    export class AccountSignupPage extends Vue {

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
</script>
