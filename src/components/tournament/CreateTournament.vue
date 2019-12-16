<template>
	<div >
    <b-container class="justify-content-center w-50">
      <h1>Create New Tournament</h1>
        <animated-fade-out>
          <div v-show="!showPreview">
            <b-form-input type="text" required placeholder="Tournament Name (required)" v-model="tournName" autofocus class="input-box-width mb-1"></b-form-input>
            <b-form-input type="text" required placeholder="Player's Name (required)" v-model="playerName" class="input-box-width"></b-form-input>
            <div>
              <b-button variant="primary" class="mt-2" @click="addPlayer">Add Player</b-button>
              <b-button class="mt-1" :disabled="!getCreateIsDisabled"
                @click="finalizeBracket"
                v-b-tooltip.hover title="Be sure the player's information is correct."
              >Create The Bracket</b-button>
              <!-- <b-form-checkbox class="ml-3" 
                v-model="acceptBracket"
                value="true"
                v-b-tooltip.hover title="Click to accept and click the button that appears."
              >Check to finalize the bracket.</b-form-checkbox> -->
            </div>
          </div>
        </animated-fade-out>

        <!-- <div>
          <b-button type="submit" class="mt-1" v-if="acceptBracket"
            v-b-tooltip.hover title="Be sure the information is correct."
          >Create Tournament</b-button>
        </div> -->
      <!-- @click="show = !show" -->
      <transition
        name="bracket-preview-transition"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOutUp"
      >
      <div v-show="!showPreview">
        <b-card-group deck class="tourn-card mt-5" v-if="getHasData" >
          <b-card :header="tournName" align="center">
            <b-list-group>
              <b-list-group-item class="task-list" v-for="(name, index) in playersNames" :name="name" :key="name">{{playersNames[index]}}
                <b-button class="float-right" @click="deletePlayer(index)" v-b-tooltip.hover title="Delete Player">
                  <icon name="ban"></icon>
                </b-button>
              </b-list-group-item>
            </b-list-group>
          </b-card>
        </b-card-group>
      </div>
      </transition>


      <transition
        name="random-bracket-transition"
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeOutUp"
      >
      <div v-show="showPreview" id="rand-bracket">
        <app-preview :tournName=tournName :allNames=versusBracket></app-preview>
      </div>
      </transition>   
      <!-- <button @click="randBracketTwo">Click</button> -->
    </b-container>
  
	</div>
</template>


<script>
import PreviewTourn from './PreviewTourn.vue'
// import store from '../../store/store'
import { mapGetters } from 'vuex';

  export default {
    components: {
      appPreview: PreviewTourn
    },
    data() {
      return {
        tournName: 'Test Name',
        playersNames: ['bob', 'jane', 'person a', 'person b', 'person c', 'person d', 'player e', 'player f'],
        versusBracket: [],
        playerName: '',
        acceptBracket: false,
        showPreview: false,
        show: true
      }

    },
    methods: {
      onSubmit() {
        // add this
      },
      addPlayer() {
        if(this.playerName) {
          this.playersNames.push(this.playerName)
          this.playerName = ''
        }
      },
      deletePlayer(index) {
        this.playersNames.splice(index,1)
      },
      finalizeBracket() {
        this.randBracket()
        this.showPreview = true
      },
      randBracket() {
        this.showPreview = false
        // var tempArr = this.playersNames
        var tempArr = Array.from(this.playersNames)
        for(let i = tempArr.length - 1; i >=0; i--){
          let randIndex = Math.floor(Math.random() * (i+1))
          let plyrAtIndex = tempArr[randIndex]
          tempArr[randIndex] = tempArr[i]
          tempArr[i] = plyrAtIndex
        }
        this.createVsBracket(tempArr)
        //this.randomizedNames = tempArr
        // console.log("original: " + this.playersNames)
        // console.log(this.randomizedNames)
        //this.showPreview = true
      },
      createVsBracket(rArray){
        for(let i = 0; i <= (rArray.length - 1); i+=2) {
          this.versusBracket.push({
            playerOne: rArray[i],
            playerTwo: rArray[i+1],
          })
        }
        this.showPreview = true
        //console.log(this.versusBracket)
      },
      // test(event) {
      //   if(event.which === 13){
      //     console.log("testing")
      //   }
        
      // }
    },
    computed: {
      getHasData: function() {
        return this.playersNames.length > 0
      },
      getCreateIsDisabled: function() {
        return this.playersNames.length > 1
      },
      ...mapGetters({
        username: 'user'
      })
    }
  }
</script>


<style>
  .task-list {
    width: 400px;
  }

  .tourn-card {
    width: 500px;
  }

  .task-list:hover {
    background-color: #eff6f7
  }

  .input-box-width {
    width: 600px;
  }



  #rand-bracket.animated {
    animation-delay: 1s;
  }
</style>