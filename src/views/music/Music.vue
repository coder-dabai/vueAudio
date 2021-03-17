<template>
    <Player :musicList='musicList'></Player>
</template>

<script>
import Player from '@/components/Player.vue';
import axios from 'axios';
export default {
    data(){
        return{
         musicList:[]
        };
    },
    created(){
        this.$emit('switchTab','music');
        axios.get('/data/music.json').then(res =>{
            this.musicList = res.data.musicData;
        })
    },
    components:{
        Player
    }
}
</script>

<style lang="scss" scoped>

</style>