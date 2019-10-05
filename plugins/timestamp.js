import Vue from 'vue'

Vue.filter('timestamp', timestampToDate)

function timestampToDate(timestamp){
    const date = new Date(timestamp)
    const $ = [date.getHours(), date.getMinutes(), date.getDay(), date.getMonth(), date.getFullYear()].map( n => (n + '').padStart(2, '0'))
    return `${$[0]}:${$[1]} ${$[2]}/${$[3]}/${$[4]}`
}