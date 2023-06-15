export default {
    namespaced: 'track',
    actions:{
        uploadSingle(context, track){
            // 检查track是否合法
            /* Track:{
                    releaseTime发布时间,
                    title标题,
                    audio存储地址,
                    poster存储地址,
                    preview__start开始时间,
                    comments:[{
                    at时间戳,
                    content评论内容,
                }
             */
            
            context.commit('UPLOAD_SINGLE',track) // 实际修改
        }
    },
    mutations:{
        UPLOAD_SINGLE(context, track){
            context.trackList.push(track)
            console.log('添加成功',context.trackList)
        }
    },
    state:{
        trackList:[
            {
                tid: 1,
                title: 'cortado',
                artist: 'tokiwa',
                audio_url: 'http://sdadadadadadadadad',
                img_url: '1232131231'
            },
            {
                tid: 2,
                title: 'on your mark',
                artist: 'scene from gore girls',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda'
            },
        ],
        // playlist:[ 
        //     {
        //         lid: 1,
        //         listName:'Frankenstein complex',
        //         poster_url: '12312321313asdsada',
        //         tracks: [1,2,3,4], // tid
        //     },
        // ],
        
    },
    getters:{}

}