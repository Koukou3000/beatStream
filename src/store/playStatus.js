export default{
    state:{
        isPlaying: false
    },
    actions:{
        try2Play(context){
            if(context.isPlaying == true){
                return false
            }
            else{
                context.commit('PLAY')
            }
        }
    },
    mutations:{
        PLAY(context){
            if(!context.isPlaying){
                context.isPlaying = true
            }
        }
    }
}