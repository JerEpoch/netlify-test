<template>
  <div>
    <b-container class="justify-content-center">
      <h1>{{tournament.tournament_title }}</h1>
      <!-- <ul class="list-unstyled">
        <li v-for="(p, index) in tournament.players" :key="index"> 
          {{ p.playerName }}
        </li>
      </ul> -->
      <h3>Matches</h3>
      <hr>
      <!-- need to loop through rounds eventually here -->
      <!-- <app-match-card :matches="tournament.match" :round="round" ></app-match-card> -->
      <app-match-card v-for="round in roundNum" :key="round"  :roundNumber="round" :matches="tournament.match" :tournamentCompleted="tournamentCompleted"></app-match-card>
      

      <!-- <app-test-card v-for="round in roundNum" roundFilter=round :key="round" :matches="matchArr" :roundNumber="round"></app-test-card> -->
      <!-- <app-match-card :matches="tournament.match" :round="round"></app-match-card> -->
    </b-container>
  </div>
</template>


<script>
  import axios from 'axios'
  import MatchCard from './MatchCard.vue'
  // import TestCard from './testCard.vue'
  // import {mapGetters} from 'vuex'

  export default {
    components: {
      appMatchCard: MatchCard
      // appTestCard: TestCard
    },
    data() {
      return {
        tournament: [],
        match: [],
        wins: [],
        matchArr: [],
        maxRound: '',
        roundNum: [],
        round: '',
        roundFilter: '',
        tournamentCompleted: ''
      }
    },
    created() {
      let id=this.$route.params.id
      var vm = this
      axios.get(`/bracket-api/tournament/${id}`)
      .then(res => {
        // console.log("RETURN DATA FOR TOURNAMENT")
        // console.log(res.data.tournament)
        // console.log("================================")
        vm.tournament = res.data.tournament
        vm.match = res.data.tournament.match
        vm.tournamentCompleted = res.data.tournament.tournamentCompleted
        //vm.$store.dispatch('setWinnersArr', vm.match.length)
        //vm.roundNum = vm.tournament.match[0].round
        //console.log(vm.match.length)
        
        //this.getRoundNumber()
        this.setMatchArr()
        //this.setWinnersObj()
      })
      .catch(error => console.log(error)) // eslint-disable-line
    },
    mounted() {
      
    },
    methods: {
      getRoundNumber() {
        return this.round = "Round " + this.tournament.match[0].round.toString()
      },
      setWinnersObj() {
        console.log("test obj") // eslint-disable-line
        // var vm = this
        for(let i=0; i < this.tournament.players.length; i++) {
          console.log(this.tournament.players[i].playerName) // eslint-disable-line
          //this.winners.push({name: this.tournament.players[i].playerName, status: false})
          //vm.winners[i].name = this.tournament.players[i].playerName
        }

        console.log("WINNERS " + this.winners[0].status) // eslint-disable-line
      },
      setMatchArr() {
        //console.log(this.match)
        for(let i =0; i <= this.match.length - 1; i++) {
          var round = this.match[i].round
          if(this.match[i].round == round) {
            this.matchArr.push({roundNumber: round, match:this.match[i]})
          }
          this.maxRound = round
        }
        for(let i = 1; i <= this.maxRound; i++) {
          this.roundNum.push(i)
        }
        // console.log(this.roundNum)
        // console.log("NEW ARRAY")
        // console.log(this.matchArr)
        //console.log(this.maxRound)
      }
    }
    // computed: {
    //   filterArray() {
    //     //return this.matchArr.filter(round => round.roundNumber == this.roundFilter)
    //     //return this.tournament.match.filter(round => round.roundNumber == this.roundFilter)
    //     //console.log(tournament.match)
    //   }
    // }
  }
</script>

<style>
  .tourn-card {
    width: 500px;
  }
  .task-list {
    width: 400px;
  }
</style>