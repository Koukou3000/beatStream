export default {
    namespaced: 'track',
    actions:{
     
    },
    mutations:{
        // 上传信息
        UPLOAD_SINGLE(state, track){
            state.trackList.push(track)
        }
    },
    getters:{
        // 用方法的方式调用getters，避免缓存，同时可以传递参数
        getTop3Tracks: (state)=>()=>{
            return state.trackList.slice(0,3)
        },
        getTrackDetail: (state)=>(tid)=>{
            return state.trackList.slice(tid-1, tid).pop()
        }
    },
    state:{  
        trackList:[
            {
                tid: 1,
                title: 'Alone Intelligence',
                artist: 'Camellia',
                audio_url: 'http://47.115.222.108/music/Alone-Intelligence.mp3',
                img_url: 'https://cametek.jp/heartofandroid/assets/jacket_full.jpg',
                releast_time: '2018/1/26',
                preview_start: 90, 
            },
            {
                tid: 2,
                title: 'Stay',
                artist: 'DJ Noriken',
                audio_url: 'http://47.115.222.108/music/Stay.mp3',
                img_url: 'https://f4.bcbits.com/img/a3742072365_10.jpg',
                releast_time: '2023/6/16',
                preview_start: 134, 
            },
           
            {
                tid: 3,
                title: 'Changing the Future',
                artist: 'kazeoff',
                audio_url: 'http://47.115.222.108/music/Changing-the-Future.mp3',
                img_url: 'https://f4.bcbits.com/img/a4286791867_10.jpg',//img_url: 'https://f4.bcbits.com/img/a4286791867_10.jpg',
                releast_time: '2023/6/16',
                preview_start: 166, 
            },
           
            
            {
                tid: 4,
                title: 'Sugary',
                artist: 'Camellia',
                audio_url: 'https://m10.music.126.net/20230617055217/cf75af6b69d1b8067f62b194436f5d6d/ymusic/aedd/7616/3ece/da2d1966e0298be482c3d75f0b1f6006.mp3',
                img_url: 'https://cametek.jp/img/cd/galaxyburst.jpg',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 5,
                title: 'Fjordland',
                artist: 'aran',
                audio_url: 'https://m801.music.126.net/20230617055712/c79d4a09d5976fe7bd44b2ff5808e733/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/12957730705/191e/4d8e/bbb7/1b1f223cdc83dc5b439d790071451498.m4a',
                img_url: 'https://www.diverse.direct/wp/wp-content/uploads/470_660_DVSP-0264_jacket.jpg',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 6,
                title: 'Multi-Thread',
                artist: 'Mameyudoufu',
                audio_url: 'https://m701.music.126.net/20230617055933/b8c61256fcc34bb975a82c606c06d79d/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/11592849114/c06a/93dc/b4bc/9e7470587162fd564e7d2db5c95afbfb.m4a',
                img_url: 'https://e.snmc.io/i/600/w/76a88f36f98d59346370a4caea86916b/9511900/%E8%B1%86%E6%B9%AF%E8%B1%86%E8%85%90-mameyudoufu-boot-loader-Cover-Art.jpg',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 7,
                title: 'Amasia',
                artist: 'aran',
                audio_url: 'https://m801.music.126.net/20230617054826/9b8b3de64166acb66225bdce7bf225bd/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/23889436932/2f38/e0c3/ad92/ad029e84b764a740a02d21328847809c.m4a',
                img_url: 'https://f4.bcbits.com/img/a1032354609_10.jpg',
                releast_time: '2022/10/30',
                preview_start: 0, 
            },
            {
                tid: 8,
                title: 'Embracing intelligences',
                artist: 'Camellia',
                audio_url: 'https://m801.music.126.net/20230617060306/b865f7c6af98825602f750e025f008f9/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/7736723084/30aa/2a87/5f38/60331f1cdc8a86f3f8ca2149ad2e5e25.m4a',
                img_url: 'https://cametek.jp/heartofandroid/assets/jacket_full.jpg',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 9,
                title: 'Escape (From this World)',
                artist: 'Dk Cheng',
                audio_url: 'https://m10.music.126.net/20230617060529/c7a22ecaec71220f9f7928c07d464667/yyaac/0652/005a/0f58/181b11be9970c018c46482ed7758fd24.m4a',
                img_url: 'http://p1.music.126.net/NxHJZJuSOtgf-y2FnOn7sw==/109951164584097088.jpg?param=130y130',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 10,
                title: "Angel's Ladder",
                artist: 'xi',
                audio_url: 'https://m801.music.126.net/20230617055023/68d8affcadb7d00216619b9fee282ba9/jdyyaac/obj/w5rDlsOJwrLDjj7CmsOj/13599119751/dbc3/1354/56a6/0b9da36431cd8c9e0d73816b6cde0d4e.m4a',
                img_url: 'https://s.pacn.ws/720/13d/beatmania-iidx-29--casthour-original-soundtrack-708997.1.jpg?v=r8xlv4&width=720',
                releast_time: '2023/6/16',
                preview_start: 0, 
            },
            {
                tid: 11,
                title: 'Enigma',
                artist: 'Nhato',
                audio_url: 'https://m10.music.126.net/20230620034222/d0be1486c7235909f5385e69e86b136c/yyaac/035f/075a/545d/45b609d8cc001efb0a8fc7519dd503b7.m4a',
                img_url: 'http://p2.music.126.net/GHZC9wqX8mentlgwBdY_gw==/109951164529232225.jpg?param=177y177',
                releast_time: '2023/6/16',
                preview_start: 190, 
            },
        ],
        playlist:[ 
            {
                tid: 1,
                title: 'Alone Intelligence',
                artist: 'Camellia',
                audio_url: 'http://47.115.222.108/music/Alone-Intelligence.mp3',
                img_url: 'https://cametek.jp/heartofandroid/assets/jacket_full.jpg',
                releast_time: '2018/1/26',
                preview_start: 90, 
            },
        ],
        
    },
   

}