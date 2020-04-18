import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import elementUi from 'element-ui'
import Moment from 'moment'
Vue.prototype.moment = Moment
// import store from '../store/store.js'
// axios.defaults.headers.common['Authorization'] = store.state.token

import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/reset.css'
import './assets/styles/border.css'
import './assets/styles/iconfont.css'
import qs from 'qs';
Vue.prototype.$qs = qs

import axios from 'axios'

axios.defaults.baseURL='http://localhost:8181'
axios.defaults.withCredentials = true
Vue.prototype.$axios = axios


Vue.config.productionTip = false
fastClick.attach(document.body)
Vue.use(elementUi, {
    size: 'small'
});
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App),
    components: { App }
    // template: '<App/>'
})


    