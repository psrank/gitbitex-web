import Vue from 'vue'
import Vuex from 'vuex';

Vue.use(Vuex);

// export default new Vuex.Store({
//   state: {
//   }
// })

export class Store {
  protected store: any;

  constructor() {
    this.store = new Vuex.Store(this.storeOptions);
  }

  get storeOptions() {
    return {};
  }
}
