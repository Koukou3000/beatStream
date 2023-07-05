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
        // 这种写法表示getTop3Tracks是一个方法， 用方法的方式调用getters，避免vuex自动缓存，更可以传递参数
        getTop3Tracks: (state)=>()=>{
            return state.trackList.slice(0,3)
        },
        getTrackDetail: (state)=>(tid)=>{
            return state.trackList.slice(tid-1, tid).pop() 
        },
        getAllTracks: (state)=>()=>{
            return state.trackList.slice()
        },
        getTwelveTracks:(state)=>()=>{
            return state.trackList.slice(3,15)
        },
        getTracksWithLyrics:(state)=>()=>{
            return state.trackList.slice(15,18)
        }

    },
    state:{  
        trackList:[
            {
                tid: 1,
                title: 'Embracing intelligences',
                artist: 'Camellia',
                audio_url: 'http://47.115.222.108/music/embracing-intelligences.mp3',
                img_url: 'https://cametek.jp/heartofandroid/assets/jacket_full.jpg',
                release_time: '2018-01-26 16:48:30',
                preview_start: 59,
                tag: 'nation;new age', 
                duration: '3:41',
            },
            {
                tid: 2,
                title: 'From Wired',
                artist: 'Scene From Gore Girls',
                audio_url: 'http://47.115.222.108/music/from-wired.mp3',
                img_url: 'http://47.115.222.108/pic/frankenstein.jpg',
                release_time: '2021-01-26 16:48:30',
                preview_start: 42, 
                tag: 'instrument;emotional',
                duration: '2:57',
            },
            {
                tid: 3,
                title: 'Be Fine',
                artist: 'Soba',
                audio_url: 'http://47.115.222.108/music/be-fine(soba-remix).mp3',
                img_url: 'http://47.115.222.108/pic/artworks-000638209432-mgb3fw-t500x500.jpg',
                release_time: '2018-01-26 16:48:30',
                preview_start: 37, 
                tag: 'nation',
                duration: '3:29',
            },
         
            {
                tid: 4,
                title: 'Enigma',
                artist: 'Nhato',
                audio_url: 'http://47.115.222.108/music/enigma.mp3',
                img_url: 'http://47.115.222.108/pic/artworks-000659927899-ysnz7v-t500x500.jpg',
                release_time: '2019-01-26 16:48:30',
                preview_start: 190, 
                tag: 'Trance;eletro;nhato',
                duration: '6:23',
            },
            {
                tid: 5,
                title: 'Fjordland',
                artist: 'aran',
                audio_url: 'http://47.115.222.108/music/fjordland.mp3',
                img_url: 'https://www.diverse.direct/wp/wp-content/uploads/470_660_DVSP-0264_jacket.jpg',
                release_time: '2022-01-26 16:48:30',
                preview_start: 0, 
                tag: 'Trance;space',
                duration: '5:52',
            },
            {
                tid: 6,
                title: "Fallin' Deep",
                artist: 'Nahto',
                audio_url: 'http://47.115.222.108/music/fallin-deep.mp3',
                img_url: 'http://47.115.222.108/pic/artworks-000218266328-fij85p-t500x500.jpg',
                release_time: '2017-01-26 16:48:30',
                preview_start: 0, 
                tag: 'wild;eletro',
                duration: '4:03',
            },
            {
                tid:7,
                title: 'STINGER MISSLE',
                artist: 'Akira Complex',
                audio_url: 'http://47.115.222.108/music/stinger-missle.mp3',
                img_url: 'http://47.115.222.108/pic/artworks-000248233524-ogosqq-t500x500.jpg',
                release_time: '2017-01-26 16:48:30',
                preview_start: 16, 
                duration: '4:42',
                tag: 'complex;sound effect',
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
                duration: '5:09',
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
                img_url: 'https://www.diverse.direct/wp/wp-content/uploads/470_MRX-051_FG01.png',
                release_time: '2021-01-26 16:48:30',
                preview_start: 0, 
                tag: 'happy;eletro',  
                duration: '3:22',
            },
            {
                tid: 11,
                title: 'Cortado',
                artist: 'tokiwa',
                audio_url: 'http://47.115.222.108/music/cortado.mp3',
                img_url: 'http://47.115.222.108/pic/artworks-000575341730-3u531p-t500x500.jpg',
                release_time: '2021-01-26 16:48:30',
                preview_start: 0, 
                tag: 'hardcore;happy',
                duration: '3:41',
            },
            {
                tid: 12,
                title: 'I Was Here For You',
                artist: 'Mameyudoufu',
                audio_url: 'http://47.115.222.108/music/i-was-here-for-you.mp3',
                img_url: 'http://47.115.222.108/pic/artworks-zDMzB4zr75TlAqyf-0F5sZA-t500x500.jpg',
                release_time: '2004-01-26 16:48:30',
                preview_start: 19, 
                tag: 'hardcore; future',
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
            {
                tid: 14,
                title: 'On Your Mark',
                artist: 'Scene From Gore Girls',
                audio_url: 'http://47.115.222.108/music/on-your-mark.mp3',
                img_url: 'http://47.115.222.108/pic/artworks-zxYyS4KFSJ99LdFT-xWskpg-t500x500.jpg',
                release_time: '2022-07-26 16:48:30',
                preview_start: 57, 
                duration: '2:58',
                tag: 'guitar;post rock',
            },
            {
                tid: 15,
                title: 'Sonder',
                artist: 'jaron',
                audio_url: 'http://47.115.222.108/music/sonder.mp3',
                img_url: 'http://47.115.222.108/pic/artworks-05zUD98Sk7haFXla-2nOJgA-t500x500.jpg',
                release_time: '2018-01-26 16:48:30',
                preview_start: 90, 
                tag: 'nation',
                duration: '3:35',
            },
            {
                tid: 16,
                title: '简单爱',
                artist: '周杰伦',
                audio_url: 'http://47.115.222.108/music/jian-dan-ai.mp3',
                img_url: 'http://47.115.222.108/pic/T002R300x300M000000I5jJB3blWeN_2.webp',
                release_time: '',
                preview_start: 66,
                tag: 'pop;ease',
                lyric: "W3RpOueugOWNleeIsV0KW2FyOuWRqOadsOS8pl0KW2FsOuiMg+eJueilv10KW2J5Ol0KW29mZnNldDowXQpbMDA6MDAuMDBd566A5Y2V54ixIC0g5ZGo5p2w5LymIChKYXkgQ2hvdSkKWzAwOjA2LjcxXeivje+8muW+kOiLpeeRhApbMDA6MTMuNDNd5puy77ya5ZGo5p2w5LymClswMDoyMC4xNV3nvJbmm7LvvJrmnpfov4jlj68KWzAwOjI2Ljg3XeivtOS4jeS4iuS4uuS7gOS5iCDmiJHlj5jlvpflvojkuLvliqgKWzAwOjMxLjc5XeiLpeeIseS4iuS4gOS4quS6uiDku4DkuYjpg73kvJrlgLzlvpfljrvlgZoKWzAwOjM2Ljc5XeaIkeaDs+Wkp+WjsOWuo+W4gyDlr7nkvaDkvp3kvp3kuI3oiI0KWzAwOjQxLjcxXei/numalOWjgemCu+WxhemDveeMnOWIsOaIkeeOsOWcqOeahOaEn+WPlwpbMDA6NDYuNjhd5rKz6L6555qE6aOOIOWcqOWQueedgOWktOWPkSDpo5jliqgKWzAwOjUxLjYyXeeJteedgOS9oOeahOaJiyDkuIDpmLXojqvlkI3mhJ/liqgKWzAwOjU2LjUzXeaIkeaDs+W4puS9oCDlm57miJHnmoTlpJblqYblrrYKWzAxOjAwLjI5XeS4gOi1t+eci+edgOaXpeiQvSDkuIDnm7TliLDmiJHku6zpg73nnaHnnYAKWzAxOjA2LjQzXeaIkeaDs+Wwsei/meagt+eJteedgOS9oOeahOaJi+S4jeaUvuW8gApbMDE6MTEuMzRd54ix6IO95LiN6IO95aSf5rC46L+c5Y2V57qv5rKh5pyJ5oKy5ZOAClswMToxNi4wNl3miJEg5oOz5bim5L2g6aqR5Y2V6L2mClswMToxOC40Nl3miJEg5oOz5ZKM5L2g55yL5qOS55CDClswMToyMS42MV3mg7Pov5nmoLfmsqHmi4Xlv6cKWzAxOjIzLjQ3XeWUseedgOatjCDkuIDnm7TotbAKWzAxOjI2LjE2XeaIkeaDs+Wwsei/meagt+eJteedgOS9oOeahOaJi+S4jeaUvuW8gApbMDE6MzEuMTdd54ix5Y+v5LiN5Y+v5Lul566A566A5Y2V5Y2V5rKh5pyJ5Lyk5a6zClswMTozNS43NV3kvaAg6Z2g552A5oiR55qE6IKp6IaAClswMTozOC4zMV3kvaAg5Zyo5oiR6IO45Y+j552h552AClswMTo0MS4zMV3lg4/ov5nmoLfnmoTnlJ/mtLsKWzAxOjQzLjIyXeaIkeeIseS9oCDkvaDniLHmiJEKWzAxOjQ1LjYzXeaDsyDnroDnroDljZXljZUg54ixClswMTo1NS41MV3mg7Mg566A566A5Y2V5Y2VIOeIsQpbMDI6MDUuODNd5oiR5oOz5aSn5aOw5a6j5biDIOWvueS9oOS+neS+neS4jeiIjQpbMDI6MTAuNjdd6L+e6ZqU5aOB6YK75bGF6YO954yc5Yiw5oiR546w5Zyo55qE5oSf5Y+XClswMjoxNS42OF3msrPovrnnmoTpo44g5Zyo5ZC5552A5aS05Y+RIOmjmOWKqApbMDI6MjAuNjFd54m1552A5L2g55qE5omLIOS4gOmYteiOq+WQjeaEn+WKqApbMDI6MjUuNjVd5oiR5oOz5bim5L2gIOWbnuaIkeeahOWkluWphuWutgpbMDI6MjkuMzFd5LiA6LW355yL552A5pel6JC9IOS4gOebtOWIsOaIkeS7rOmDveedoeedgApbMDI6MzUuNDNd5oiR5oOz5bCx6L+Z5qC354m1552A5L2g55qE5omL5LiN5pS+5byAClswMjo0MC40NF3niLHog73kuI3og73lpJ/msLjov5zljZXnuq/msqHmnInmgrLlk4AKWzAyOjQ0Ljk1XeaIkSDmg7PluKbkvaDpqpHljZXovaYKWzAyOjQ3LjUzXeaIkSDmg7PlkozkvaDnnIvmo5LnkIMKWzAyOjUwLjY4XeaDs+i/meagt+ayoeaLheW/pwpbMDI6NTIuNTBd5ZSx552A5q2MIOS4gOebtOi1sApbMDI6NTUuMzVd5oiR5oOz5bCx6L+Z5qC354m1552A5L2g55qE5omL5LiN5pS+5byAClswMzowMC4yMV3niLHlj6/kuI3lj6/ku6XnroDnroDljZXljZXmsqHmnInkvKTlrrMKWzAzOjA0Ljc3XeS9oCDpnaDnnYDmiJHnmoTogqnohoAKWzAzOjA3LjM2XeS9oCDlnKjmiJHog7jlj6PnnaHnnYAKWzAzOjEwLjQ0XeWDj+i/meagt+eahOeUn+a0uwpbMDM6MTIuMzJd5oiR54ix5L2gIOS9oOeIseaIkQpbMDM6MTQuNzJd5oOzIOeugOeugOWNleWNlSDniLEKWzAzOjI0LjYzXeaDsyDnroDnroDljZXljZUg54ixClswMzozNC45OF3miJHmg7PlsLHov5nmoLfnibXnnYDkvaDnmoTmiYvkuI3mlL7lvIAKWzAzOjM5Ljg0XeeIseiDveS4jeiDveWkn+awuOi/nOWNlee6r+ayoeacieaCsuWTgApbMDM6NDQuMzdd5oiRIOaDs+W4puS9oOmqkeWNlei9pgpbMDM6NDYuOTVd5oiRIOaDs+WSjOS9oOeci+ajkueQgwpbMDM6NTAuMDRd5oOz6L+Z5qC35rKh5ouF5b+nClswMzo1MS45M13llLHnnYDmrYwg5LiA55u06LWwClswMzo1NC43Ml3miJHmg7PlsLHov5nmoLfnibXnnYDkvaDnmoTmiYvkuI3mlL7lvIAKWzAzOjU5LjY2XeeIseWPr+S4jeWPr+S7peeugOeugOWNleWNleayoeacieS8pOWuswpbMDQ6MDQuMTdd5L2gIOmdoOedgOaIkeeahOiCqeiGgApbMDQ6MDYuNzhd5L2gIOWcqOaIkeiDuOWPo+edoeedgApbMDQ6MDkuODVd5YOP6L+Z5qC355qE55Sf5rS7ClswNDoxMS43Ml3miJHniLHkvaAg5L2g54ix5oiR",
                duration: '4:31'
            },
            {
                tid: 17,
                title: '龙卷风',
                artist: '周杰伦',
                audio_url: 'http://47.115.222.108/music/long-juan-feng.mp3',
                img_url: 'http://47.115.222.108/pic/T002R300x300M000000f01724fd7TH_1.webp',
                release_time: '',
                preview_start: 66,
                tag: 'pop;ease',
                lyric: "W3RpOum+meWNt+mjjl0KW2FyOuWRqOadsOS8pl0KW2FsOkpheV0KW2J5Ol0KW29mZnNldDowXQpbMDA6MDAuMDBd6b6Z5Y236aOOIC0g5ZGo5p2w5LymIChKYXkgQ2hvdSkKWzAwOjA1LjU0Xeivje+8muW+kOiLpeeRhApbMDA6MTEuMDhd5puy77ya5ZGo5p2w5LymClswMDoxNi42Ml3nvJbmm7LvvJrpkp/lhbTmsJEKWzAwOjIyLjE2XeWItuS9nOS6uu+8muWRqOadsOS8pgpbMDA6MjcuNzFd54ix5YOP5LiA6Zi16aOO5ZC55a6M5a6D5bCx6LWwClswMDozNC4xNV3ov5nmoLfnmoToioLlpY/osIHpg73ml6Dlj6/lpYjkvZUKWzAwOjQwLjgwXeayoeacieS9oOS7peWQjuaIkeeBtemtguWkseaOpwpbMDA6NDcuNDVd6buR5LqR5Zyo6ZmN6JC95oiR6KKr5a6D5ouW552A6LWwClswMDo1My42OV3pnZnpnZnmgoTmgoTpu5jpu5jnprvlvIAKWzAwOjU3LjA0XemZt+WFpeS6huWNsemZqei+uee8mEJhYnkKWzAxOjAxLjIyXeaIkeeahOS4lueVjOW3sueLgumjjuaatOmbqHd1ClswMTowNy41MV3niLHmg4XmnaXnmoTlpKrlv6vlsLHlg4/pvpnljbfpo44KWzAxOjEwLjc5Xeemu+S4jeW8gOaatOmjjuWciOadpeS4jeWPiumAgwpbMDE6MTMuNzRd5oiR5LiN6IO95YaN5oOz5oiR5LiN6IO95YaN5oOzClswMToxNy4wOF3miJHkuI3miJHkuI3miJHkuI3og70KWzAxOjIwLjgyXeeIseaDhei1sOeahOWkquW/q+WwseWDj+m+meWNt+mjjgpbMDE6MjQuMTZd5LiN6IO95om/5Y+X5oiR5bey5peg5aSE5Y+v6LqyClswMToyNy4wN13miJHkuI3opoHlho3mg7PmiJHkuI3opoHlho3mg7MKWzAxOjMwLjQyXeaIkeS4jeaIkeS4jeaIkeS4jeimgeWGjeaDs+S9oApbMDE6MzQuMjhd5LiN55+l5LiN6KeJ5L2g5bey57uP56a75byA5oiRClswMTozNy40N13kuI3nn6XkuI3op4nmiJHot5/kuobov5noioLlpY8KWzAxOjQwLjgyXeWQjuefpeWQjuinieWPiOi/h+S6huS4gOS4queniwpbMDE6NDQuMTNd5ZCO55+l5ZCO6KeJ5oiR6K+l5aW95aW955Sf5rS7ClswMTo0Ny4zMF3pnZnpnZnmgoTmgoTpu5jpu5jnprvlvIAKWzAxOjUwLjM4XemZt+WFpeS6huWNsemZqei+uee8mEJhYnkKWzAxOjU0LjA4XQpbMDE6NTQuNjJd5oiR55qE5LiW55WM5bey54uC6aOO5pq06Zuod3UKWzAyOjAwLjg1XeeIseaDheadpeeahOWkquW/q+WwseWDj+m+meWNt+mjjgpbMDI6MDQuMTNd56a75LiN5byA5pq06aOO5ZyI5p2l5LiN5Y+K6YCDClswMjowNy4wMl3miJHkuI3og73lho3mg7PmiJHkuI3og73lho3mg7MKWzAyOjEwLjUwXeaIkeS4jeaIkeS4jeaIkeS4jeiDvQpbMDI6MTQuMTVd54ix5oOF6LWw55qE5aSq5b+r5bCx5YOP6b6Z5Y236aOOClswMjoxNy40N13kuI3og73mib/lj5fmiJHlt7Lml6DlpITlj6/ourIKWzAyOjIwLjM4XeaIkeS4jeimgeWGjeaDs+aIkeS4jeimgeWGjeaDswpbMDI6MjMuNzZd5oiR5LiN5oiR5LiN5oiR5LiN6KaB5YaN5oOz5L2gClswMjoyOS44OF0KWzAyOjU0LjIwXeeIseaDheadpeeahOWkquW/q+WwseWDj+m+meWNt+mjjgpbMDI6NTcuNDJd56a75LiN5byA5pq06aOO5ZyI5p2l5LiN5Y+K6YCDClswMzowMC4zMV3miJHkuI3og73lho3mg7PmiJHkuI3og73lho3mg7MKWzAzOjAzLjc1XeaIkeS4jeaIkeS4jeaIkeS4jeiDvQpbMDM6MDcuNDhd54ix5oOF6LWw55qE5aSq5b+r5bCx5YOP6b6Z5Y236aOOClswMzoxMC44MV3kuI3og73mib/lj5fmiJHlt7Lml6DlpITlj6/ourIKWzAzOjEzLjczXeaIkeS4jeimgeWGjeaDs+aIkeS4jeimgeWGjeaDswpbMDM6MTcuMTZd5oiR5LiN5oiR5LiN5oiR5LiN6KaB5YaN5oOz5L2gClswMzoyMC44M13kuI3nn6XkuI3op4nkvaDlt7Lnu4/nprvlvIDmiJEKWzAzOjI0LjA4XeS4jeefpeS4jeinieaIkei3n+S6hui/meiKguWljwpbMDM6MjcuNDNd5ZCO55+l5ZCO6KeJ5Y+I6L+H5LqG5LiA5Liq56eLClswMzozMC43N13lkI7nn6XlkI7op4nmiJHor6Xlpb3lpb3nlJ/mtLsKWzAzOjM0LjE3XeS4jeefpeS4jeinieS9oOW3sue7j+emu+W8gOaIkQpbMDM6MzcuMzld5LiN55+l5LiN6KeJ5oiR6Lef5LqG6L+Z6IqC5aWPClswMzo0MC43OF3lkI7nn6XlkI7op4nlj4jov4fkuobkuIDkuKrnp4sKWzAzOjQ0LjA0XeWQjuefpeWQjuinieaIkeivpeWlveWlveeUn+a0uwpbMDM6NDcuNTRd5LiN55+l5LiN6KeJ5L2g5bey57uP56a75byA5oiRClswMzo1MC43OV3kuI3nn6XkuI3op4nmiJHot5/kuobov5noioLlpY8KWzAzOjU0LjI4XeWQjuefpeWQjuinieWQjuefpeWQjuiniQ==",
                duration: '4:14'
            },
            {
                tid: 18,
                title: 'Gold Digger',
                artist: 'Ye',
                audio_url: 'http://47.115.222.108/music/gold-digger.mp3',
                img_url: 'http://47.115.222.108/pic/ab67616d0000b273428d2255141c2119409a31b2.jfif',
                release_time: '2004-01-26 16:48:30',
                preview_start: 19, 
                lyric: "W3RpOmdvbGQgZGlnZ2VyXQpbYXI6a2FueWUgd2VzdCBmdCBqYW1pZSBmb3h4XQpbYWw6MjA4MDExXQpbYnk6XQpbb2Zmc2V0OjBdClswMDowMC40M11TaGUgdGFrZSBteSBtb25leSAgd2hlbiBJJyBtIGluIG5lZWQKWzAwOjAzLjk0XQpbMDA6MDQuOThdWWVhaCBzaGUnIHMgYSB0cmlmbGluZycgIGZyaWVuZCBpbmRlZWQKWzAwOjA4LjE3XQpbMDA6MDkuMjJdT2ggc2hlJyBzIGEgZ29sZCBkaWdnYQpbMDA6MTAuODNdClswMDoxMS40Ml1XYXkgb3ZlciB0b3duClswMDoxMi44MF0KWzAwOjEzLjg3XVRoYXQgZGlncyBvbiBtZQpbMDA6MTUuMjFdW0Nob3J1c10KWzAwOjE3LjM2XU5vdyBJIGFpbicgdCBzYXlpbicgIHNoZSBhIGdvbGQgZGlnZ2VyClswMDoyMC4wMl1CdXQgc2hlIGFpbicgdCBtZXNzaW4nICB3aXQgbm8gYnJva2UgbmlnZ2F6ClswMDoyMi4wM10KWzAwOjIyLjYzXU5vdyBJIGFpbicgdCBzYXlpbicgIHNoZSBhIGdvbGQgZGlnZ2VyClswMDoyNC41Nl0KWzAwOjI1LjE2XUJ1dCBzaGUgYWluJ3QgbWVzc2luIHdpdCBubyBicm9rZSBuaWdnYXoKWzAwOjI3LjExXQpbMDA6MjcuODhdR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMDozMC40OF1HZXQgZG93biBnaXJsIGdvIGhlYWQgZ2V0IGRvd24KWzAwOjMzLjA1XUdldCBkb3duIGdpcmwgZ28gaGVhZCBnZXQgZG93bgpbMDA6MzUuNjNdR2V0IGRvd24gZ2lybCBnbyBoZWFkClswMDozNy42NV1bVmVyc2UgMV0KWzAwOjM4LjE1XUN1dGllIHRoZSBib21iClswMDozOC42NF1NZXQgaGVyIGF0IGEgYmVhdXR5IHNhbG9uClswMDozOS45NF1XaXRoIGEgYmFieSBMb3VpcyBWdWl0dG9uClswMDo0MS4xNF1VbmRlciBoZXIgdW5kZXJhcm0KWzAwOjQxLjc2XVNoZSBzYWlkIEkgY2FuIHRlbGwgeW91IHJvY2sKWzAwOjQ0LjA4XUkgY2FuIHRlbGwgYnkgeWEgY2hhcm0KWzAwOjQ1LjM3XUZhciBhcyBnaXJscyB5b3UgZ290IGEgZmxvY2sKWzAwOjQ2LjkyXUkgY2FuIHRlbGwgYnkgeWEgY2hhcm0gYW5kIHlhIGFybQpbMDA6NDguNjddQnV0IEknIG0gbG9va2luZycgIGZvciB0aGUgb25lICBoYXZlIHlvdSBzZWVuIGhlciAKWzAwOjUwLjg5XU15IHBzeWNoaWMgdG9sZCBtZSBzaGUgaGF2ZSBhIGEqKiBsaWtlIFNlcmVuYQpbMDA6NTIuODRdVHJpbmEgIEplbm5pZmVyIExvcGV6ICBmb3VyIGtpZHMKWzAwOjU1LjkzXUFuIEkgZ290dGEgdGFrZSBhbGwgdGhleSBiYWQgYSoqJyBzIHRvIHNob3ctYml6ClswMDo1OC4wOF1PayBnZXQgeWEga2lkcyBidXQgdGhlbiB0aGV5IGdvdCB0aGVpciBmcmllbmRzClswMTowMS4xM11JIHB1bGxlZCB1cCBpbiB0aGUgQmVueiAgdGhleSBhbGwgZ290IHVwIGluClswMTowMy43MV1XZSBhbGwgd2VudCB0byBEZW4gYW5kIHRoZW4gSSBoYWQgdG8gcGF5ClswMTowNi40Ml1JZiB5b3UgZnVja2luJyAgd2l0aCB0aGlzIGdpcmwgdGhlbiB5b3UgYmV0dGEgYmUgcGF5ZWQKWzAxOjA5LjIzXVlvdSBrbm93IHdoeQpbMDE6MTAuMTldSXQgdGFrZSB0b28gbXVjaCB0byB0b3VjaCBoZXIKWzAxOjExLjk5XUZyb20gd2hhdCBJIGhlYXJkIHNoZSBnb3QgYSBiYWJ5IGJ5IEJ1c3RhClswMToxNC40OV1NeSBiZXN0IGZyaWVuZCBzYXkgc2hlIHVzZSB0byBmKiprIHdpdCBVc2hlcgpbMDE6MTYuNzFdSSBkb24nIHQgY2FyZSB3aGF0IG5vbmUgb2YgeScgYWxsIHNheSBJIHN0aWxsIGxvdmUgaGVyClswMToxOS41OF1bQ2hvcnVzXQpbMDE6MTkuNzhdTm93IEkgYWluJyB0IHNheWluJyAgc2hlIGEgZ29sZCBkaWdnZXIKWzAxOjIxLjI4XUJ1dCBzaGUgYWluJyB0IG1lc3NpbicgIHdpdCBubyBicm9rZSBuaWdnYXoKWzAxOjIzLjk1XQpbMDE6MjQuNTBdTm93IEkgYWluJyB0IHNheWluJyAgc2hlIGEgZ29sZCBkaWdnZXIKWzAxOjI2LjU4XQpbMDE6MjcuMzBdQnV0IHNoZSBhaW4ndCBtZXNzaW4gd2l0IG5vIGJyb2tlIG5pZ2dhegpbMDE6MjguNzldR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMTozMi42OV1HZXQgZG93biBnaXJsIGdvIGhlYWQgZ2V0IGRvd24KWzAxOjM0Ljc2XQpbMDE6MzUuMzFdR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMTozOC4wMF1HZXQgZG93biBnaXJsIGdvIGhlYWQKWzAxOjM5LjMxXVtWZXJzZSAyXQpbMDE6MzkuODRdMTggeWVhcnMgIDE4IHllYXJzClswMTo0MS41Nl1TaGUgZ290IG9uZSBvZiB5byBraWRzIGdvdCB5b3UgZm9yIDE4IHllYXJzClswMTo0NS4wMF1JIGtub3cgc29tZWJvZHkgcGF5aW4nICBjaGlsZCBzdXBwb3J0IGZvciBvbmUgb2YgaGlzIGtpZHMKWzAxOjQ3LjczXUhpcyBiYWJ5IG1vbW1hJyBzIGNhciBhbmQgY3JpYiBpcyBiaWdnZXIgdGhhbiBoaXMKWzAxOjUwLjQxXVlvdSB3aWxsIHNlZSBoaW0gb24gVFYgQW55IEdpdmVuIFN1bmRheQpbMDE6NTMuMTFdV2luIHRoZSBTdXBlcmJvd2wgYW5kIGRyaXZlIG9mZiBpbiBhIEh5dW5kYWkKWzAxOjU1LjczXVNoZSB3YXMgc3Bvc2UgdG8gYnV5IHlhIHNob3J0eSBUWUNPIHdpdGggeWEgbW9uZXkKWzAxOjU4LjM3XVNoZSB3ZW50IHRvIHRoZSBkb2N0b3IgZ290IGxpcG8gd2l0aCB5YSBtb25leQpbMDI6MDAuNTldU2hlIHdhbGtpbicgIGFyb3VuZCBsb29raW5nJyAgbGlrZSBNaWNoZWFsIHdpdGggeWEgbW9uZXkKWzAyOjAzLjEwXVNob3VsZCBvZiBnb3QgdGhhdCBpbnN1cmVkIGdvdCBHRUlDTyBmb3IgeWEgbW9uZWVleQpbMDI6MDUuODZdClswMjowNy41NV1JZiB5b3UgYWluJ3Qgbm8gcHVuayBob2xsYSBgV2Ugd2FudCBwcmVudXAnIApbMDI6MDkuOTBdYFdFIFdBTlQgUFJFTlVQICcgClswMjoxMS4xN11ZZWFoICBpdCcgcyBzb21ldGhpbmcgdGhhdCB5b3UgbmVlZCB0byBoYXZlClswMjoxMy44NV1DYXVzZSB3aGVuIHNoZSBsZWF2ZSB5byBhc3Mgc2hlIGdvbicgIGxlYXZlIHdpdGggaGFsZgpbMDI6MTYuNTZdMTggeWVhcnMgIDE4IHllYXJzClswMjoxOC42Ml1BbmQgb24gaGVyIDE4dGggYmlydGhkYXkgaGUgZm91bmQgb3V0IGl0IHdhc24nIHQgaGlzClswMjoyMS4zMF1bQ2hvcnVzXQpbMDI6MjEuNTVdTm93IEkgYWluJyB0IHNheWluJyAgc2hlIGEgZ29sZCBkaWdnZXIKWzAyOjIzLjUzXUJ1dCBzaGUgYWluJyB0IG1lc3NpbicgIHdpdCBubyBicm9rZSBuaWdnYXoKWzAyOjI3LjA1XU5vdyBJIGFpbicgdCBzYXlpbicgIHNoZSBhIGdvbGQgZGlnZ2VyClswMjoyOS42MV1CdXQgc2hlIGFpbid0IG1lc3NpbiB3aXQgbm8gYnJva2UgbmlnZ2F6ClswMjozMS41Nl0KWzAyOjMyLjMyXUdldCBkb3duIGdpcmwgZ28gaGVhZCBnZXQgZG93bgpbMDI6MzQuOTddR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMjozNy41M11HZXQgZG93biBnaXJsIGdvIGhlYWQgZ2V0IGRvd24KWzAyOjM5LjQ0XQpbMDI6NDAuMTFdR2V0IGRvd24gZ2lybCBnbyBoZWFkClswMjo0MS42Nl1bVmVyc2UgM10KWzAyOjQyLjExXU5vdyBJIGFpbicgdCBzYXlpbicgIHlvdSBhIGdvbGQgZGlnZ2VyIHlvdSBnb3QgbmVlZHMKWzAyOjQ0Ljg5XVlvdSBkb24nIHQgd2FudCB5YSBkdWRlIHRvIHNtb2tlIGJ1dCBoZSBjYW4nIHQgYnV5IHdlZWQKWzAyOjQ3LjYzXVlvdSBnb3Qgb3V0IHRvIGVhdCBhbmQgaGUgY2FuJyB0IHBheSB5JyBhbGwgY2FuJ3QgbGVhdmUKWzAyOjUwLjI1XVRoZXJlJyBzIGRpc2hlcyBpbiB0aGUgYmFjayAgaGUgZ290dGEgcm9sbCB1cCBoaXMgc2xlZXZlcwpbMDI6NTIuODZdQnV0IHdoeSB5JyBhbGwgd2F0Y2ggaGltIHdhc2hpbicgClswMjo1NC4zM11IZSBnb25lIG1ha2UgaXQgaW50byBhIEJlbnogb3V0IG9mIHRoYXQgRGF0c29uClswMjo1Ny41Ml1IZSBnb3QgdGhhdCBhbWJpdGlvbiBiYWJ5IGxvb2sgaW4gaGlzIGV5ZXMKWzAzOjAwLjQ1XVRoaXMgd2VlayBoZSBtb3BwaW4nICBmbG9vcnMgbmV4dCB3ZWVrIGl0JyBzIHRoZSBmcmllcwpbMDM6MDMuMDVdU28gIHN0aWNrIGJ5IGhpcyBzaWRlClswMzowNC45N11JIGtub3cgaGlzIGR1ZGUnIHMgYmFsbGluJyAgYnV0IHllYWggdGhhdHMgbmljZQpbMDM6MDcuNjRdQW5kIHRoZXkgZ29uJyAga2VlcCBjYWxsaW4nICBhbmQgdHJ5aW4nIApbMDM6MDkuNTBdQnV0IHlvdSBzdGF5IHJpZ2h0IGdpcmwKWzAzOjExLjAyXUJ1dCB3aGVuIHlvdSBnbyBoZSBnb25uYSBsZWF2ZSB5byBhc3MgZm9yIGEgd2hpdGUgZ2lybApbMDM6MTQuMzNdR2V0IGRvd24gZ2lybCBnbyBoZWFkIGdldCBkb3duClswMzoxNi40OF1HZXQgZG93biBnaXJsIGdvIGhlYWQgZ2V0IGRvd24KWzAzOjE5LjA0XUdldCBkb3duIGdpcmwgZ28gaGVhZCBnZXQgZG93bgpbMDM6MjEuNTldR2V0IGRvd24gZ2lybCBnbyBoZWFkCg==",
                tag: 'Hip pop;rap',
                duration: '3:28',
            
            },
        ],

        
    },
   

}