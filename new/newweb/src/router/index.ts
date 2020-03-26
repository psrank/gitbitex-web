import Vue from "vue";
import VueRouter, { RouterOptions, RouteConfig } from "vue-router";
import HomePage from "@/views/HomePage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
  {
    path: "/trade/:id",
    name: "Trade",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/TradePage.vue")
  }
] as Array<RouteConfig>;

const router = new VueRouter({
  routes
} as RouterOptions);

export default router;
