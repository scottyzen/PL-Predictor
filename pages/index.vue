<template>
  <div class="container">
    <div class="flex justify-between w-full px-4 mt-8 mb-2 text-sm">
      <span>Home</span>
      <span>Away</span>
    </div>
    <ul v-if="$store.state.todaysMatchesData">
      <li
        v-for="match in $store.state.todaysMatchesData.matches.slice(0, 10)"
        :key="match.id"
        ref="matches"
        class="flex flex-wrap justify-between px-4 py-3 mb-2 bg-white rounded-sm shadow-xs"
      >
        <span class="flex items-center text-xs text-gray-700 uppercase">
          <img
            width="16"
            height="16"
            class="object-contain mr-1"
            :src="`/${match.homeTeam.id}.png`"
            :alt="`${match.homeTeam.name} logo`"
          />
          {{ match.homeTeam.name }}
        </span>
        <span class="flex items-center text-xs text-gray-700 uppercase">
          {{ match.awayTeam.name }}
          <img
            width="16"
            height="16"
            class="object-contain ml-1"
            :src="`/${match.awayTeam.id}.png`"
            :alt="`${match.awayTeam.name} logo`"
          />
        </span>

        <div class="relative w-full h-2 mt-1 rounded-full shadow-inner bar">
          <span
            :style="{
              left: results == null ? 50 + '%' : results[match.id] + '%',
              animationDelay: `${Math.floor(Math.random() * 400) + 100}ms`,
              animationDuration: `${Math.floor(Math.random() * 2500) + 1500}ms`
            }"
            :class="{ crunching: running }"
            class="absolute block w-1 h-6 -mt-2 bg-gray-600 rounded shadow pointer"
          ></span>
          <span style="left: 25%" class="line"></span>
          <span style="left: 50%" class="line"></span>
          <span style="left: 75%" class="line"></span>
        </div>
      </li>
    </ul>
    <div v-else class="flex flex-col items-center justify-center p-12">
      <img src="/icon.png" alt="Premier League Logo" />
      <span>Getting Fixtures</span>
    </div>

    <button
      class="w-full p-2 mt-8 text-gray-700 bg-gray-300 border-b border-gray-400 rounded-md"
      @click="run"
    >{{ running ? "Running" : "Predict all matches" }}</button>
  </div>
</template>

<script>
var brain = require('brain.js');
export default {
  data() {
    return {
      running: false,
      results: null,
      db: null,
      next10IDs: null,
      resultData: {}
    };
  },
  mounted() {
    this.getAllData();
  },
  methods: {
    getAllData() {
      // this.db = await this.$fireDb.ref("/match/303801/predictions/computer");
    },
    run() {
      this.running = true;
      const startTheTest = async () => {
        let history = this.$store.state.matchData.data.matches;
        let noDraws = history.filter(match => {
          return match.score.winner != "DRAW";
        });

        let upcomming = this.$store.state.todaysMatchesData;
        upcomming = upcomming.matches.slice(0, 10);

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
        net.train(trainingDataWithNoHomeAdvantage, { iterations: 250 });
        this.results = {};

        const allresults = await upcomming.map(match => {
          let result = net.run([match.homeTeam.id, match.awayTeam.id]);
          this.results[match.id] = result * 100;
          this.running = false;
          return result;
        });
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
body {
  background: rgb(243, 243, 243);
}
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
  margin-left: -1px;
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
