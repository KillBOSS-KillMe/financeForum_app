import Vue from 'vue'
import App from './App'
import pageSearch from './components/pageSearch.vue'
import uniLoadMore from './components/uni-load-more.vue'
Vue.config.productionTip = false
Vue.component('pageSearch',pageSearch)
Vue.component('uniLoadMore',uniLoadMore)
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
