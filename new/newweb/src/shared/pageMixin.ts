import { Component, Vue, Watch } from "vue-property-decorator";
import { Route } from "vue-router/types/router";
import { App } from "@/app";
import { DomWatch } from "@/watch";
import { StoreService } from "@/store/service";

@Component
export default class PageMixin extends Vue {
  static path: string;

  //element: HTMLElement | undefined;
  route: Route | undefined;
  private page: {
    loading: boolean;
    error: string;
  } = {
    loading: false,
    error: ""
  };

  isLogin = false;
  autoInitShare = true;
  needLogin = false;

  init() {
    //this.element = this.$el;
    App.loading(true);
    this.signStateChange();
    DomWatch.visibleChanged();
  }

  setTitle(title: string) {
    document.title = title;
  }

  @Watch("loggedIn")
  private signStateChange() {
    if (this.needLogin && !this.loggedIn) {
      this.$router.replace(`/account/signin?ref=${this.$route.fullPath}`);
    }
  }

  get loggedIn() {
    return StoreService.Account.loggedIn;
  }

  pageLoadingHide() {
    App.loading(false);
    this.page.loading = false;
  }
}
