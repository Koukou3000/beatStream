import Vue from 'vue'
import Vuex from 'vuex'

// 引用其他模块
import track from './track'
import comments from './comments'

Vue.use(Vuex)

export default new Vuex.Store({
    modules:{
        track,
        comments
    }
})