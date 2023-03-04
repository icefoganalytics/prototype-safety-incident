<template>
  <v-row justify="center">
    <v-col cols="12" md="8" class="justify-center">
      <h1 class="mb-1 mt-2">Report a Safety Incident</h1>
      <p class="mb-3">
        Please fill out the form below to the best of your knowledge. Click the checkbox at the bottom if you would like
        to be contacted by a safety representative after we process this incident.
      </p>

      <v-card color="white" variant="outlined" style="border: 1px #F2A90088 solid; background-color: white;">
        <v-card-text>
          <v-row>
            <v-col cols="12" sm="6" class="pb-0">
              <v-text-field label="Who" v-model="incident.who" variant="outlined" density="comfortable"></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" sm="3">
              <v-text-field
                label="Date"
                v-model="incident.date"
                variant="outlined"
                density="comfortable"></v-text-field>
            </v-col>
            <v-col class="pb-0" cols="12" sm="3">
              <v-text-field
                label="Time"
                v-model="incident.time"
                variant="outlined"
                density="comfortable"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pb-0">
              <v-text-field
                label="Location of incident"
                v-model="incident.where"
                variant="outlined"
                density="comfortable"></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pb-0">
              <v-textarea
                label="Briefly describe what happened"
                v-model="incident.what"
                variant="outlined"
                density="comfortable"
                rows="3"></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="pb-0" cols="12" sm="4">
              <v-select
                label="Category"
                v-model="incident.category"
                variant="outlined"
                density="comfortable"
                :items="categoryOptions"></v-select>
            </v-col>
            <v-col class="pb-0" cols="12" sm="4">
              <v-select
                label="Severity"
                v-model="incident.severity"
                variant="outlined"
                density="comfortable"
                :items="severityOptions"></v-select>
            </v-col>
            <v-col class="pb-0" cols="12" sm="4">
              <v-select
                label="Probaby of reoccurrence"
                v-model="incident.probability"
                variant="outlined"
                density="comfortable"
                :items="probabilityOptions"></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col class="py-0">
              <v-checkbox
                v-model="incident.feedback_requested"
                label="Please contact me for more feedback"
                variant="outlined"
                density="comfortable"></v-checkbox>
            </v-col>
          </v-row>

          <v-btn color="primary" variant="flat" :disabled="!canSave" @click="saveClick">Submit</v-btn>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import moment from "moment";

export default {
  name: "Dashboard",
  data: () => ({
    incident: {
      who: "",
      where: "",
      date: "",
      time: "",
      what: "",
      category: "Incident",
      severity: "Medium",
      probability: "Low",
      feedback_requested: false,
    },
    categoryOptions: ["Incident", "Near miss", "Injury", "Other"],
    severityOptions: ["Low", "Medium", "High", "Critical"],
    probabilityOptions: ["Low", "Medium", "High"],
  }),
  mounted() {
    this.incident.who = this.$auth.user.value.name || "";
    this.incident.date = moment().format("YYYY-MM-DD");
    this.incident.time = moment().format("hh:mm a");
  },
  computed: {
    canSave() {
      if (this.incident.who && this.incident.where && this.incident.what && this.incident.date && this.incident.time)
        return true;

      return false;
    },
  },
  methods: {
    saveClick() {
      this.$router.push("/thank-you");
    },
  },
};
</script>
