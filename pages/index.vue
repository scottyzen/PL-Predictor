<template>
  <div class="container">
    <ul v-if="$store.state.todaysMatches" class=" mt-8">
      <li
        v-for="(match, i) in $store.state.todaysMatches.data.matches.slice(
          0,
          10
        )"
        :key="match.id"
        class="flex justify-between flex-wrap mb-5"
      >
        <span class="uppercase flex items-center text-gray-700 text-xs"
          ><img
            width="16"
            height="16"
            class="mr-1 object-contain mb-1"
            :src="`/${match.homeTeam.id}.png`"
            :alt="`${match.homeTeam.name} logo`"
          />{{ match.homeTeam.name }} </span
        ><span class="uppercase flex items-center text-gray-700 text-xs"
          >{{ match.awayTeam.name }}
          <img
            width="16"
            height="16"
            class="ml-1 object-contain mb-1"
            :src="`/${match.awayTeam.id}.png`"
            :alt="`${match.awayTeam.name} logo`"
        /></span>

        <div class=" w-full bar shadow-inner h-3 rounded relative">
          <span
            :style="{
              left: results[i] == null ? 50 + '%' : results[i] + '%',
              animationDelay: `${Math.floor(Math.random() * 400) + 100}ms`,
              animationDuration: `${Math.floor(Math.random() * 2500) + 1500}ms`
            }"
            :class="{ crunching: running }"
            class=" pointer h-6 bg-gray-600 shadow w-1 block rounded -mt-2 absolute"
          ></span>
          <span style="left: 25%" class="line"></span>
          <span style="left: 50%" class="line"></span>
          <span style="left: 75%" class="line"></span>
        </div>
      </li>
    </ul>

    <button
      class="rounded-md w-full mt-8 border-b border-gray-400 text-gray-700 bg-gray-300 p-2"
      @click="run"
    >
      {{ running ? "Running" : "Predict all matches" }}
    </button>
  </div>
</template>

<script>
const brain = require("../node_modules/brain.js/src/index");
export default {
  data() {
    return {
      running: false,
      results: []
    };
  },
  methods: {
    run() {
      this.running = true;
      const startTheTest = async () => {
        let history = this.$store.state.matchData.data.matches;
        let noDraws = history.filter(match => {
          return match.score.winner != "DRAW";
        });

        let upcomming = this.$store.state.todaysMatches;
        upcomming = upcomming.data.matches.slice(0, 10);

        const trainingData = noDraws.map(match => {
          return {
            input: [match.homeTeam.id, match.awayTeam.id],
            output: [this.convertResultToNumber(match.score.winner)]
          };
        });

        const removeHomeAdvantage = noDraws.map(match => {
          return {
            input: [match.awayTeam.id, match.homeTeam.id],
            output: [
              this.convertResultToNumber(match.score.winner) == 1 ? 0 : 1
            ]
          };
        });

        const trainingDataWithNoHomeAdvantage = [
          ...trainingData,
          ...removeHomeAdvantage
        ];

        const net = await new brain.NeuralNetwork({
          inputRange: 20,
          hiddenLayers: [20, 20, 20],
          learningRate: 0.1,
          decayRate: 0.1
        });
        net.train(trainingDataWithNoHomeAdvantage, { iterations: 5000 });

        for (const match of upcomming) {
          let result = await net.run([match.homeTeam.id, match.awayTeam.id]);
          console.log(
            `${match.homeTeam.name} vs. ${match.awayTeam.name} : ${result}`
          );
          this.results.push(result * 100);
          this.running = false;
        }
      };
      setTimeout(() => {
        startTheTest();
      }, 1);
    },
    convertResultToNumber(result) {
      if (result == "DRAW") {
        return 0.5;
      }
      return result == "AWAY_TEAM" ? 1 : 0;
    }
  }
};
</script>

<style>
.spinner {
  width: 20px;
  height: 20px;
  background: red;
  display: inline-block;
  animation: spin 600ms linear infinite forwards;
}
.bar {
  background: linear-gradient(to right, #ff5122, #f0da56, #2fcd21);
}
.pointer {
  transition: all 1000ms ease-in-out;
  z-index: 9;
}
.line {
  position: absolute;
  top: 0;
  bottom: 0;
  display: inline-block;
  width: 1px;
  background: rgba(0, 0, 0, 0.2);
}

@keyframes spin {
  100% {
    transform: rotate(359deg);
  }
}
</style>
