<template>
  <div class="container mx-auto">
    <form
      class="max-w-md flex flex-col bg-orange-300 p-8 rounded mt-12 border-b border-orange-500"
      action=""
      method="post"
    >
      <label class="text-sm uppercase text-orange-800  mb-1" for="name"
        >Name</label
      >
      <input
        class="p-2 mb-4 rounded border-1 border-orange-500"
        type="text"
        name="name"
        id="name"
      />
      <label class="text-sm uppercase text-orange-800  mb-1" for="email"
        >Email</label
      >
      <input
        class="p-2 mb-4 rounded border-1 border-orange-500"
        type="email"
        name="email"
        id="email"
      />
      <input
        class="mt-4 p-4 bg-orange-800 text-white rounded"
        type="submit"
        value="Login"
      />
    </form>
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
    console.log(this.$fireAuth.users());

    // this.$fireDb.ref("users/" + 22).set({
    //   username: "Ciara",
    //   email: "kiearh@hotmail.com"
    // });
  }
};
</script>
