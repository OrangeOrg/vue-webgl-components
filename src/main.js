import Vue from 'vue'
import App from './App.vue'

import viewer from './components/viewer/index.js'
Vue.use(viewer)

import statusbar from './components/statusbar/index.js'
Vue.use(statusbar)

import customheader from './components/header/index.js'
Vue.use(customheader)

import customboard from './components/boarder/index.js'
Vue.use(customboard)

//扩展全局属性，所有vue组件内部访问
// import globe from './components/globe.js'
// import statusbar from './components/statusbar/index';
//Vimport header from './components/header/index';
// Vue.prototype.$globe = globe


let app=new Vue({
  el: '#app',
  render: h => h(App)
})
// window.self=app
