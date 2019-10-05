<template>
    <section v-if='currentStage'>
        <h1>Agora</h1>
        <div class="current-stage" v-if="currentStage">
            <component :is='iconMap[currentStage.name]' class='icon'/>
            <div class="content">
                <div class="name">
                    {{ currentStage.name | capitalize }}
                </div>
                <div class="progress">
                    <div class="label">
                        Em {{ current.forecast.toFixed(0) }}h
                    </div>
                    <ProgressBar :progress='current.progress'/>
                </div>
                <!-- <div class="variables" v-if='currentStage.completed'>
                    <div class="variable" v-for="(variable, idx) in currentStage.variables" :key='idx'>
                        <div class='name'>{{ variable.name | capitalize }}</div>
                        <div class="value">
                            {{ variable.value + variable.unit }}
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
        <h1>Estágios</h1>
        <div class="stages" v-if='current'>
            <div :class='["stage", { "--is-completed": stage.completed }]' v-for="(stage, idx) in mappedStages" :key='idx'>
                <component :is='stage.icon' class='icon'/>
                <div class="content">
                    <div class='name'>{{ stage.name | capitalize }}</div>
                    <div class="variables" v-if='stage.completed'>
                        <div class="variable" v-for="(variable, idx) in stage.variables" :key='idx'>
                            <div class='name'>{{ variable.name | capitalize }}</div>
                            <div class="value">
                                {{ variable.value + variable.unit }} <ErrorMeter :value='variable.error' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section v-else>
        Selecione um lote.
    </section>
</template>

<script>
import $ from 'axios'
import { mapState } from 'vuex'

import CalandragemIcon from '@/static/calandragem.svg'
import InspecaoIcon from '@/static/inspecao.svg'
import MisturaIcon from '@/static/mistura.svg'
import PesagemIcon from '@/static/pesagem.svg'
import PrensagemIcon from '@/static/prensagem.svg'
import SecagemIcon from '@/static/secagem.svg'

import ErrorMeter from '@/components/ErrorMeter'
import ProgressBar from '@/components/ProgressBar'

export default {

    components: {
        CalandragemIcon,
        InspecaoIcon,
        MisturaIcon,
        PesagemIcon,
        PrensagemIcon,
        SecagemIcon,
        ProgressBar,
        ErrorMeter
    },
    
    data: () => ({
        ws: null
    }),

    async asyncData(){
        console.log(await $.get('http://913df273.ngrok.io/lotes'))
    },

    computed: {
        ...mapState('lot', ['current']),
        mappedStages(){
            return this.current.stages.map( stage => ({...stage, icon: this.iconMap[stage.name]}))
        },
        iconMap(){
            return {
                'pesagem': PesagemIcon,
                'mistura': MisturaIcon,
                'calandragem': CalandragemIcon,
                'prensagem': PrensagemIcon,
                'secagem': SecagemIcon,
                'inspeção': InspecaoIcon,
            }
        },
        currentStage(){
            if (!this.current) return null
            const left = this.current.stages.filter( ({ completed }) => !completed )
            return left.length ? left[0] : null
        }
    },

    filters: {
        capitalize(val) {
            if(!val) return ''
            return val.slice(0, 1).toUpperCase() + val.slice(1)
        }
    },

    async mounted(){
        this.$options.sockets.onmessage = (data) => {
            console.log(data)
            this.$store.dispatch('lot/updateLot', JSON.parse(data.data))
            if (this.$store.state.lot.current._id === JSON.parse(data.data)._id){
                this.$store.dispatch('lot/setCurrent', JSON.parse(data.data))
            }
        }
        const { data: lots } = await $.get('http://913df273.ngrok.io/lotes') 
        this.$store.dispatch('lot/setLots', lots)
    },

    destroyed(){
        delete this.$options.sockets.onmessage
    },

}

</script>

<style lang="scss" scoped>
.current-stage {
    display: grid;
    grid-template-columns: 60px 1fr;
    padding: 20px;
    background: #ffffff;
    box-shadow: 0 0 10px 0 #33333344;
    margin-right: 80px;
    .icon {
        width: 40px;
    }
    .content {
        .name {
            font-weight: bold;
            font-size: 16pt;
        }

        .progress {
            .label {
                text-align: center;
                color: #BBB;
                text-transform: uppercase;
                margin-bottom: 5px;
            }
        }
    }
}

.stages {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    grid-gap: 30px;
    padding-right: 80px;
    .stage {
        background: #ffffff;
        box-shadow: 0 0 10px 0 #33333344;
        padding: 20px;
        opacity: .3;
        display: grid;
        grid-template-columns: 60px 1fr;
        .icon {
            width: 40px;
        }
        .content {
            & > .name {
                font-weight: bold;
                font-size: 16pt;
                margin-bottom: 20px;
            }

            .variables {
                .variable {
                    margin-bottom: 10px;
                    .name {
                        font-weight: bold;
                    }
                    border-bottom: 1px solid #eeeeee;
                }
            }
        }


        &.--is-completed {
            opacity: 1;
        }
    }
}
</style>