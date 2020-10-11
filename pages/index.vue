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
  mounted() {
    var ref = this.$fireDb.ref("users");
    ref.on("value", snapshot => {
      const dbValue = snapshot.val();
      this.data = dbValue;
    });

    // this.$fireDb.ref("users/" + 22).set({
    //   username: "Ciara",
    //   email: "kiearh@hotmail.com"
    // });
  }
};
</script>
