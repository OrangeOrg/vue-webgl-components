import vuewebglplugin from './vue-webgl-plugin.vue'
import globe from '../globe.js'

// 这一步判断window.Vue是否存在，因为直接引用vue.min.js， 它会把Vue绑到Window上，我们直接引用打包好的js才能正常跑起来。
// if (typeof window !== 'undefined' && window.Vue) {
//     Vue.prototype.$globe = globe
//     window.Vue.component('vue-webgl-plugin', vuewebglplugin)
// }

//这样就可以使用Vue.use进行全局安装了。
vuewebglplugin.install = function (Vue) {
    //if (typeof window !== 'undefined' && window.Vue) {
        Vue.prototype.$globe = globe
        Vue.component('vue-webgl-plugin', vuewebglplugin)
    //}
}


export default vuewebglplugin

// if (typeof window !== 'undefined' && window.Vue) {
//     plugin(window.Vue)
// }
// function plugin(Vue,options={}){
//     Vue.prototype.$globe=globe
//     Vue.component(vuewebglplugin.name, vuewebglplugin);
// }
//export {vuewebglplugin} ;