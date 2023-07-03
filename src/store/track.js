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
            return state.trackList.slice(3,13)
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
                tag: 'hardcore'
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
                tag: 'trance'
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
                tag: 'wild'
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
                tag: 'emotional'
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
                tag: 'techcore'
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
                tag: 'progressive'
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
                tag: 'happy',  
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
                tag: 'eletro'
            },
            {
                tid: 12,
                title: 'Gold Digger',
                artist: 'Ye',
                audio_url: 'http://47.115.222.108/music/gold-digger.mp3',
                img_url: 'https://y.qq.com/music/photo_new/T002R300x300M000000qJTD82P9zxO_1.jpg?max_age=2592000',
                duration: '6:25',
                release_time: '2023/6/16',
                preview_start: 190, 
                lyric: "W3RpOmdvbGQgZGlnZ2VyXQpbYXI6a2FueWUgd2VzdCBmdCBqYW1pZSBmb3h4XQpbYWw6MjA4MDExXQpbYnk6XQpbb2Zmc2V0OjBdClswMDowMC40M11TaGUgdGFrZSBteSBtb25leSAgd2hlbiBJJmFwb3M7bSBpbiBuZWVkClswMDowMy45NF0KWzAwOjA0Ljk4XVllYWggc2hlJmFwb3M7cyBhIHRyaWZsaW5nJmFwb3M7IGZyaWVuZCBpbmRlZWQKWzAwOjA4LjE3XQpbMDA6MDkuMjJdT2ggc2hlJmFwb3M7cyBhIGdvbGQgZGlnZ2EKWzAwOjEwLjgzXQpbMDA6MTEuNDJdV2F5IG92ZXIgdG93bgpbMDA6MTIuODBdClswMDoxMy44N11UaGF0IGRpZ3Mgb24gbWUKWzAwOjE1LjIxXUNob3J1c10KWzAwOjE3LjM2XU5vdyBJIGFpbiZhcG9zO3Qgc2F5aW4mYXBvczsgc2hlIGEgZ29sZCBkaWdnZXIKWzAwOjIwLjAyXUJ1dCBzaGUgYWluJmFwb3M7dCBtZXNzaW4mYXBvczsgd2l0IG5vIGJyb2tlIG5pZ2dhegpbMDA6MjIuMDNdClswMDoyMi42M11Ob3cgSSBhaW4mYXBvczt0IHNheWluJmFwb3M7IHNoZSBhIGdvbGQgZGlnZ2VyClswMDoyNC41Nl0KWzAwOjI1LjE2XUJ1dCBzaGUgYWluJ3QgbWVzc2luIHdpdCBubyBicm9rZSBuaWdnYXoKWzAwOjI3LjExXQpbMDA6MjcuODhdR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMDozMC40OF1HZXQgZG93biBnaXJsIGdvIGhlYWQgZ2V0IGRvd24KWzAwOjMzLjA1XUdldCBkb3duIGdpcmwgZ28gaGVhZCBnZXQgZG93bgpbMDA6MzUuNjNdR2V0IGRvd24gZ2lybCBnbyBoZWFkClswMDozNy42NV1WZXJzZSAxXQpbMDA6MzguMTVdQ3V0aWUgdGhlIGJvbWIKWzAwOjM4LjY0XU1ldCBoZXIgYXQgYSBiZWF1dHkgc2Fsb24KWzAwOjM5Ljk0XVdpdGggYSBiYWJ5IExvdWlzIFZ1aXR0b24KWzAwOjQxLjE0XVVuZGVyIGhlciB1bmRlcmFybQpbMDA6NDEuNzZdU2hlIHNhaWQgSSBjYW4gdGVsbCB5b3Ugcm9jawpbMDA6NDQuMDhdSSBjYW4gdGVsbCBieSB5YSBjaGFybQpbMDA6NDUuMzddRmFyIGFzIGdpcmxzIHlvdSBnb3QgYSBmbG9jawpbMDA6NDYuOTJdSSBjYW4gdGVsbCBieSB5YSBjaGFybSBhbmQgeWEgYXJtClswMDo0OC42N11CdXQgSSZhcG9zO20gbG9va2luZyZhcG9zOyBmb3IgdGhlIG9uZSAgaGF2ZSB5b3Ugc2VlbiBoZXIgClswMDo1MC44OV1NeSBwc3ljaGljIHRvbGQgbWUgc2hlIGhhdmUgYSBhKiogbGlrZSBTZXJlbmEKWzAwOjUyLjg0XVRyaW5hICBKZW5uaWZlciBMb3BleiAgZm91ciBraWRzClswMDo1NS45M11BbiBJIGdvdHRhIHRha2UgYWxsIHRoZXkgYmFkIGEqKiZhcG9zO3MgdG8gc2hvdy1iaXoKWzAwOjU4LjA4XU9rIGdldCB5YSBraWRzIGJ1dCB0aGVuIHRoZXkgZ290IHRoZWlyIGZyaWVuZHMKWzAxOjAxLjEzXUkgcHVsbGVkIHVwIGluIHRoZSBCZW56ICB0aGV5IGFsbCBnb3QgdXAgaW4KWzAxOjAzLjcxXVdlIGFsbCB3ZW50IHRvIERlbiBhbmQgdGhlbiBJIGhhZCB0byBwYXkKWzAxOjA2LjQyXUlmIHlvdSBmKipraW4mYXBvczsgd2l0aCB0aGlzIGdpcmwgdGhlbiB5b3UgYmV0dGEgYmUgcGF5ZWQKWzAxOjA5LjIzXVlvdSBrbm93IHdoeQpbMDE6MTAuMTldSXQgdGFrZSB0b28gbXVjaCB0byB0b3VjaCBoZXIKWzAxOjExLjk5XUZyb20gd2hhdCBJIGhlYXJkIHNoZSBnb3QgYSBiYWJ5IGJ5IEJ1c3RhClswMToxNC40OV1NeSBiZXN0IGZyaWVuZCBzYXkgc2hlIHVzZSB0byBmKiprIHdpdCBVc2hlcgpbMDE6MTYuNzFdSSBkb24mYXBvczt0IGNhcmUgd2hhdCBub25lIG9mIHkmYXBvczthbGwgc2F5IEkgc3RpbGwgbG92ZSBoZXIKWzAxOjE5LjU4XUNob3J1c10KWzAxOjE5Ljc4XU5vdyBJIGFpbiZhcG9zO3Qgc2F5aW4mYXBvczsgc2hlIGEgZ29sZCBkaWdnZXIKWzAxOjIxLjI4XUJ1dCBzaGUgYWluJmFwb3M7dCBtZXNzaW4mYXBvczsgd2l0IG5vIGJyb2tlIG5pZ2dhegpbMDE6MjMuOTVdClswMToyNC41MF1Ob3cgSSBhaW4mYXBvczt0IHNheWluJmFwb3M7IHNoZSBhIGdvbGQgZGlnZ2VyClswMToyNi41OF0KWzAxOjI3LjMwXUJ1dCBzaGUgYWluJ3QgbWVzc2luIHdpdCBubyBicm9rZSBuaWdnYXoKWzAxOjI4Ljc5XUdldCBkb3duIGdpcmwgZ28gaGVhZCBnZXQgZG93bgpbMDE6MzIuNjldR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMTozNC43Nl0KWzAxOjM1LjMxXUdldCBkb3duIGdpcmwgZ28gaGVhZCBnZXQgZG93bgpbMDE6MzguMDBdR2V0IGRvd24gZ2lybCBnbyBoZWFkClswMTozOS4zMV1WZXJzZSAyXQpbMDE6MzkuODRdMTggeWVhcnMgIDE4IHllYXJzClswMTo0MS41Nl1TaGUgZ290IG9uZSBvZiB5byBraWRzIGdvdCB5b3UgZm9yIDE4IHllYXJzClswMTo0NS4wMF1JIGtub3cgc29tZWJvZHkgcGF5aW4mYXBvczsgY2hpbGQgc3VwcG9ydCBmb3Igb25lIG9mIGhpcyBraWRzClswMTo0Ny43M11IaXMgYmFieSBtb21tYSZhcG9zO3MgY2FyIGFuZCBjcmliIGlzIGJpZ2dlciB0aGFuIGhpcwpbMDE6NTAuNDFdWW91IHdpbGwgc2VlIGhpbSBvbiBUViBBbnkgR2l2ZW4gU3VuZGF5ClswMTo1My4xMV1XaW4gdGhlIFN1cGVyYm93bCBhbmQgZHJpdmUgb2ZmIGluIGEgSHl1bmRhaQpbMDE6NTUuNzNdU2hlIHdhcyBzcG9zZSB0byBidXkgeWEgc2hvcnR5IFRZQ08gd2l0aCB5YSBtb25leQpbMDE6NTguMzddU2hlIHdlbnQgdG8gdGhlIGRvY3RvciBnb3QgbGlwbyB3aXRoIHlhIG1vbmV5ClswMjowMC41OV1TaGUgd2Fsa2luJmFwb3M7IGFyb3VuZCBsb29raW5nJmFwb3M7IGxpa2UgTWljaGVhbCB3aXRoIHlhIG1vbmV5ClswMjowMy4xMF1TaG91bGQgb2YgZ290IHRoYXQgaW5zdXJlZCBnb3QgR0VJQ08gZm9yIHlhIG1vbmVlZXkKWzAyOjA1Ljg2XQpbMDI6MDcuNTVdSWYgeW91IGFpbid0IG5vIHB1bmsgaG9sbGEgYFdlIHdhbnQgcHJlbnVwJmFwb3M7ClswMjowOS45MF1gV0UgV0FOVCBQUkVOVVAgJmFwb3M7ClswMjoxMS4xN11ZZWFoICBpdCZhcG9zO3Mgc29tZXRoaW5nIHRoYXQgeW91IG5lZWQgdG8gaGF2ZQpbMDI6MTMuODVdQ2F1c2Ugd2hlbiBzaGUgbGVhdmUgeW8gYSoqIHNoZSBnb24mYXBvczsgbGVhdmUgd2l0aCBoYWxmClswMjoxNi41Nl0xOCB5ZWFycyAgMTggeWVhcnMKWzAyOjE4LjYyXUFuZCBvbiBoZXIgMTh0aCBiaXJ0aGRheSBoZSBmb3VuZCBvdXQgaXQgd2FzbiZhcG9zO3QgaGlzClswMjoyMS4zMF1DaG9ydXNdClswMjoyMS41NV1Ob3cgSSBhaW4mYXBvczt0IHNheWluJmFwb3M7IHNoZSBhIGdvbGQgZGlnZ2VyClswMjoyMy41M11CdXQgc2hlIGFpbiZhcG9zO3QgbWVzc2luJmFwb3M7IHdpdCBubyBicm9rZSBuaWdnYXoKWzAyOjI3LjA1XU5vdyBJIGFpbiZhcG9zO3Qgc2F5aW4mYXBvczsgc2hlIGEgZ29sZCBkaWdnZXIKWzAyOjI5LjYxXUJ1dCBzaGUgYWluJ3QgbWVzc2luIHdpdCBubyBicm9rZSBuaWdnYXoKWzAyOjMxLjU2XQpbMDI6MzIuMzJdR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMjozNC45N11HZXQgZG93biBnaXJsIGdvIGhlYWQgZ2V0IGRvd24KWzAyOjM3LjUzXUdldCBkb3duIGdpcmwgZ28gaGVhZCBnZXQgZG93bgpbMDI6MzkuNDRdClswMjo0MC4xMV1HZXQgZG93biBnaXJsIGdvIGhlYWQKWzAyOjQxLjY2XVZlcnNlIDNdClswMjo0Mi4xMV1Ob3cgSSBhaW4mYXBvczt0IHNheWluJmFwb3M7IHlvdSBhIGdvbGQgZGlnZ2VyIHlvdSBnb3QgbmVlZHMKWzAyOjQ0Ljg5XVlvdSBkb24mYXBvczt0IHdhbnQgeWEgZHVkZSB0byBzbW9rZSBidXQgaGUgY2FuJmFwb3M7dCBidXkgdyoqZApbMDI6NDcuNjNdWW91IGdvdCBvdXQgdG8gZWF0IGFuZCBoZSBjYW4mYXBvczt0IHBheSB5JmFwb3M7YWxsIGNhbid0IGxlYXZlClswMjo1MC4yNV1UaGVyZSZhcG9zO3MgZGlzaGVzIGluIHRoZSBiYWNrICBoZSBnb3R0YSByb2xsIHVwIGhpcyBzbGVldmVzClswMjo1Mi44Nl1CdXQgd2h5IHkmYXBvczthbGwgd2F0Y2ggaGltIHdhc2hpbiZhcG9zOwpbMDI6NTQuMzNdSGUgZ29uZSBtYWtlIGl0IGludG8gYSBCZW56IG91dCBvZiB0aGF0IERhdHNvbgpbMDI6NTcuNTJdSGUgZ290IHRoYXQgYW1iaXRpb24gYmFieSBsb29rIGluIGhpcyBleWVzClswMzowMC40NV1UaGlzIHdlZWsgaGUgbW9wcGluJmFwb3M7IGZsb29ycyBuZXh0IHdlZWsgaXQmYXBvcztzIHRoZSBmcmllcwpbMDM6MDMuMDVdU28gIHN0aWNrIGJ5IGhpcyBzaWRlClswMzowNC45N11JIGtub3cgaGlzIGR1ZGUmYXBvcztzIGJhbGxpbiZhcG9zOyBidXQgeWVhaCB0aGF0cyBuaWNlClswMzowNy42NF1BbmQgdGhleSBnb24mYXBvczsga2VlcCBjYWxsaW4mYXBvczsgYW5kIHRyeWluJmFwb3M7ClswMzowOS41MF1CdXQgeW91IHN0YXkgcmlnaHQgZ2lybApbMDM6MTEuMDJdQnV0IHdoZW4geW91IGdvIGhlIGdvbm5hIGxlYXZlIHlvIGEqKiBmb3IgYSB3aGl0ZSBnaXJsClswMzoxNC4zM11HZXQgZG93biBnaXJsIGdvIGhlYWQgZ2V0IGRvd24KWzAzOjE2LjQ4XUdldCBkb3duIGdpcmwgZ28gaGVhZCBnZXQgZG93bgpbMDM6MTkuMDRdR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMzoyMS41OV1HZXQgZG93biBnaXJsIGdvIGhlYWQ=",
                tag: 'rap',
            
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
                tag: 'nation'
            },
           
        ],

        
    },
   

}