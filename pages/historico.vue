<template>
    <div>
        <Navbar :show-history='false' />
        <main>
            <h3>Histórico</h3>
            <input type="text" v-model='query' placeholder="procure por lotes...">
            <div class="table">
                <div class="headers">
                    <div class="column">ID</div>
                    <div class="column">Cor</div>
                    <div class="column">Data de Inicio</div>
                </div>
                <div class="lot" v-for='lot in filteredLots' @click='handleLotClick(lot._id)' :key='lot._id'>
                    <div class="column">
                        {{ lot._id }}
                    </div>
                    <div class="column">
                        <div class="color-block" :style='getColor(lot.color)'></div>
                    </div>
                    <div class="column">
                        {{ lot.started_at | timestamp }}
                    </div>
                </div>
            </div>
            
        </main>
    </div>
</template>

<script>
import Navbar from '@/components/Navbar'
import $ from 'axios'
import { mapState } from 'vuex'
import colorRef from '@/assets/color-ref'

export default {
    components: {
        Navbar
    },

    data: () => ({
        query: ''
    }),

    computed: {
        ...mapState('lot', ['lots']),
        availableLots(){
            return this.lots.filter( lot => {
                for (const stage of lot.stages){
                    if (!stage.completed) return false
                }
                return true
            })
        },
        filteredLots(){
            if(!this.query) return this.availableLots
            return this.availableLots.filter( lot => JSON.stringify(lot).match(new RegExp( this.query, "i")))
        }
    },

    methods: {
        getColor(color){
            return { background: colorRef[color] }
        },
        handleLotClick(id){
            this.$router.push('/lot/' + id)
        }
    },

    async fetch({ store }){
        const { data: lots } = await $.get('http://913df273.ngrok.io/lotes') 
        store.dispatch('lot/setLots', lots)
    }
}

</script>

<style lang="scss" scoped>
main {
    width: 900px;
    margin: 30px auto;
    background: #fff;
    min-height: 200px;
    box-shadow:  0 0 10px 0 #33333355;
    border-radius: 5px;
    padding: 20px 30px;

    h3 {
        margin: 0;
        color: #555;
    }

    & > input {
        margin: 20px 0;
        margin-top: 40px;
        width: 100%;
        display: block;
        box-sizing: border-box;
        border: 0;
        padding: 10px 15px;
        border-radius: 10px;
        box-shadow: 0 0 10px 0 #33333355;
        font-size: 16pt;
    }

    .table {
        .headers {
            display: grid;
            padding: 10px;
            grid-template-columns: 260px 100px 140px;
            border-bottom: 2px solid #cccccc;
            .column {
                font-weight: bold;
            }
        }
        .lot {
            display: grid;
            align-items: center;
            padding: 10px;
            grid-template-columns: 260px 100px 240px;
            cursor: pointer;
            transition: 300ms ease;


            .column {
                .color-block {
                    display: block;
                    width: 25px;
                    height: 25px;
                    border-radius: 5px;
                }
            }

            &:hover {
                background: #eeeeee;
            }
        }
    }
}
</style>