import viewer from './viewer/index.js';
import statusbar from './statusbar/index.js';
import header from './header/index.js'
import boarder from "./boarder/index.js";

export default {
    install(Vue){
        Vue.use(viewer)
        Vue.use(statusbar)
        Vue.use(header)
        Vue.use(boarder)
    }
}
export {
    viewer,
    statusbar,
    header,
    boarder
}