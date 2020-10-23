<template>
  <v-card>
    <v-card-title>
      {{ title }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      disable-pagination
      disable-sort
      hide-default-footer
      :headers="headers"
      :items="items"
      :search="search"
      :loading="loading"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    search: null,
    headers: [
      { text: 'Nickname', value: 'nickname' },
      { text: 'Rank', value: 'rank' },
      { text: 'Wins', value: 'wins' },
      { text: 'Losses', values: 'losses' },
    ],
  }),
}
</script>
