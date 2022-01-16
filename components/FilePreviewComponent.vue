<template>
  <a :href="`/${attachment}`" target="_blank">
    <span class="tag p-1 yc-bg-blue yc-white mr-2">{{
      attachment.split('.').pop().toUpperCase()
    }}</span
    ><span class="yc-blue hover-indicator has-text-weight-medium">{{
      attachment.replace('uploads/', '')
    }}</span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    attachment: {
      type: String,
      required: true,
    },
  },
})
</script>
