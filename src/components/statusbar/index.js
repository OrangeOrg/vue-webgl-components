import statusbar from './statusbar.vue'

// 这一步判断window.Vue是否存在，因为直接引用vue.min.js， 它会把Vue绑到Window上，我们直接引用打包好的js才能正常跑起来。
if (typeof window !== 'undefined' && window.Vue) {
    //Vue.prototype.$globe = globe
    window.Vue.component(statusbar.name, statusbar)
}

//这样就可以使用Vue.use进行全局安装了。vue单文件项目中写法
statusbar.install = function (Vue) {
    Vue.component(statusbar.name, statusbar)
}


export default statusbar
