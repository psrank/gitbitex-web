import { DomWatch } from "@/watch";
import { StoreService } from "@/store/service";
import { App } from "@/app";
import { BaseComponent } from "@/vendor";
import { Route } from "vue-router/types/router";
import { Watch } from "vue-property-decorator";

// export function Route(path: string, template: string) {
//     return function (target: any) {
//         target.path = path;
//         target.routeName = target.name;
//         return BaseComponent({
//             template: `${require('./page.jade')()}`.replace('@template@', template)
//         })(target);
//     }
// }

export class BasePage {
  // BaseFramework {
  // Access path
  static path: string;

  element: HTMLElement | undefined;
  route: Route | undefined;
  private page: {
    loading: boolean;
    error: string;
  } = {
    loading: false,
    error: null
  };

  isLogin = false;
  autoInitShare = true;

  needLogin = false;

  init() {
    this.element = this.$el;
    App.loading(true);
    this.signStateChange();
    DomWatch.visibleChanged();
  }

  setTitle(title: string) {
    document.title = title;
  }

  @Watch("logined")
  private signStateChange() {
    if (this.needLogin && !this.logined) {
      this.$router.replace(`/account/signin?ref=${this.$route.fullPath}`);
    }
  }

  get logined() {
    return StoreService.Account.logined;
  }

  pageLoadingHide() {
    App.loading(false);
    this.page.loading = false;
  }
}
