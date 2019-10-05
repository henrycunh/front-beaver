<template>
    <main>
        <Navbar />
        <div class='page'>
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
                                    {{ variable.value + variable.unit }}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import $ from 'axios'

import CalandragemIcon from '@/static/calandragem.svg'
import InspecaoIcon from '@/static/inspecao.svg'
import MisturaIcon from '@/static/mistura.svg'
import PesagemIcon from '@/static/pesagem.svg'
import PrensagemIcon from '@/static/prensagem.svg'
import SecagemIcon from '@/static/secagem.svg'

import ProgressBar from '@/components/ProgressBar'
import Navbar from '@/components/Navbar'

export default {

    components: {
        CalandragemIcon,
        InspecaoIcon,
        MisturaIcon,
        PesagemIcon,
        PrensagemIcon,
        SecagemIcon,
        ProgressBar,
        Navbar
    },

    computed: {
        mappedStages(){
            if (!this.current) return []
            return this.current.stages.map( stage => ({...stage, icon: this.iconMap[stage.name]}))
        },
        iconMap(){
            return {
                'pesagem': PesagemIcon,
                'mistura': MisturaIcon,
                'calandragem': CalandragemIcon,
                'prensagem': PrensagemIcon,
                'secagem': SecagemIcon,
                'inspecao': InspecaoIcon,
            }
        },
    },


    filters: {
        capitalize(val) {
            if(!val) return ''
            return val.slice(0, 1).toUpperCase() + val.slice(1)
        }
    },

    async asyncData({ params }){
        const { data: [current] } = await $.get('http://913df273.ngrok.io/lotes/' + params.id)
        return { current }
    }
}
</script>

<style lang="scss" scoped>
.page {
   padding: 20px 40px;
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
                    &:nth-child(odd) {
                        background: #f8f8f8;
                    }
                }
            }
        }


        &.--is-completed {
            opacity: 1;
        }
    }
}
</style>