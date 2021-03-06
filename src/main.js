import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from 'axios'
import Loading from './components/Loading'

import stores from './store/store'
import routes from './routeConfig.js'

import filters from './filters'

//循环遍历所有过滤器
//Vue.filter(名字,函数)
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))

Vue.use(VueRouter);
Vue.use(Loading);

//引入全局的base文件
require('./assets/css/base.css');

const router = new VueRouter({
    mode: 'history', //切换路径模式，变成history模式
    scrollBehavior: () => ({y: 0}), // 滚动条滚动的行为，不加这个默认就会记忆原来滚动条的位置
    routes
});

//axios的一些配置，比如发送请求显示loading，请求回来loading消失之类的

//配置发送请求的信息
axios.interceptors.request.use(function (config) {
    stores.dispatch('showLoading');
    return config;
}, function (error) {
    return Promise.reject(error);
});

//配置请求回来的信息
axios.interceptors.response.use(function (response) {
    stores.dispatch('hideLoading');
    return response;
}, function (error) {
    return Promise.reject(error);
});

//配置请求根路径
// axios.defaults.baseURL = (process.env.NODE_ENV !== 'production' ? config.dev.httpUrl : config.build.httpUrl);

//设置post头部信息
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

//把axios对象挂到Vue原型上,其他页面在使用axios的时候直接->this.$http就可以了
Vue.prototype.$http = axios;

new Vue({
    el: '#app',
    router,
    store: stores,
    render: h => h(App)
});
