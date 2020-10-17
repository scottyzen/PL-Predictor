<template>
  <div class="container p-12 mx-auto">
    <div>
      <pre
        v-if="data"
        class="w-full text-sm bg-gray-800 text-white p-4 rounded"
        >{{ data }}</pre
      >
    </div>
    <ul class="mt-8">
      <li v-for="user in data" :key="user.name">
        {{ user.email }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: false
    };
  },
  created() {
    // if (!this.$store.state.matchData) {
    this.$store.commit("getPLHistory");
    // }
    // if (!this.$store.state.getTodaysMatches) {
    this.$store.commit("getTodaysMatches");
    // }
  },
  mounted() {
    var ref = this.$fireDb.ref("/match/303801/predictions/user");
    ref.on("value", snapshot => {
      const dbValue = snapshot.val();
      const predictions = ref.child("predictions");
      this.data = dbValue;
    });

    // ref.push(62);
    // this.$fireDb.ref("match/" + 303801).set({
    //   homeTeam: {
    //     id: 62,
    //     name: "Everton FC"
    //   },
    //   awayTeam: {
    //     id: 64,
    //     name: "Liverpool FC"
    //   },
    //   predictions: {
    //     user: [50, 75, 80],
    //     computer: [60, 54, 62]
    //   }
    // });
  }
};
</script>
