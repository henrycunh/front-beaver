<template>
    <div :style='barStyle' class="progress-bar"></div>
</template>

<script>
export default {
    
    props: {
        progress: {
            type: Number,
            required: true,
        }
    },

    computed: {
        barStyle(){
            return {
                width: (this.progress * 100) + '%'
            }
        }
    }
    
}
</script>

<style lang="scss" scoped>
.progress-bar {
    height: 5px;
    border-radius: 5px;
    background: #0828db;
    transition: 300ms ease;
}
</style>