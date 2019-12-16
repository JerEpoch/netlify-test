import Vue from 'vue'

Vue.filter('truncateNewsPost',val => {
  if (val.length > 200) {
    val = val.substring(0,197) + '...'
  }
  return val
})