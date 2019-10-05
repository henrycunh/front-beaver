<template>
    <ArrowUp class='up' v-if='value > .1'/>
    <ArrowDown class='down' v-else-if="value < -.1" />
    <div class='fine' v-else />
</template>

<script>

import ArrowUp from '@/static/arrow-up.svg'
import ArrowDown from '@/static/arrow-down.svg'

export default {

    props: {
        value: {
            type: Number
        }
    },

    components: {
        ArrowUp,
        ArrowDown,
    }    
}

</script>

<style lang="scss" scoped>
.down, .up {
    width: 12px;
    position: relative;
    margin-left: 1px;
    fill: red;

}

.fine {
    width: 6px;
    height: 6px;
    position: relative;
    top: -1px;
    margin-left: 3px;
    border-radius: 50%;
    background: greenyellow;
    display: inline-block;
}

.up {
    top: 2px;
}

.down {
    bottom: 1px;
}
</style>