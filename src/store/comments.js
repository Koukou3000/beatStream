export default {
    namespaced: 'comments',
    actions:{
        // 添加一条回复
        appendComment(context, params){
            let idx = params.tid-1
            let comments = context.state.commentList[idx].comments
            // 不存在评论，创建
            if(!comments){
                return new Promise((resolve)=>{
                    context.commit('CREATE_COMMENTS', params)
                    // 返回后会引起数据请求，所以必须满足同步
                    resolve({
                        code: 0,
                        msg: 'success',
                    })
                })
                
            }
            // 已存在评论，新加一条
            else{
                return new Promise((resolve)=>{
                    context.commit('APPEND_COMMENT', params)
                    resolve({
                        code: 0,
                        msg: 'success',
                    })
                })
            }
        },

        // 拉取数据 （需要排序的）
        getComments(context, params){
            let idx = params.tid - 1 
            // console.log(context.state.commentList[idx].comments)
            let comments = context.state.commentList[idx].comments  // 根据tid，取出对应索引的评论数组
            if(!comments) return {total: 0}
            let pages = Math.ceil(comments.length / 5) // 一页大小预设为5
            let sortedComm = comments
            // 给获取的内容排序    
            
            switch(params.sortType){
                case 'newest':
                    sortedComm.sort((a,b)=>{
                    return new Date(b.created_at) -  new Date(a.created_at)
                });break;
                case 'oldest':
                    sortedComm.sort((a,b)=>{
                    return new Date(a.created_at) - new Date(b.created_at)
                });break;
                case 'tracktime':
                    sortedComm.sort((a,b)=>{
                    return a.timestamp - b.timestamp
                });break;
                default: break;
            }
            let onePage = sortedComm.slice((params.page-1)*10, params.page*10) // 得到一页的内容
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
            {},{},{},{},{},
            {},{},{},{},{},
            {},{},{},{},{},
            {},{},{},
            { 
                comments: [
                    {body:'GOAT', created_at:'2023-07-02 22:17:00', timestamp: 186, user_name:'QuisYolo'},
                    {body:'That diggs on mee', created_at:'2023-07-03 13:17:00', timestamp: 13, user_name:'Isaac'},
                    {body:'OH YEAH GOLD DIGGER', created_at:'2023-07-04 12:17:00', timestamp: 8, user_name:'love my baby'},
                    {body:'simp', created_at:'2023-07-02 02:17:00', timestamp: 77, user_name:'Canes 2019'}, 
                ]},{},{},
        
        ]
    }
}