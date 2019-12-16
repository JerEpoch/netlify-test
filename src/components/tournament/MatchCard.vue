<template>
	<div >
		<b-container class="justify-content-center">
			
      <!-- {{matches}} -->
      <div>
        <!-- <b-card-group deck class="tourn-card">
          <b-card :header="round" align="center" class=" border border-info">
            <b-list-group v-for="(name, index) in matches" :key="index">

              <b-list-group-item class="task-list border border-dark">{{matches[index].playerOne}} 

    
                </b-list-group-item>
              
              <b-list-group-item class="task-list mb-3 border border-dark">{{matches[index].playerTwo}}
 
              </b-list-group-item>

            </b-list-group>
          </b-card>
        </b-card-group>-->


    <!-- NOTE
    check for second player on last round in the match in tourament.vue
    MAYBE ADD TITLE IN MODEL
     -->
        
        <b-card-group deck class="tourn-card mb-2">
          <b-card :header="title">
          <b-list-group v-for="(match, index) in filterMatchArray" :key="index"> 
            <div v-if="match.playerTwo">
              <b-list-group-item class="task-list border border-dark">{{match.playerOne}}</b-list-group-item>
              <b-list-group-item class="task-list border border-dark mb-3" >{{match.playerTwo}}</b-list-group-item>
            </div>
            <div v-else>
              <b-list-group-item class="task-list border border-dark">{{match.playerOne}}</b-list-group-item>
            </div>
          </b-list-group>
        </b-card>
      </b-card-group>

        <b-btn class="mt-2" v-b-modal.adminRound v-if="!isCompleted && !checkTournamentDone && isTournamentAdmin">Select Winners</b-btn>
        <b-btn class="mt-2" v-if="checkWinners && !isCompleted" @click="submitMatch">Submit Match Winners</b-btn> 
      </div>

      
      <!-- isTournamentAdmin needs to be done on backend still -->
      <div>
        <b-modal id="adminRound" v-if="!isCompleted && !checkTournamentDone && isTournamentAdmin">
          <app-tourn-radio 
            v-for="(name, index) in filterMatchArray" :key="index" :playerOne=matches[index].playerOne :playerTwo=matches[index].playerTwo v-on:playerSelected="addPlayer($event, index)">
            </app-tourn-radio>
        </b-modal>
      </div>

  

      <div v-if="!isCompleted && !checkTournamentDone && isTournamentAdmin">
        <h4>Winners:</h4>
        <ul class="list-unstyled">
          <li v-for="(p, index) in winners" :key="index">
          {{index + 1}}: {{ p}}
          </li>
        </ul>
      </div>
  
		</b-container>
	</div>
</template>


<script>
  import TournamentRadio from './TournamentRadio.vue'
  import {mapGetters} from 'vuex'
  // import {setUser} from '@/utils'
  

  export default {
    components: {
      appTournRadio: TournamentRadio
    },
    props: ['players', 'matches', 'round', 'roundNum', 'roundNumber', 'tournamentCompleted'],
    data() {
      return {
        winnerName: '',
        showSubWins: false,
        isCompleted: false,
        title: '',
        isTournAdmin: false
      }
    },
    methods: {
      // setWinner(player) {
      //   //console.log(this.$route.params.id)
      //   //console.log(player + " IS WINNER")
      //   //this.winners.push(player)
      //   //console.log(this.winners)
      // },
      addPlayer(player, index) {
        //winners.find(p => p===player)
        var data = {
          player: player,
          index: index
        }
        this.$store.dispatch('addPlayer', data)
      },
      submitMatch() {
        //console.log(this.roundNumber)
        var data = {
          roundNumber: this.roundNumber + 1,
          tournamentId: this.$route.params.id
        }
        //console.log(data)
        this.$store.dispatch('submitMatchWinners',  data)

      }
    },

    mounted() {
      this.$store.dispatch('isTournamentAdmin', {id: parseInt(this.$route.params.id)})
    },

    computed: {
      ...mapGetters({
        winners: 'winners',
        checkWinners: 'winnersLength'
      }),
      isTournamentAdmin() {
        //return this.$store.dispatch('isTournamentAdmin', {id: parseInt(this.$route.params.id)})
        //return this.$store.dispatch('isTournamentAdmin', {id: parseInt(this.$route.params.id)})
        return this.$store.getters.userTournAdmin
      },
      roundTitle() {
        // console.log(this.tournamentCompleted) 
        // console.log("inside round title comp")
        // console.log(this.matches[0].roundTitle)
        // console.log("=======")
        return "Round " + this.roundNumber.toString()
      },
      filterMatchArray(){
        //console.log(this.matches)
        var tempArr = []
        tempArr = this.matches.filter(round => round.round == this.roundNumber)
        //console.log(tempArr)
        this.isCompleted = tempArr[0].isCompleted // eslint-disable-line
        this.$store.dispatch('setWinnersArr', tempArr.length)
        //this.tlengthArr = tempArr
        this.title = tempArr[0].roundTitle // eslint-disable-line
        
        return tempArr
        //return this.matches.filter(round => round.round == this.roundNumber)
        //console.log(this.round.roundNumber)
        //console.log(this.matches.filter(round => round.round == this.roundNumber))
      },
      checkTournamentDone() {
        return this.tournamentCompleted
      }
    }
  }
</script>

