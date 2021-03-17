<template>
    <div>
        <ul>
        <li @click="getDetail(movieId)" class="movie" v-for="movie in movieList" :key="movie.movieId">    
                <div class="movie-img">
                <img :src="movie.pic_url" alt="">
            </div>
            <div class="movie-info">
                 <div class="movie-info-movieName">
                     {{movie.movieName}}
                 </div>
                 <div class="movie-info-grade">
                     观众评 <span>{{movie.grade}}</span>
                 </div>
                 <div class="movie-info-actor">
                     主演：{{movie.actor}}
                 </div>
            </div>
            
        </li>
    </ul>
    <div v-show="isend" class="end">
        <h3>别翻了，已经到底啦</h3>
    </div>
    <div class="loading" v-show="isloading">
        <img src="@/assets/img/loading.gif" alt="">
    </div>
    </div>
    
</template>

<script>
import axios from 'axios';
export default {
    data(){
        return {
            movieList: [] ,         //电影列表
            isloading: true,
            isend: true
        };
    },
    methods:{
        getDetail(movieId){
         this.$router.push(`/moviedetail/${movieId}`);
        }
    },
    beforeCreate(){  
        //let url1 = 'https://bird.ioliu.cn/v2?url=http://v.juhe.cn/movie/movies.today?key=a2a9e9e6408bc752798811b522ef2863&cityid=6';
        //let url2 = 'https://bird.ioliu.cn/v2?url=https://api.jisuapi.com/movie/on?cityid=&city=成都&date=&appkey=654321fd40aa76c7'
        let url3 = '/data/moviejson.json'
        axios.get(url3).then(res=>{
            this.movieList = res.data.result;
               this.isloading = false;
        });
    },
    created(){
        this.$emit('switchTab','movie');
    }
}
</script>

<style lang="scss" scoped>
.movie{
    display: flex;
    padding: 0.2rem;
    border-bottom: 0.02rem solid #ccc;

        &-img{
        flex-grow: 1;
        width: 0;
        img{
            width: 100%;
        }
    }
    &-info{
        flex-grow: 3;
        width: 0;
        margin-left: 0.2rem;
        &-movieName{
           font-size: 0.34rem;
           color: #333;
           font-weight: 700;
        }
        &-grade{
            color: #666;
            font-size: 0.26rem;
            margin-top: 0.2rem;
           span{
               color: #faaf00;
           }
        }
        &-actor{
            color: #666;
            font-size: 0.26rem;
            margin-top: 0.13rem;
        }
    }
    }
    

.loading{
    
    position: fixed;
    bottom: 1rem;
    width: 100%;
    img{
        width: 2rem;
        display: block;
        margin: 0 auto;
    }
}

.end{
    text-align: center;
}
</style>