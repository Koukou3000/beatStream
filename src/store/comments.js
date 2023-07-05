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
            {
                comments:[
                    {body:'God, i listen to this song so much for the satisfying drum roll', created_at:'2020-07-01 22:02:00', timestamp: 181, user_name:'inversionist5928'},
                    {body:'Does anyone know the name of the instrument that stars playing those high pitched, slow melodies at about here?', 
                        created_at:'2019-07-01 22:02:00', timestamp: 153, user_name:'WangleLine'},
                    {body:'t sounds like a bagpipe to me.', created_at:'2019-07-02 22:02:00', timestamp: 160, user_name:'roverdpwn'},
                    {body:'A kind of uilleann pipes i think.', created_at:'2019-07-02 23:02:00', timestamp: 161, user_name:'xanto6467'},
                    {body:'so calming', created_at:'2023-05-02 23:02:00', timestamp: 25, user_name:'orikku'},
                    {body:' -... . .-.. .. . ...- .   .. -.    -.-- --- ..-     ..-. --- .-. . ...- . .-.    ..    .-.. --- ...- .   -.-- --- ..-    ..-. --- .-. . ...- . .-.    .. ..-.    -.... . .-. .  .----. ...    -. ---     ... --- ..- .-..    .... . .-. .It means literally " I   believe  in   you    forever,   i   love  you   forever   if   there \'s   no    soul   here"',
                         created_at:'2019-07-01 14:02:00', timestamp: 1, user_name:'xanto6467'},
                    {body:'The track evokes an emotion that can only be described as reflecting towards an Eden.', 
                         created_at:'2023-07-04 21:02:00', timestamp: 13, user_name:'mirumizure'},
                    {body:'Camellia makes tropical house owo', created_at:'2019-07-05 14:02:00', timestamp: 64, user_name:'anotherguy3554'},
                ]
            },
            {
                comments:[
                    {body:'riding a helicopter on borderless sand', created_at:'2022-07-02 22:02:00', timestamp: 5, user_name:'blackglitter'},
                    {body:'Nero vibes', created_at:'2023-07-02 22:02:00', timestamp: 20, user_name:'fall through'},
                    {body:'went through abyss', created_at:'2022-12-02 22:02:00', timestamp: 44, user_name:'riz'},
                    {body:'beauty👌', created_at:'2022-05-02 22:02:00', timestamp: 66, user_name:'Musa'},
                    {body:'who is the vocal?', created_at:'2023-06-02 22:02:00', timestamp: 59, user_name:'tangerine'},
                    {body:'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
                         created_at:'2023-04-23 22:02:00', timestamp: 48, user_name:'BLYSS'},
                ]
            },
            {
                comments:[
                    {body:'i love this and you', created_at:'2020-07-02 22:02:00', timestamp: 20, user_name:'Hatim'},
                    {body:'SO creative, love it alot', created_at:'2021-07-02 22:02:00', timestamp: 47, user_name:'Darby'},
                    {body:'this guitar is the coolest', created_at:'2022-07-02 22:02:00', timestamp: 49, user_name:'Airuei'},
                    {body:'is it possible to have a download link for this beauty?', created_at:'2020-07-02 22:02:00', timestamp: 163, user_name:'Matthewbass'},
                    {body:'I WILL', created_at:'2020-07-30 22:02:00', timestamp: 23, user_name:'mallorn1'},
                    {body:'My favorite remix of any madeon song so far. This is absolutely incredible', created_at:'2020-07-02 19:02:00', timestamp: 70, user_name:'Tonydml5'},
                    {body:'BE FINE', created_at:'2020-07-02 22:03:00', timestamp: 24, user_name:'mallorn1'},
                   
                ]
            },
            {},{},
            {},{},{},{},{},
            {},{},{},{},{},
            {
                comments: [
                    {body:"This is my favourite & 1st Jay Chou song i heard many many years ago - still love it 2day. Even though i'm Australian & can't speak much Chinese i know all the words. Listening to Jay & his songs more importantly this one puts a smile on my face every time i hear it no matter how i am feeling :D",
                            created_at:'2013-07-02 22:17:00', timestamp: 100, user_name:'JacintaZhen'},
                    {body:'现场太爽了', created_at:'2023-07-01 01:02:00', timestamp: 62, user_name:'Memories'},
                    {body:'简单爱治愈所有不开心', created_at:'2023-07-01 21:38:00', timestamp: 8, user_name:'困死了'},
                    {body:'前奏绝了😭', created_at:'2023-07-01 22:32:00', timestamp: 0, user_name:'日更少女西二'}, 
                    {body:'想这样没担忧 唱着歌 一直走', created_at:'2023-07-01 14:59:00', timestamp: 230, user_name:'樱桃小坤'}, 
                    {body:'我想就这样牵着你的手不放开，爱能不能够永远单纯没有悲哀', created_at:'2023-07-01 00:07:00', timestamp: 179, user_name:'Alie'}, 
                    {body:'平淡才是真 简单才是爱', created_at:'2023-06-24 22:29:00', timestamp: 104, user_name:'就是爱音乐'}, 
                    {body:'徐若瑄的词真的很绝，明明单调到都有点单薄了，但是却直击心灵', created_at:'2023-05-30 14:56:00', timestamp: 200, user_name:'就此别过'}, 
                    {body:'为杰沉沦', created_at:'2023-07-04 10:15:00', timestamp: 11, user_name:'红颜如霜'}, 
                    {body:'喜欢', created_at:'2023-07-04 14:18:00', timestamp: 150, user_name:'一闪一闪晶晶亮'},
                    {body:'疗伤', created_at:'2023-06-10 19:40:00', timestamp: 160, user_name:'沈子翔'},
                ]
            },
            {},
            {
                comments: [
                    {body:'GOAT', created_at:'2023-07-02 22:17:00', timestamp: 186, user_name:'QuisYolo'},
                    {body:'That diggs on mee', created_at:'2023-07-03 13:17:00', timestamp: 13, user_name:'Isaac'},
                    {body:'OH YEAH GOLD DIGGER', created_at:'2023-07-04 12:17:00', timestamp: 8, user_name:'love my baby'},
                    {body:'simp', created_at:'2023-07-02 02:17:00', timestamp: 77, user_name:'Canes 2019'}, 
                ]
            },
        
        ]
    }
}