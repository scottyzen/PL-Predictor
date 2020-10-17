<template>
  <div>
    <Nuxt />
  </div>
</template>
<script>
export default {
  beforeMount() {
    if (!this.$store.state.matchData) {
      this.$store.commit("getPLHistory");
    }
  }
};
</script>
