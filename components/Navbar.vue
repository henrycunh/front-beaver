<template>
    <div>
        <nav>
            <a href="/" class='logo'>Beaver</a>
            <a href="/historico" class="historico" v-if='showHistory'>Historico</a>
            <div class="alerta" @click='toggleAlertas'>Alertas</div>
        </nav>
        <div class="modal" v-if='modalVisible'>
            <h2>Alertas</h2>
            <div class="alertas">
                <div class="alerta" v-for="({variable, lot}, idx) in flawedLots" :key='idx'>
                    <div class="variavel">
                        <div class="name">
                            {{ variable.name | capitalize }}
                        </div>
                        <div class="value">
                            {{ variable.value + variable.unit }} <ErrorMeter :value='variable.error'/>
                        </div>
                    </div>
                    <div class="lot" @click='handleLotClick(lot._id)'>
                        <div class="id">
                            {{ lot._id }}
                        </div>
                        <div class="color">
                            <div class="color-block" :style='getColor(lot.color)'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="dimmer" v-if='modalVisible' @click='toggleAlertas'/>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import ErrorMeter from '@/components/ErrorMeter'
import colorRef from '@/assets/color-ref'

export default {
    props: {
        showHistory: {
            type: Boolean,
            default: true
        }
    },
    components: {
        ErrorMeter
    },

    data: () => ({
        modalVisible: false,
    }),

    computed: {
        ...mapGetters('lot', ['flawedLots'])
    },
    methods: {
        toggleAlertas(){
            this.modalVisible = !this.modalVisible
        },
        getColor(color){
            return { background: colorRef[color] }
        },

        handleLotClick(id){
            this.$router.push('/lot/' + id)
        }
    },

    filters: {
        capitalize(val) {
            if(!val) return ''
            return val.slice(0, 1).toUpperCase() + val.slice(1)
        }
    }
}
</script>


<style lang="scss" scoped>
    nav {
        display: flex;
        padding: 20px;
        align-items: center;
        * {
            text-decoration: none;
            color: #666;
        }
        .logo {
            margin-left: 20px;
            font-size: 24pt;
            font-weight: bold;
        }
        .historico {
            font-size: 20pt;
            margin-left: auto;
        }
        .alerta {
            font-size: 20pt;
            margin-left: 40px;
            margin-right: 40px;
            cursor: pointer;
        }
    }

    .modal {
        position: absolute;
        width: 600px;
        height: 600px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background: #fff;
        border-radius: 10px;
        padding: 20px;
        z-index: 3;
        overflow-y: scroll;

        .alerta {
            display: grid;
            grid-template-columns: 2fr 1fr;
            align-items: center;
            border-bottom: 1px solid #eee;
            .variavel {
                display: flex;
                .name {
                    font-weight: bold;
                    margin-right: 20px;
                }
            }

            .lot {
                display: flex;
                cursor: pointer;
                padding: 10px;
                transition: 300ms ease;
                &:hover {
                    background: #eeeeee;
                }
                .color {
                    margin-left: 20px;
                    .color-block {
                        display: block;
                        width: 25px;
                        height: 25px;
                        border-radius: 5px;
                    }
                }
            }
        }

    }


    .dimmer {
        position: absolute;
        background: #000000AA;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 2;
    }
</style>