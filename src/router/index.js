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
            path:'/trend',
            component: PageTrend,
            meta:{
                title: '发现 BeatStream 的热门趋势'
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
            path:'/detail',
            component: PageDetail,
            meta:{
                title: 'Streaming xxx'
            }
        },
        {
            path:'/upload',
            component: PageUpload,
            meta:{
                title: '上传'
            }
        },
        {
            path:'/user',
            component: PageProfile,
            meta:{
                title: '个人资料'
            }
        },
        {
            path:'/likes',
            redirect:'/user'    
        }
        
    ]
})

router.afterEach((to)=>{
    document.title = to.meta.title
})
export default router