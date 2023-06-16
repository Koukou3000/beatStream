export default {
    namespaced: 'track',
    actions:{
    },
    mutations:{
        UPLOAD_SINGLE(context, track){
            context.trackList.push(track)
            console.log('添加成功',context.trackList)
        }
    },
    getters:{
        getTracks(context){
            // 默认一页10个
            return context.trackList.slice(0,10)
        }
    },
    state:{
        trackList:[
            {
                tid: 1,
                title: 'cortado',
                artist: 'tokiwa',
                audio_url: 'http://sdadadadadadadadad',
                img_url: '1232131231',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 2,
                title: 'on your mark',
                artist: 'scene from gore girls',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 3,
                title: 'The smile of you',
                artist: '猫叉Master',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 4,
                title: 'The smile of you',
                artist: '猫叉Master',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 5,
                title: 'The smile of you',
                artist: '猫叉Master',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 6,
                title: 'The smile of you',
                artist: '猫叉Master',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 7,
                title: 'The smile of you',
                artist: '猫叉Master',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 8,
                title: 'The smile of you',
                artist: '猫叉Master',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 9,
                title: 'The smile of you',
                artist: '猫叉Master',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 10,
                title: 'The smile of you',
                artist: '猫叉Master',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 11,
                title: 'The smile of you',
                artist: '猫叉Master',
                audio_url: 'http://swadadadadadad',
                img_url: '12313131adasda',
                releast_time: '2023/6/16',
                preview_start: 0, 
            }
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
   

}