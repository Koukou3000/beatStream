export default {
    namespaced: 'comments',
    actions:{
        getComments(context, params){
            let idx = params.tid - 1
            // mysql可以用 order by 排序得到数据，这里只做分页 
            let comments = context.state.commentList[idx].comments 
            if(!comments) return {total: 0}
            let pages = Math.ceil(comments.length / 5) 
            let onePage = comments.slice((params.page-1)*10, params.page*10) // 得到一页的内容

            let ret = {
                pages: pages,
                page: params.page,
                total: comments.length,
                data: onePage
            }
            return ret // 页数和数据
        }
    },
    mutations:{

    },
    state:{
        commentList:[
            {},{},{},{},{},{},{},{},{},{},{},
            {
                //12
                comments: [
                    {body:'GOAT', created_at:'2023-07-02 22:17:00', timestamp: 186, user_name:'QuisYolo'},
                    {body:'That diggs on mee', created_at:'2023-07-02 22:17:00', timestamp: 13, user_name:'Isaac'},
                    {body:'OH YEAH GOLD DIGGER', created_at:'2023-07-02 22:17:00', timestamp: 8, user_name:'love my baby'},
                    {body:'simp', created_at:'2023-07-02 22:17:00', timestamp: 77, user_name:'Canes 2019'},    
                     
                
                    
                ]
            }
        
        ]
    }
}