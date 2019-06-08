import Vue from 'vue';
import App from './App.vue';

import Record from './Record.vue';
Vue.component('record', Record);

//import Performance from './Performance.vue';
//Vue.component('performance', Performance);

new Vue({
  el: '#app',
  render: h => h(App)
});
