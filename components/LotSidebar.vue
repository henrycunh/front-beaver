<template>
    <aside>
        <div class="loading" v-if='!lots'>
            Carregando...
        </div>
        <div class="lot-list" v-else>
            <div
                :class="['lot', { '--is-selected': current ? lot._id === current._id : false }]"
                v-for='lot in availableLots'
                :key='lot._id'
                @click='handleLotClick(lot)'
            >
                <LotIcon class='icon' />
                <div class="content">
                    <div class="color-box" :style='lotColor(lot.color)'></div>
                    <div class="id">
                        #{{ lot._id }}
                    </div>
                    <div class="started info">
                        <label>
                            Inicio do Lote
                        </label>
                        {{ lot.started_at | timestamp }}
                    </div>
                    <div class="forecast">
                        <label>
                            Previsão de fim
                        </label>
                        {{ lot.forecast.toFixed(0) }}h
                    </div>

                    <div v-if='currentStage(lot)' class="current-stage info">
                        <label>
                            Estagio atual
                        </label>
                        <div class="name">
                            {{ currentStage(lot).name | capitalize }}
                        </div>
                    </div>

                    <div class="variables" v-if='currentStage(lot) && currentStage(lot).variables'>
                        <label>
                            Variáveis
                        </label>
                        <div class="variable" v-for='(variable, idx) in currentStage(lot).variables' :key='idx'>
                            <label>
                                {{ variable.name | capitalize }}
                            </label>
                            <div class="value">
                                {{ variable.value + variable.unit }} <ErrorMeter :value='variable.error'/>
                            </div>
                        </div>
                    </div>
                </div>
                <ProgressBar class='progress' :progress='lot.progress' />
            </div>
        </div>
    </aside>    
</template>

<script>
import { mapState, mapActions } from 'vuex'
import colorRef from '@/assets/color-ref'

import LotIcon from '@/static/package.svg'
import ProgressBar from '@/components/ProgressBar'
import ErrorMeter from '@/components/ErrorMeter'

export default {
    
    components: {
        LotIcon, ProgressBar, ErrorMeter
    },

    computed: {
        ...mapState('lot', ['lots', 'current']),
        availableLots(){
            return this.lots.filter( ({ stages }) => {
                for (const stage of stages){
                    if (!stage.completed) {
                        return true
                    }
                }
                return false
            })
        }
    },

    methods: {
        ...mapActions('lot', ['setCurrent']),
        handleLotClick(lot){
            this.setCurrent(lot)
        },
        lotColor(color){
            const __color = colorRef[color]
            return {
                '--color-start': __color,
                '--color-end': this.shadeColor(__color, -5)
            }
        },
        currentStage(lot){
            return lot.stages.filter( ({ completed }) => !completed )[0]
        },
        shadeColor(color, percent) {

            var R = parseInt(color.substring(1,3),16);
            var G = parseInt(color.substring(3,5),16);
            var B = parseInt(color.substring(5,7),16);

            R = parseInt(R * (100 + percent) / 100);
            G = parseInt(G * (100 + percent) / 100);
            B = parseInt(B * (100 + percent) / 100);

            R = (R<255)?R:255;  
            G = (G<255)?G:255;  
            B = (B<255)?B:255;  

            var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
            var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
            var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

            return "#"+RR+GG+BB;
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
    $primary: #2b5f6d;

    aside {
        margin-left: 20px;
        color: #333;
        .loading {
            padding: 40px;
        }
        .lot-list {
            padding: 40px;
            .lot {
                display: flex;
                align-items: center;
                box-shadow: 0 0 10px 0 #33333344;
                max-width: 350px;
                padding: 10px;
                margin: 45px 0;
                margin-top: 10px;
                transition: 300ms ease;
                background: white;
                position: relative;
                opacity: .5;
                cursor: pointer;
                
                .icon {
                    width: 40px;
                    margin: 0 20px;
                    fill: #444;
                }

                &:hover {
                    transform: scale(1.1);
                    opacity: .9;
                    .content {
                        .id, .started, .current-stage, .forecast {
                            color: #ffffff;
                        }
                        .color-box {
                            left: -5px;
                            right: 5px;
                            width: 280px;
                        }
                    }
                }

                .content {
                    padding: 10px;
                    border-radius: 5px;
                    width: 210px;
                    position: relative;
                    cursor: pointer;
                    transition: 300ms ease;

                    .id {
                        position: relative;
                        z-index: 1;
                        font-weight: bold;
                        color: #BBB;
                        font-size: 14px;
                        transition: 300ms ease;
                    }

                    .started {
                        position: relative;
                        z-index: 1;
                        & > label {
                            margin-top: 10px;
                            font-weight: bold;
                            display: block;
                        }
                        transition: 300ms ease;
                    }

                    .current-stage, .forecast {
                        margin-top: 20px;
                        position: relative;
                        z-index: 1;
                        & > label {
                            font-weight: bold;
                            display: block;
                        }
                        transition: 300ms ease;
                    }

                    .variables {
                        margin-top: 20px;
                        position: relative;
                        z-index: 1;
                        border: 1px solid #eee;
                        background: #ffffff;
                        padding: 10px;
                        border-radius: 5px;

                        & > label {
                            font-weight: bold;
                            display: block;
                            margin-bottom: 10px;
                        }

                        .variable {
                            display: grid;
                            padding: 5px 0;
                            grid-template-columns: 110px 1fr;
                            border-bottom: 1px solid #eeeeee;
                        }
                    }

                    .color-box {
                        position: absolute;
                        width: 30px;
                        top: -5px;
                        left: calc(280px - 30px - 10px);
                        cursor: pointer;
                        bottom: -5px;
                        background: linear-gradient(235deg, var(--color-start), var(--color-end));
                        border-radius: 5px;
                        transition: 300ms ease;
                        box-shadow: 0 0 5px 0 #33333355 inset;
                    }

                    
                }

                &.--is-selected {
                    box-shadow: 0 0 10px 0 #33333388;
                    transform: scale(1.1);
                    opacity: 1;
                }

                .progress {
                    position: absolute;
                    bottom: -10px;
                    left: 0px;
                } 
            }
        }
    }


</style>