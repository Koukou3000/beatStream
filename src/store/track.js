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
                release_time: '2017-01-26 16:48:30',
                preview_start: 16, 
                duration: '1:44',
                tag: 'complex;sound effect;simulate',
            },
            {
                tid: 2,
                title: 'On Your Mark',
                artist: 'Scene From Gore Girls',
                audio_url: 'http://47.115.222.108/music/on-your-mark.mp3',
                img_url: '',
                release_time: '2022-07-26 16:48:30',
                preview_start: 57, 
                duration: '2:18',
                tag: 'guitar;post rock',
            },
            {
                tid: 3,
                title: 'Embracing intelligences',
                artist: 'Camellia',
                audio_url: 'http://47.115.222.108/music/embracing-intelligences.mp3',
                img_url: 'https://cametek.jp/heartofandroid/assets/jacket_full.jpg',
                release_time: '2018-01-26 16:48:30',
                preview_start: 65,
                tag: 'nation;new age', 
                duration: '3:42',
            },
            {
                tid: 4,
                title: 'Enigma',
                artist: 'Nhato',
                audio_url: 'http://47.115.222.108/music/enigma.mp3',
                img_url: 'https://i1.sndcdn.com/artworks-000659927899-ysnz7v-t500x500.jpg',
                release_time: '2019-01-26 16:48:30',
                preview_start: 190, 
                tag: 'Trance;eletro;nhato',
                duration: '6:25',
            },
           
            {
                tid: 5,
                title: 'Fjordland',
                artist: 'aran',
                audio_url: 'http://47.115.222.108/music/fjordland.mp3',
                img_url: 'https://www.diverse.direct/wp/wp-content/uploads/470_660_DVSP-0264_jacket.jpg',
                release_time: '2022-01-26 16:48:30',
                preview_start: 0, 
                tag: 'trance;space',
                duration: '5:52',
            },
            {
                tid: 6,
                title: "Fallin' Deep",
                artist: 'Nahto',
                audio_url: 'http://47.115.222.108/music/fallin-deep.mp3',
                img_url: '',
                release_time: '2017-01-26 16:48:30',
                preview_start: 0, 
                tag: 'wild;eletro',
                duration: '2:52',
            },
            {
                tid: 7,
                title: 'From Wired',
                artist: 'Scene From Gore Girls',
                audio_url: 'http://47.115.222.108/music/from-wired.mp3',
                img_url: '',
                release_time: '2021-01-26 16:48:30',
                preview_start: 0, 
                tag: 'instrument;emotional',
                duration: '3:53',
            },
            {
                tid: 8,
                title: 'Changing the Future',
                artist: 'kazeoff',
                audio_url: 'http://47.115.222.108/music/changing-the-future.mp3',
                img_url: 'https://f4.bcbits.com/img/a4286791867_10.jpg',
                release_time: '2021-01-26 16:48:30',
                preview_start: 166, 
                tag: 'techcore;vocal;sample',
                duration: '5:11',
            },
            {
                tid: 9,
                title: 'Stay',
                artist: 'DJ Noriken',
                audio_url: 'http://47.115.222.108/music/stay.mp3',
                img_url: 'https://f4.bcbits.com/img/a3742072365_10.jpg',
                release_time: '2023-01-26 16:48:30',
                preview_start: 134, 
                tag: 'progressive;trance',
                duration: '5:26',
            },
            {
                tid: 10,
                title: "Skyrider",
                artist: 'tokiwa',
                audio_url: 'http://47.115.222.108/music/skyrider.mp3',
                img_url: '',
                release_time: '2021-01-26 16:48:30',
                preview_start: 0, 
                tag: 'happy;eletro',  
                duration: '2:06',
            },
            {
                tid: 11,
                title: 'Cortado',
                artist: 'tokiwa',
                audio_url: 'http://47.115.222.108/music/cortado.mp3',
                img_url: 'https://i1.sndcdn.com/artworks-000575341730-3u531p-t500x500.jpg',
                release_time: '2021-01-26 16:48:30',
                preview_start: 0, 
                tag: 'hardcore;happy',
                duration: '4:29',
            },
          
            {
                tid: 12,
                title: 'Gold Digger',
                artist: 'Ye',
                audio_url: 'http://47.115.222.108/music/gold-digger.mp3',
                img_url: 'https://y.qq.com/music/photo_new/T002R300x300M000000qJTD82P9zxO_1.jpg?max_age=2592000',
                release_time: '2004-01-26 16:48:30',
                preview_start: 19, 
                lyric: "W3RpOmdvbGQgZGlnZ2VyXQpbYXI6a2FueWUgd2VzdCBmdCBqYW1pZSBmb3h4XQpbYWw6MjA4MDExXQpbYnk6XQpbb2Zmc2V0OjBdClswMDowMC40M11TaGUgdGFrZSBteSBtb25leSAgd2hlbiBJJyBtIGluIG5lZWQKWzAwOjAzLjk0XQpbMDA6MDQuOThdWWVhaCBzaGUnIHMgYSB0cmlmbGluZycgIGZyaWVuZCBpbmRlZWQKWzAwOjA4LjE3XQpbMDA6MDkuMjJdT2ggc2hlJyBzIGEgZ29sZCBkaWdnYQpbMDA6MTAuODNdClswMDoxMS40Ml1XYXkgb3ZlciB0b3duClswMDoxMi44MF0KWzAwOjEzLjg3XVRoYXQgZGlncyBvbiBtZQpbMDA6MTUuMjFdW0Nob3J1c10KWzAwOjE3LjM2XU5vdyBJIGFpbicgdCBzYXlpbicgIHNoZSBhIGdvbGQgZGlnZ2VyClswMDoyMC4wMl1CdXQgc2hlIGFpbicgdCBtZXNzaW4nICB3aXQgbm8gYnJva2UgbmlnZ2F6ClswMDoyMi4wM10KWzAwOjIyLjYzXU5vdyBJIGFpbicgdCBzYXlpbicgIHNoZSBhIGdvbGQgZGlnZ2VyClswMDoyNC41Nl0KWzAwOjI1LjE2XUJ1dCBzaGUgYWluJ3QgbWVzc2luIHdpdCBubyBicm9rZSBuaWdnYXoKWzAwOjI3LjExXQpbMDA6MjcuODhdR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMDozMC40OF1HZXQgZG93biBnaXJsIGdvIGhlYWQgZ2V0IGRvd24KWzAwOjMzLjA1XUdldCBkb3duIGdpcmwgZ28gaGVhZCBnZXQgZG93bgpbMDA6MzUuNjNdR2V0IGRvd24gZ2lybCBnbyBoZWFkClswMDozNy42NV1bVmVyc2UgMV0KWzAwOjM4LjE1XUN1dGllIHRoZSBib21iClswMDozOC42NF1NZXQgaGVyIGF0IGEgYmVhdXR5IHNhbG9uClswMDozOS45NF1XaXRoIGEgYmFieSBMb3VpcyBWdWl0dG9uClswMDo0MS4xNF1VbmRlciBoZXIgdW5kZXJhcm0KWzAwOjQxLjc2XVNoZSBzYWlkIEkgY2FuIHRlbGwgeW91IHJvY2sKWzAwOjQ0LjA4XUkgY2FuIHRlbGwgYnkgeWEgY2hhcm0KWzAwOjQ1LjM3XUZhciBhcyBnaXJscyB5b3UgZ290IGEgZmxvY2sKWzAwOjQ2LjkyXUkgY2FuIHRlbGwgYnkgeWEgY2hhcm0gYW5kIHlhIGFybQpbMDA6NDguNjddQnV0IEknIG0gbG9va2luZycgIGZvciB0aGUgb25lICBoYXZlIHlvdSBzZWVuIGhlciAKWzAwOjUwLjg5XU15IHBzeWNoaWMgdG9sZCBtZSBzaGUgaGF2ZSBhIGEqKiBsaWtlIFNlcmVuYQpbMDA6NTIuODRdVHJpbmEgIEplbm5pZmVyIExvcGV6ICBmb3VyIGtpZHMKWzAwOjU1LjkzXUFuIEkgZ290dGEgdGFrZSBhbGwgdGhleSBiYWQgYSoqJyBzIHRvIHNob3ctYml6ClswMDo1OC4wOF1PayBnZXQgeWEga2lkcyBidXQgdGhlbiB0aGV5IGdvdCB0aGVpciBmcmllbmRzClswMTowMS4xM11JIHB1bGxlZCB1cCBpbiB0aGUgQmVueiAgdGhleSBhbGwgZ290IHVwIGluClswMTowMy43MV1XZSBhbGwgd2VudCB0byBEZW4gYW5kIHRoZW4gSSBoYWQgdG8gcGF5ClswMTowNi40Ml1JZiB5b3UgZnVja2luJyAgd2l0aCB0aGlzIGdpcmwgdGhlbiB5b3UgYmV0dGEgYmUgcGF5ZWQKWzAxOjA5LjIzXVlvdSBrbm93IHdoeQpbMDE6MTAuMTldSXQgdGFrZSB0b28gbXVjaCB0byB0b3VjaCBoZXIKWzAxOjExLjk5XUZyb20gd2hhdCBJIGhlYXJkIHNoZSBnb3QgYSBiYWJ5IGJ5IEJ1c3RhClswMToxNC40OV1NeSBiZXN0IGZyaWVuZCBzYXkgc2hlIHVzZSB0byBmKiprIHdpdCBVc2hlcgpbMDE6MTYuNzFdSSBkb24nIHQgY2FyZSB3aGF0IG5vbmUgb2YgeScgYWxsIHNheSBJIHN0aWxsIGxvdmUgaGVyClswMToxOS41OF1bQ2hvcnVzXQpbMDE6MTkuNzhdTm93IEkgYWluJyB0IHNheWluJyAgc2hlIGEgZ29sZCBkaWdnZXIKWzAxOjIxLjI4XUJ1dCBzaGUgYWluJyB0IG1lc3NpbicgIHdpdCBubyBicm9rZSBuaWdnYXoKWzAxOjIzLjk1XQpbMDE6MjQuNTBdTm93IEkgYWluJyB0IHNheWluJyAgc2hlIGEgZ29sZCBkaWdnZXIKWzAxOjI2LjU4XQpbMDE6MjcuMzBdQnV0IHNoZSBhaW4ndCBtZXNzaW4gd2l0IG5vIGJyb2tlIG5pZ2dhegpbMDE6MjguNzldR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMTozMi42OV1HZXQgZG93biBnaXJsIGdvIGhlYWQgZ2V0IGRvd24KWzAxOjM0Ljc2XQpbMDE6MzUuMzFdR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMTozOC4wMF1HZXQgZG93biBnaXJsIGdvIGhlYWQKWzAxOjM5LjMxXVtWZXJzZSAyXQpbMDE6MzkuODRdMTggeWVhcnMgIDE4IHllYXJzClswMTo0MS41Nl1TaGUgZ290IG9uZSBvZiB5byBraWRzIGdvdCB5b3UgZm9yIDE4IHllYXJzClswMTo0NS4wMF1JIGtub3cgc29tZWJvZHkgcGF5aW4nICBjaGlsZCBzdXBwb3J0IGZvciBvbmUgb2YgaGlzIGtpZHMKWzAxOjQ3LjczXUhpcyBiYWJ5IG1vbW1hJyBzIGNhciBhbmQgY3JpYiBpcyBiaWdnZXIgdGhhbiBoaXMKWzAxOjUwLjQxXVlvdSB3aWxsIHNlZSBoaW0gb24gVFYgQW55IEdpdmVuIFN1bmRheQpbMDE6NTMuMTFdV2luIHRoZSBTdXBlcmJvd2wgYW5kIGRyaXZlIG9mZiBpbiBhIEh5dW5kYWkKWzAxOjU1LjczXVNoZSB3YXMgc3Bvc2UgdG8gYnV5IHlhIHNob3J0eSBUWUNPIHdpdGggeWEgbW9uZXkKWzAxOjU4LjM3XVNoZSB3ZW50IHRvIHRoZSBkb2N0b3IgZ290IGxpcG8gd2l0aCB5YSBtb25leQpbMDI6MDAuNTldU2hlIHdhbGtpbicgIGFyb3VuZCBsb29raW5nJyAgbGlrZSBNaWNoZWFsIHdpdGggeWEgbW9uZXkKWzAyOjAzLjEwXVNob3VsZCBvZiBnb3QgdGhhdCBpbnN1cmVkIGdvdCBHRUlDTyBmb3IgeWEgbW9uZWVleQpbMDI6MDUuODZdClswMjowNy41NV1JZiB5b3UgYWluJ3Qgbm8gcHVuayBob2xsYSBgV2Ugd2FudCBwcmVudXAnIApbMDI6MDkuOTBdYFdFIFdBTlQgUFJFTlVQICcgClswMjoxMS4xN11ZZWFoICBpdCcgcyBzb21ldGhpbmcgdGhhdCB5b3UgbmVlZCB0byBoYXZlClswMjoxMy44NV1DYXVzZSB3aGVuIHNoZSBsZWF2ZSB5byBhc3Mgc2hlIGdvbicgIGxlYXZlIHdpdGggaGFsZgpbMDI6MTYuNTZdMTggeWVhcnMgIDE4IHllYXJzClswMjoxOC42Ml1BbmQgb24gaGVyIDE4dGggYmlydGhkYXkgaGUgZm91bmQgb3V0IGl0IHdhc24nIHQgaGlzClswMjoyMS4zMF1bQ2hvcnVzXQpbMDI6MjEuNTVdTm93IEkgYWluJyB0IHNheWluJyAgc2hlIGEgZ29sZCBkaWdnZXIKWzAyOjIzLjUzXUJ1dCBzaGUgYWluJyB0IG1lc3NpbicgIHdpdCBubyBicm9rZSBuaWdnYXoKWzAyOjI3LjA1XU5vdyBJIGFpbicgdCBzYXlpbicgIHNoZSBhIGdvbGQgZGlnZ2VyClswMjoyOS42MV1CdXQgc2hlIGFpbid0IG1lc3NpbiB3aXQgbm8gYnJva2UgbmlnZ2F6ClswMjozMS41Nl0KWzAyOjMyLjMyXUdldCBkb3duIGdpcmwgZ28gaGVhZCBnZXQgZG93bgpbMDI6MzQuOTddR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMjozNy41M11HZXQgZG93biBnaXJsIGdvIGhlYWQgZ2V0IGRvd24KWzAyOjM5LjQ0XQpbMDI6NDAuMTFdR2V0IGRvd24gZ2lybCBnbyBoZWFkClswMjo0MS42Nl1bVmVyc2UgM10KWzAyOjQyLjExXU5vdyBJIGFpbicgdCBzYXlpbicgIHlvdSBhIGdvbGQgZGlnZ2VyIHlvdSBnb3QgbmVlZHMKWzAyOjQ0Ljg5XVlvdSBkb24nIHQgd2FudCB5YSBkdWRlIHRvIHNtb2tlIGJ1dCBoZSBjYW4nIHQgYnV5IHdlZWQKWzAyOjQ3LjYzXVlvdSBnb3Qgb3V0IHRvIGVhdCBhbmQgaGUgY2FuJyB0IHBheSB5JyBhbGwgY2FuJ3QgbGVhdmUKWzAyOjUwLjI1XVRoZXJlJyBzIGRpc2hlcyBpbiB0aGUgYmFjayAgaGUgZ290dGEgcm9sbCB1cCBoaXMgc2xlZXZlcwpbMDI6NTIuODZdQnV0IHdoeSB5JyBhbGwgd2F0Y2ggaGltIHdhc2hpbicgClswMjo1NC4zM11IZSBnb25lIG1ha2UgaXQgaW50byBhIEJlbnogb3V0IG9mIHRoYXQgRGF0c29uClswMjo1Ny41Ml1IZSBnb3QgdGhhdCBhbWJpdGlvbiBiYWJ5IGxvb2sgaW4gaGlzIGV5ZXMKWzAzOjAwLjQ1XVRoaXMgd2VlayBoZSBtb3BwaW4nICBmbG9vcnMgbmV4dCB3ZWVrIGl0JyBzIHRoZSBmcmllcwpbMDM6MDMuMDVdU28gIHN0aWNrIGJ5IGhpcyBzaWRlClswMzowNC45N11JIGtub3cgaGlzIGR1ZGUnIHMgYmFsbGluJyAgYnV0IHllYWggdGhhdHMgbmljZQpbMDM6MDcuNjRdQW5kIHRoZXkgZ29uJyAga2VlcCBjYWxsaW4nICBhbmQgdHJ5aW4nIApbMDM6MDkuNTBdQnV0IHlvdSBzdGF5IHJpZ2h0IGdpcmwKWzAzOjExLjAyXUJ1dCB3aGVuIHlvdSBnbyBoZSBnb25uYSBsZWF2ZSB5byBhc3MgZm9yIGEgd2hpdGUgZ2lybApbMDM6MTQuMzNdR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMzoxNi40OF1HZXQgZG93biBnaXJsIGdvIGhlYWQgZ2V0IGRvd24KWzAzOjE5LjA0XUdldCBkb3duIGdpcmwgZ28gaGVhZCBnZXQgZG93bgpbMDM6MjEuNTldR2V0IGRvd24gZ2lybCBnbyBoZWFkCg==",
                tag: 'Hip pop;rap',
                duration: '3:28',
            
            },
            {
                tid: 13,
                title: 'Alone Intelligence',
                artist: 'Camellia',
                audio_url: 'http://47.115.222.108/music/alone-intelligence.mp3',
                img_url: 'https://cametek.jp/heartofandroid/assets/jacket_full.jpg',
                release_time: '2018-01-26 16:48:30',
                preview_start: 90, 
                tag: 'nation',
                duration: '3:35',
            },
           
        ],

        
    },
   

}