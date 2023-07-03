export default {
    namespaced: 'comments',
    actions:{
        // 添加一条回复
        appendComment(context, params){
            let idx = params.tid-1
            let comments = context.state.commentList[idx].comments
            // 不存在评论，创建
            if(!comments){
                context.commit('CREATE_COMMENTS', params)
                return {
                    code: 0,
                    msg: 'success'
                }
            }
            // 已存在评论，新加一条
            else{
                context.commit('APPEND_COMMENT', params)
                return {
                    code: 0,
                    msg: 'success'
                }
            }

        },

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
            let ret = {total: 0}
            let idx = params.tid - 1
            let comments = context.state.commentList[idx].comments
            if(!comments) return ret
            comments = comments.slice(0, 200)
            ret = {
                total: comments.length,
                data: comments
            }
            return ret  // 所有的评论
        }
    },
    mutations:{
        APPEND_COMMENT(state, params){
            let idx = params.tid - 1
            state.commentList[idx].comments.push(params.comment)
            
        },
        CREATE_COMMENTS(state, params){
            let idx = params.tid - 1
            state.commentList[idx] = {comments:[params.comment]}
        }
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
            },
            {}
        
        ]
    }
}