<template>
  <div
    style="gap: 2rem"
    class="
      is-flex
      is-flex-direction-column
      is-justify-content-center
      is-align-items-center
    "
  >
    <!-- <figure class="image">
      <img class="is-rounded" width="160px" height="160px" :src="info.image" />
    </figure> -->

    <div class="contacct">
      <h4 class="yc-contact-info-title yc-black">
        {{ info.name }}
      </h4>
      <p style="text-align: center">
        {{ info.position }}
      </p>
    

    <p class="yc-black has-text-weight-bold">
      {{ info.email }}
    </p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  props: {
    info: { type: Object, required: true },
  },
})
</script>
