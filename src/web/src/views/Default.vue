<template>
  <v-overlay>
    <div class="text-center">
      <v-progress-circular indeterminate size="64" class="mb-5"></v-progress-circular>
      <h1 class="title">Loading</h1>
    </div>
  </v-overlay>
</template>
<script lang="ts">
export default {
  name: "Default",
  components: {},
  mounted() {
    let i = window.setInterval(() => {
      if (this.$auth.isLoading) {
        window.clearInterval(i);

        if (this.$auth.isAuthenticated && this.$auth.user.value) {
          this.$router.push("/incident");
        } else this.$router.push("/sign-in");
      }
    }, 250);
  },
};
</script>
