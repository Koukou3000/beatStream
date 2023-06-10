import VueRouter from 'vue-router'

import PageUpload from '../pages/PageUpload'
import PageTrend from '../pages/PageTrend'
import PageDetail from '../pages/PageDetail'
import PageSearch from '../pages/PageSearch'
import PageProfile from '../pages/PageProfile'

const router = new VueRouter({
    routes:[
        {
            path:'',
            redirect:'/trend'
        },
        {
            path:'/upload',
            component: PageUpload,
            meta:{
                title: '上传'
            }
        },
        {
            path:'/trend',
            component: PageTrend,
            meta:{
                title: '发现 BeatStream 的热门趋势'
            }
        },
        {
            path:'/detail',
            component: PageDetail,
            meta:{
                title: 'Streaming xxx'
            }
        },
        {   
            path:'/search',
            component: PageSearch,
            meta:{
                title: 'xxx 的搜索结果'
            }
        },
        {
            path:'/user',
            component: PageProfile,
            meta:{
                title: '个人资料'
            }
        },
        
    ]
})

router.afterEach((to)=>{
    document.title = to.meta.title
})
export default router