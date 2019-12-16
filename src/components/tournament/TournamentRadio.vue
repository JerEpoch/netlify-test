<template>
  <div>

    <b-form-group>
      <b-form-radio-group v-model="selected">
        <b-form-radio :value=playerOne>{{playerOne}}</b-form-radio>
        <b-form-radio :value=playerTwo>{{playerTwo}}</b-form-radio>
      </b-form-radio-group>
    </b-form-group>


  </div>
</template>


<script>
  export default {
    props: ['playerOne', 'playerTwo'],
    data() {
      return {
        selected: ''
      }
    },
    watch: {
      selected: function() {
        //console.log(this.selected)
        this.$emit('playerSelected', this.selected)
      }
    }
  }
</script>