<template>
  <div>
    <!--专辑信息-->
    <div class="album">
      <div class="album-mask" :style="{background: 'url('+albumImg+') no-repeat center/cover'}"></div>
      <div class="album-img">
        <img :src="albumImg" alt />
      </div>
      <div class="album-info">
        <p class="album-info-title">{{albumTitle}}</p>
        <p class="album-info-author">{{albumAuthor}}</p>
        <div class="album-info-control clearfix">
          <div class="album-info-control-icon">
            <i class="album-info-control-icon-pre" @click="prev"></i>
            <i class="album-info-control-icon-play" v-show="!isPlay" @click="playMusic"></i>
            <i class="album-info-control-icon-pause" v-show="isPlay" @click="pauseMusic"></i>
            <i class="album-info-control-icon-next" @click="next"></i>
          </div>
          <span @click="toggleList=!toggleList" class="album-info-control-menu">歌单</span>
        </div>
      </div>
    </div>

    <!--歌单-->
    <transition name="slide">
      <ul class="music-list" v-show="toggleList">
        <li
          @click="selectMusic(index)"
          :class="['music-list-item',nowIndex == index?'selected':'']"
          v-for="(music,index) in musicList"
          :key="index"
        >
          <span>{{music.title}}&nbsp;-&nbsp;</span>
          <span>{{music.author}}</span>
        </li>
      </ul>
    </transition>

    <!--播放控件-->
    <div class="audio">
      <audio
        ref="musicAudio"
        @play="isPlay=true"
        @pause="isPlay=false"
        class="audio-ctrl"
        :src="musicSrc"
        autoplay
        controls
      ></audio>
    </div>

    <!-- 歌词-->
    <ul class="lrcList" ref="lrclist">
      <li :class="lrcIndex == index?'selected':''" v-for="(lrc,index) in lrcList" :key="lrc.time">
           {{lrc.lrc}}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  watch: {        //监听索引
    nowIndex() {
        let nowMusic = this.musicList[this.nowIndex];
      this.albumImg = nowMusic.musicImgSrc;
      this.albumTitle = nowMusic.title;
      this.albumAuthor = nowMusic.author;
      this.musicSrc = nowMusic.src;
      this.lrcList = [];  //歌曲索引变化时  歌词先清空
      this.lrcIndex = -1;

      axios.get(nowMusic.lrc).then(res=>{
        console.log(res.data);
        this.parseLrc(res.data);
      })
    }
  },
  props: ["musicList"],
  data() {
    return {
      nowIndex: -1, //当前歌曲索引
      albumImg: "/data/song/chou.jpg", //图片
      albumTitle: "", //歌名
      albumAuthor: "", //歌手
      isPlay: false,
      toggleList: true,
      musicSrc: "",
      lrcList:[],  //歌词数组
      lrcIndex:-1,
    };
  },
  methods: {
    selectMusic(index) {      //当我们使用watch之后就不再需要music参数了
      this.nowIndex = index;
    //   this.albumImg = music.musicImgSrc;
    //   this.albumTitle = music.title;
    //   this.albumAuthor = music.author;
    //   this.musicSrc = music.src;
    },

    //解析歌词
    parseLrc(text){
         let line = text.split('\n');   //按行分隔   转化为以换行结束的数组
         
         //分离时间  歌词
         line.forEach(elem=>{
          let time = elem.match(/\[\d{2}:\d{2}.\d{2}\]/);
          if(time !=null){
            let lrc = elem.split(time)[1];
            let timeReg = time[0].match(/(\d{2}):(\d{2}).(\d{2})/);

            //将时间转成秒
            let timeToSeconds = parseInt(timeReg[1]) * 60 + parseInt(timeReg[2]) + parseInt(timeReg[3])/1000;
            this.lrcList.push({
              time:timeToSeconds,
              lrc: lrc
            })
          }
         });
    },

    playMusic() {
      if(this.nowIndex != -1){
        this.$refs.musicAudio.play();
      }
      
    },
    pauseMusic() {
      this.$refs.musicAudio.pause();
    },
    prev() {
      this.nowIndex--;
      if (this.nowIndex == -1) {
        this.nowIndex = this.musicList.length - 1;
      }
    },
    next() {
      this.nowIndex++;
      if (this.nowIndex == this.musicList.length) {
        this.nowIndex = 0;
      }
    },
  },
   mounted(){
        let musicAudio = this.$refs.musicAudio;
          this.$refs.musicAudio.addEventListener('timeupdate',()=>{
             let currentTime = musicAudio.currentTime;
             this.lrcList.forEach((elem,index)=>{
               if(Math.ceil(elem.time) >= currentTime&&Math.floor(elem.time)<currentTime){
                 this.lrcIndex = index;
                 this.$refs.lrclist.scrollTop = this.lrcIndex * 15 ;
               }
             });
             
          });
    },
};
</script>

<style lang="scss" scoped>
.clearfix::after {
  content: "";
  display: block;
  clear: both;
}
.music-list {
  position: fixed;
  width: 100%;
  background-color: #2a2929;
  bottom: 2rem;
  height: 4rem;
  overflow-y: scroll;
  &-item {
    color: #dcdbdb;
    border-bottom: 0.02rem solid #343433;
    padding: 0.2rem;
    cursor: pointer;
    &.selected {
      color: #299557;
    }
  }
}

.album {
  display: flex;
  text-align: center;
  position: relative;
  &-mask {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    filter: blur(10px);
    z-index: -1;
  }
  &-img {
    flex-grow: 1;
    width: 0;
    margin-left: 0.2rem;
    img {
      width: 100%;
      height: 2rem;
    }
  }
  &-info {
    flex-grow: 2;
    width: 0;
    &-title {
      font-size: 0.5rem;
    }
    &-control {
      position: relative;
      &-icon {
        float: left;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        &-pre {
          display: block;
          width: 0.38rem;
          height: 0.4rem;
          background-image: url("../assets/img/后退.png");
          background-size: cover;
          float: left;
        }
        &-play {
          display: block;
          width: 0.38rem;
          height: 0.4rem;
          background-image: url("../assets/img/play.png");
          background-size: cover;
          float: left;
        }
        &-pause {
          display: block;
          width: 0.38rem;
          height: 0.4rem;
          background-image: url("../assets/img/暂停.png");
          background-size: cover;
          float: left;
        }
        &-next {
          display: block;
          width: 0.38rem;
          height: 0.4rem;
          background-image: url("../assets/img/前进.png");
          background-size: cover;
          float: left;
        }
      }
      &-menu {
        float: right;
        margin-right: 0.4rem;
        cursor: pointer;
      }
    }
  }
}
.slide {
  &-enter {
    transform: translateY(100%);
    &-to {
      transform: translateY(0);
    }
    &-active {
      transition: transform 1s ease;
    }
  }
  &-leave {
    transform: translateY(0);
    &-to {
      transform: translateY(100%);
    }
    &-active {
      transition: transform 1s ease;
    }
  }
}
.audio {
  background: #ccc;
  height: 1rem;
  position: fixed;
  bottom: 1rem;
  width: 100%;

  &-ctrl {
    width: 100%;
  }
}
.lrcList{
  text-align: center;
  position: fixed;
  bottom: 2rem;
  top: 3.3rem;
  height: 4rem;
  overflow-y: scroll;
  left: 0;
  right: 0;
  z-index: -1;
  padding-top: 4rem;
  .selected{
    color: #299557;
    font-size: 120%;
  }
}
</style>