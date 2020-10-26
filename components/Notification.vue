<template>
  <v-snackbar top right :color="color" :value="value" @input="input">
    <slot></slot>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    input: {
      type: Function,
      default: () => {},
    },
    value: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      default: undefined,
    },
  },
}
</script>
