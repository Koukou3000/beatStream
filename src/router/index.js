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
            component: PageUpload
        },
        {
            path:'/trend',
            component: PageTrend
        },
        {
            path:'/detail',
            component: PageDetail
        },
        {   
            path:'/search',
            component: PageSearch
        },
        {
            path:'/user',
            component: PageProfile
        },
        
    ]
})
export default router