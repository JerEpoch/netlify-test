import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import { faUser, faBuilding } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle, faCheckCircle } from '@fortawesome/free-regular-svg-icons'
import { faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons'

library.add(
  faUser,
  faBuilding,
  faUserCircle,
  faCheckCircle,
  faTwitch,
  faTwitter
);

Vue.component('font-awesome-icon', FontAwesomeIcon);