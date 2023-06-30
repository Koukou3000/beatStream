export default {
    namespaced: 'track',
    actions:{

    },
    mutations:{
        // 上传单曲
        UPLOAD_SINGLE(state, track){
            state.trackList.push(track)
        }
    },
    getters:{
        // 这种写法表示getTop3Tracks是一个方法
        getTop3Tracks: (state)=>()=>{
            return state.trackList.slice(0,3)
        },
        getTrackDetail: (state)=>(tid)=>{
            // 用方法的方式调用getters，避免vuex自动缓存，更可以传递参数
            return state.trackList.slice(tid-1, tid).pop() 
        },
        getAllTracks: (state)=>()=>{
            return state.trackList.slice()
        },
        getTenTracks:(state)=>()=>{
            return state.trackList.slice(3,10)
        }
    },
    state:{  
        trackList:[
           
            {
                tid: 1,
                title: 'PathFinder',
                artist: 'satella',
                audio_url: 'http://47.115.222.108/music/pathfinder.mp3',
                img_url: '',
                duration: '3:42',
                release_time: '2018/1/26',
                preview_start: 16, 
            },
            {
                tid: 2,
                title: 'On Your Mark',
                artist: 'Scene From Gore Girls',
                audio_url: 'http://47.115.222.108/music/on-your-mark.mp3',
                img_url: '',
                duration: '2:20',
                release_time: '2023/6/16',
                preview_start: 57, 
            },
            {
                tid: 3,
                title: 'Embracing intelligences',
                artist: 'Camellia',
                audio_url: 'http://47.115.222.108/music/embracing-intelligences.mp3',
                img_url: 'https://cametek.jp/heartofandroid/assets/jacket_full.jpg',
                duration: '3:42',
                release_time: '2023/6/16',
                preview_start: 65, 
            },
            
            {
                tid: 4,
                title: 'Cortado',
                artist: 'tokiwa',
                audio_url: 'http://47.115.222.108/music/cortado.mp3',
                img_url: '',
                duration: '4:29',
                release_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 5,
                title: 'Fjordland',
                artist: 'aran',
                audio_url: 'http://47.115.222.108/music/fjordland.mp3',
                img_url: 'https://www.diverse.direct/wp/wp-content/uploads/470_660_DVSP-0264_jacket.jpg',
                duration: '5:27',
                release_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 6,
                title: "Fallin' Deep",
                artist: 'Nahto',
                audio_url: 'http://47.115.222.108/music/fallin-deep.mp3',
                img_url: '',
                duration: '2:52',
                release_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 7,
                title: 'From Wired',
                artist: 'Scene From Gore Girls',
                audio_url: 'http://47.115.222.108/music/from-wired.mp3',
                img_url: '',
                duration: '3:53',
                release_time: '2022/10/30',
                preview_start: 0, 
            },
            {
                tid: 8,
                title: 'Changing the Future',
                artist: 'kazeoff',
                audio_url: 'http://47.115.222.108/music/changing-the-future.mp3',
                img_url: 'https://f4.bcbits.com/img/a4286791867_10.jpg',
                duration: '5:11',
                release_time: '2023/6/16',
                preview_start: 166, 
            },
            {
                tid: 9,
                title: 'Stay',
                artist: 'DJ Noriken',
                audio_url: 'http://47.115.222.108/music/stay.mp3',
                img_url: 'https://f4.bcbits.com/img/a3742072365_10.jpg',
                duration: '5:43',
                release_time: '2023/6/16',
                preview_start: 134, 
            },
            {
                tid: 10,
                title: "Skyrider",
                artist: 'tokiwa',
                audio_url: 'http://47.115.222.108/music/skyrider.mp3',
                img_url: '',
                duration: '2:06',
                release_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 11,
                title: 'Enigma',
                artist: 'Nhato',
                audio_url: 'http://47.115.222.108/music/enigma.mp3',
                img_url: '',
                duration: '6:25',
                release_time: '2023/6/16',
                preview_start: 190, 
            },
            {
                tid: 12,
                title: 'Gold Digger',
                artist: 'Ye',
                audio_url: 'http://47.115.222.108/music/gold-digger.mp3',
                img_url: '',
                duration: '6:25',
                release_time: '2023/6/16',
                preview_start: 190, 
            },
            {
                tid: 13,
                title: 'Alone Intelligence',
                artist: 'Camellia',
                audio_url: 'http://47.115.222.108/music/alone-intelligence.mp3',
                img_url: 'https://cametek.jp/heartofandroid/assets/jacket_full.jpg',
                duration: '3:42',
                release_time: '2018/1/26',
                preview_start: 90, 
            },
           
        ],

        
    },
   

}