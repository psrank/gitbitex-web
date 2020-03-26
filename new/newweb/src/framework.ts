import Vue from "vue";
import VueRouter from "vue-router";
import Vuex from "vuex";

export class Framework {
  static pages: any[];
  static components: any[];

  static initModules(pages: any[], components: any[]) {
    Vue.use(VueRouter);
    Vue.use(Vuex);

    this.pages = pages;
    this.components = components;
  }

  static bootstrap() {
    let routes: any[] = [];

    this.pages.forEach((page: any) => {
      routes.push({ path: page.path, component: page, name: page.routeName });
    });

    this.components.forEach((component: any) => {
      Vue.component(component.elementName, component);
    });

    new Vue({
      router: new VueRouter({
        mode: "history",
        routes: routes
      })
    }).$mount("#App");
  }
}
