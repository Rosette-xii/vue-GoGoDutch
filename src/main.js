import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar'
import VueSweetalert2 from 'vue-sweetalert2';
import AOS from "aos";
import "aos/dist/aos.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import specific icons */
import { faUserSecret, faArrowLeftLong, faArrowRightLong, faPlus, faMinus, faXmark, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* add icons to the library */
library.add(faUserSecret, faArrowLeftLong, faArrowRightLong, faPlus, faMinus, faXmark, faTrash, faPen)

/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
/*v-calendar*/
Vue.use(VCalendar, {
  componentPrefix: 'vc',  // Use <vc-calendar /> instead of <v-calendar />
});
// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

new Vue({
  created() {
    AOS.init({})
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
