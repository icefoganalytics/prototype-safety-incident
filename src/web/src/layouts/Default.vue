<template>
  <v-app-bar app color="#fff" flat height="70" style="left: 0; border-bottom: 3px #f3b228 solid">
    <img src="/yukon.svg" style="margin-top:-10x; margin-left: 14px" class="mr-8 mr-sm-16" height="44" /> <!--style="margin: -10px 85px 0 14px"-->
    <!-- <v-img class="ml-0m pl-0" src="src/assets/yukon.svg" height="44" /> -->
    <v-app-bar-title class="pt-0 font-weight-bold ml-n5 mt-7 mt-sm-2" style="">{{ title }}</v-app-bar-title>

    <template v-slot:append>
      <div v-if="isAuthenticated">
        <v-btn color="primary" class="mr-1 d-none d-sm-inline-flex" to="/incident" icon="mdi-home"></v-btn>

        <v-divider class="mr-3 d-none d-sm-inline-block" vertical inset ></v-divider>
        <span style="font-size: 0.9rem" class="d-none d-sm-inline"> {{ username }} </span>

        <v-menu offset-y>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" color="primary" v-bind="props"></v-btn>
          </template>

          <v-list density="compact">

            <v-list-item class="d-sm-none">
              <template v-slot:prepend>
                <v-icon>mdi-home</v-icon>
              </template>
              <v-list-item-title style="font-size: 0.9rem !important">Home</v-list-item-title>
            </v-list-item>

            <v-list-item class="d-sm-none">
              <template v-slot:prepend>
                <v-icon>mdi-account</v-icon>
              </template>
              <v-list-item-title style="font-size: 0.9rem !important">{{ username }} </v-list-item-title>
            </v-list-item>

            <v-list-item @click="logoutClick">
              <template v-slot:prepend>
                <v-icon>mdi-exit-run</v-icon>
              </template>
              <v-list-item-title style="font-size: 0.9rem !important">Sign out</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div v-else>
        <login-button />
      </div>
    </template>
  </v-app-bar>

  <v-main>
    <!-- Provides the application the proper gutter -->
    <!-- fill-height causes the main content to fill the entire page -->
    <v-container fluid class="page-wrapper fill-height" style="align-items:normal">
      <router-view></router-view>
    </v-container>
  </v-main>

  <v-overlay v-model="showOverlay" class="align-center justify-center">
    <div class="text-center">
      <v-progress-circular indeterminate size="64" class="mb-5" color="#f3b228" width="6"></v-progress-circular>
      <h2>Loading {{ title }}</h2>
    </div>
  </v-overlay>
</template>

<script lang="ts">
import { useNotificationStore } from "../store/NotificationStore";
import { mapWritableState } from "pinia";

export default {
  name: "Default",
  data: () => ({
    showOverlay: true,
  }),
  computed: {
    ...mapWritableState(useNotificationStore, ["showNotification"]),

    isAuthenticated() {
      return this.$auth.isAuthenticated;
    },
    authUser() {
      return this.$auth.user;
    },

    title() {
      return "Incident Recorder";
    },
    username() {
      return this.$auth.user.value.name;
    },
    returnTo: function () {
      return window.location.origin;
      // return auth.options.logout_redirect;
    },
  },

  async mounted() {
    this.showOverlay = false;
  },
  methods: {
    logoutClick() {
      this.$auth.logout({ logoutParams: { returnTo: this.returnTo } });
    },
  },
};
</script>
