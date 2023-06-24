import VueRouter from 'vue-router'

import PageUpload from '../pages/PageUpload'
import PageTrend from '../pages/PageTrend'
import PageDetail from '../pages/PageDetail'
import PageSearch from '../pages/PageSearch'


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
        },
        {
            name:'trackDetail',
            path:'/detail/:tid',
            component: PageDetail,
        },
        {
            path:'/upload',
            component: PageUpload,
            meta:{
                title: '在 BeatStream 上传歌曲'
            }
        },
       
        
    ]
})



export default router