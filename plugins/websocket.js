import VWS from 'vue-native-websocket'
import Vue from 'vue'

const wsAddr = process.env.WS_ADDR || 'ws://913df273.ngrok.io/ws'

export default ({ store }, inject) => {
    Vue.use(VWS, wsAddr)
}