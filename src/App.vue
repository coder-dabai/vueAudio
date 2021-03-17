<template>
  <div id="app">
    <CommonHeader :selectMenu='selectMenu'></CommonHeader>
    <router-view class="content"  @switchTab='switchTab'/>
    <CommonFooter :bgColor='footerBgColor'  :menuList='menuList'></CommonFooter>
  </div>
</template>

<script>

import CommonHeader from '@/components/CommonHeader.vue';
import CommonFooter from '@/components/CommonFooter.vue';

export default {
  components:{
    CommonHeader,
    CommonFooter
  },
  methods:{
      switchTab(menuName){
        this.menuList.forEach(
          menu=>{
            if(menu.name === menuName){
              this.selectMenu = menu;
              this.footerBgColor = menu.bgColor;
            }
          }
        )
      }
  },
  data(){
    return {
      menuList: [
        {
          title: '电影',
          bgColor: '#e54847',
          name: 'movie',
          path: '/movie'
        },{
          title: '音乐',
          bgColor: '#ADFEDC',
          name: 'music',
          path: '/music'
        }
        // ,{
        //   title: '书籍',
        //   bgColor: '#F75000',
        //   name: 'book',
        //   path: '/book'
        // },{
        //   title: '图片',
        //   bgColor: '#DDDDFF',
        //   name: 'photo',
        //   path: '/photo'
        // }
      ],
      selectMenu: {},    //当前选中菜单
      footerBgColor:''  //footer背景颜色
    }
  }
}


</script>

<style lang="scss">
.content{
  margin: 1rem 0;
}
</style>
