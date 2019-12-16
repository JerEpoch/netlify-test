<template>
  <div>
    <h3>Testing Card</h3>
    <!-- {{roundNum}}
    <b-card-group deck class="tourn-card">
      <b-card :header="round" align="center" class=" border border-info">
        <b-list-group v-for="(name, index) in matches" :key="index">
          <b-list-group-item class="task-list border border-dark">Round Number {{matches.roundNumber}} </b-list-group-item>
          <b-list-group-item class="task-list border border-dark">{{matches[index].round}} </b-list-group-item>
          <b-list-group-item class="task-list mb-3 border border-dark">{{matches[index].playerOne}}</b-list-group-item>
        </b-list-group>
      </b-card>
    </b-card-group> -->
  <!-- {{matches}} -->
  <!-- {{filterMatchArray}} -->
    <!-- <ul v-for="match in filterMatchArray" :key="match.index">
      <li>{{match.match.playerOne}}</li>
      <li>{{match.match.playerTwo}}</li>
    </ul> -->
    <b-card-group deck class="tourn-card">
      <b-card :header="roundTitle">
        <b-list-group v-for="(match, index) in filterMatchArray" :key="index">
          <b-list-group-item class="task-list border border-dark">{{match.match.playerOne}}</b-list-group-item>
          <b-list-group-item class="task-list border border-dark mb-3">{{match.match.playerTwo}}</b-list-group-item>
        </b-list-group>
      </b-card>
    </b-card-group>
  </div>

</template>


<script>

  export default {
    // props: ['players', 'matches', 'round', 'roundNum']
    props: ['matches', 'roundNumber'],
    computed: {
      filterMatchArray(){
        return this.matches.filter(round => round.roundNumber == this.roundNumber)
      },
      roundTitle() {
        return "Round " + this.roundNumber.toString()
      }
    }
  }
</script>
