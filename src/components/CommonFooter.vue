<template>
        <ul class="footer" :style="{background: bgColor}">
            <li  class="footer-menu" v-for="(menu,index) in menuList" :key=index>
                <router-link :to="menu.path">{{menu.title}}</router-link>
            </li>
        </ul>
</template>

<script>
export default {
    props: ['menuList','bgColor'],
    data() {
        return {
            //bgColor:''
        }
    },
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>
.footer{
    display: flex;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    background-color: #e54847;
    &-menu{
        flex-grow: 1;
        text-align: center;
        
        a{
            color: #fff;

            &.router-link-active{
            color: #ccc;
        }
        }
        
    }
}
</style>