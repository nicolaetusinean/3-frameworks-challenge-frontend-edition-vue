import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueInject from 'vue-inject'
import VueRx from 'vue-rx'
import Beers from './app/beers/Beers'
import FavouriteBeers from './app/beer-favourites/FavouriteBeers'
import AdvancedSearch from './app/search/AdvancedSearch'
import PageNotFound from './app/page-not-found/PageNotFound'
import BasicSearch from "./app/search/BasicSearch";

Vue.config.productionTip = false;

require('./services.js');

const routes = [
  { path: '/beers', component: Beers },
  { path: '/favourites', component: FavouriteBeers },
  { path: '/basic-search', component: BasicSearch },
  { path: '/advanced-search', component: AdvancedSearch },
  { path: '*', component: PageNotFound }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

Vue.use(VueRouter);
Vue.use(VueInject);
Vue.use(VueRx);
new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
