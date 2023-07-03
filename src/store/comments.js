export default {
    namespaced: 'comments',
    actions:{
        // 拉取需要排序的数据
        getComments(context, params){
            let idx = params.tid - 1
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
        },
        // 拉取展示在进度条下的数据
        get200Comments(context, params){
            let idx = params.tid - 1
            let comments = context.state.commentList[idx].comments
            if(!comments) return {total:0}
            comments = comments.slice(0, 200)
            let ret = {
                total: comments.length,
                data: comments
            }
            return ret  // 所有的评论
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