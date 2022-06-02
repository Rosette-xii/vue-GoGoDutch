import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar'
import VueSweetalert2 from 'vue-sweetalert2';
import AOS from "aos";
import "aos/dist/aos.css";

/* fontawesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faArrowLeftLong, faArrowRightLong, faPlus, faMinus, faXmark, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret, faArrowLeftLong, faArrowRightLong, faPlus, faMinus, faXmark, faTrash, faPen)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import 'sweetalert2/dist/sweetalert2.min.css';

/*v-calendar*/
Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});

Vue.use(VueSweetalert2);
Vue.prototype.$bus = new Vue();
Vue.config.productionTip = false

new Vue({
  created() {
    AOS.init({})
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
