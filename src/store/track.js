export default {
    namespaced: 'track',
    actions:{
        uploadSingle(context, track){
            // 检查track是否合法
            // 实际修改值
            context.commit('UPLOAD_SINGLE',track)
        }
    },
    mutations:{
        UPLOAD_SINGLE(context, track){
            context.trackList.unshift(track)
            console.log('添加成功',context.trackList)
        }
    },
    state:{
        trackList:[
            {
                id: 1,
                title: 'cortado',
                artist: 'tokiwa',
                audio_url: 'http://sdadadadadadadadad',
                img_url: '1232131231'
            },
            {
                id: 2,
                title: 'on your mark',
                artist: 'scene from gore girls',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda'
            },
        ]
    },
    getters:{}

}