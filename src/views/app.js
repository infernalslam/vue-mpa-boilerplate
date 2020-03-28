import Vue from 'vue'


Vue.component('example-component', require('./example/index.vue').default)

const app = new Vue({
    el: '#app',
})
