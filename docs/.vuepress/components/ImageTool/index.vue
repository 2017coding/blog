<template>
    <div class="image-tool-comp">
        <image :src="src" :style="style" />
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: String,
            require: true
        },
        styleStr: {
            type: String,
            default: 'width: 100%; padding: 20px;'
        }
    }
}
</script>

<style lang="scss" scoped>

</style>