<template>
    <h1>book</h1>
</template>

<script>
export default {
    created(){               //页面重新渲染钩子函数
        this.$emit('switchTab','book');
    }
}
</script>

<style lang="scss" scoped>

</style>