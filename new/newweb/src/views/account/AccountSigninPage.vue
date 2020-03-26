<template lang="jade">
    div.page.page-account.page-account-sign
    header-navbar
    div.container
        h2.header Sign in to
            b GITBITEX
        div.account-form
            p.success-tip(v-if='alert') {{alert}}
            div.form.form-horizontal
                div.form-group
                    label.control-label.col-xs-3 Email
                    div.col-xs-9
                        input.form-control(type="email", placeholder="you@example.com", disabled, ref='inputEmail', v-model='account.email')
                div.form-group
                    label.control-label.col-xs-3 Password
                    div.col-xs-9
                        input.form-control(type="password", placeholder="Minimum 8 characters", disabled, ref='inputPassword', v-model='account.password')

                div.form-group.submit
                    p.error {{error}}
                    button.btn.btn-primary.btn-block.btn-lg(@click='submit') SIGN IN
                    p.m-t-10.text-center
                        router-link(to='forgot') Forgot password?
                        |
                        router-link(to='signup') Don't have an account?

</template>

<script lang="ts">
import Vue from "vue";
import { StoreService } from "@/store/service";
import { HttpService } from "@/service/http";
import { mixins } from "vue-class-component";
import PageMixin from "@/shared/pageMixin";
import ModalMixin from "@/shared/modalMixin";
import { RawLocation } from "vue-router";
//import {Route} from "../BasePage.vue";

//@Route('/account/signin', require('./signin/signin.jade')())
export class AccountSigninPage extends mixins(PageMixin, ModalMixin) {
  account: {
    email: string;
    password: string;
  } = {
    email: "",
    password: ""
  };

  error = "";
  alert = "";

  mounted() {
    //super.mounted();
    this.pageLoadingHide();
    this.setTitle("Gitbiex | Digital Asset Exchange");
    setTimeout(() => {
      (this.$refs.inputEmail as HTMLInputElement).disabled = false;
      (this.$refs.inputPassword as HTMLInputElement).disabled = false;
    }, 400);

    if (this.$route.query.alert) {
      if (this.$route.query.alert == "forgot") {
        this.alert =
          "Your password has been reset! You can now continue below.";
      }
    }
  }

  async submit() {
    const response = await HttpService.Account.signin(
      this.account.email,
      this.account.password
    );
    try {
      HttpService.Account.saveToken(response.data.toString());
      StoreService.Account.current(() => {
        if (this.$route.query.ref) {
          this.$router.push(this.$route.query.ref[0] as RawLocation);
        } else {
          this.$router.push(`/account/profile`);
        }
      });
    } catch (err) {
      this.error = err.message;
    }
  }
}
</script>
