import Vue from 'vue';
import Vuex from 'vuex';
// import createLogger from 'vuex/dist/logger';
import Images from "./images.store.js";

Vue.use(Vuex);
// const debug = process.env.NODE_ENV !== 'production';
export default new Vuex.Store({
   modules: {
      Images
   },
   strict: true,
//    plugins: debug? [ createLogger() ] : [],
})