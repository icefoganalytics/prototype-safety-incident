<template>
  <v-row justify="center">
    <v-col cols="12" md="8" class="justify-center">
      <h1 class="mb-1">Thank you!</h1>
      <p class="mb-3">
        Your Safety Incident has been recorded and reported to a representative for evaluation and remediation.
      </p>

      <p class="mb-6">You will be contacted shorting for additional feedback per your request.</p>

      <v-divider class="mb-4"></v-divider>

      <router-link to="incident">Record another incident</router-link>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  name: "Dashboard",
  data: () => ({}),
  mounted() {},
  computed: {},
  methods: {
    saveClick() {
      this.$router.push("/complete");
    },
  },
};
</script>
