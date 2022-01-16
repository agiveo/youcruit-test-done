<template>
  <section class="hero is-fullheight-with-navbar">
    <div class="hero-body">
      <div class="section py-0 yc-content-max-width mb-6 salle">
        <div class="is-flex is-justify-content-center">
          <h1 class="yc-headline" v-html="content.headline"></h1>
        </div>

        <div>
          <p class="is-black is-size-5 has-text-weight-light has-text-centered">
            {{ content.description }}
          </p>
        </div>
      </div>
      <div style="width: 100vw; position: relative">
        <img
          src="/images/bg-stripes.jpg"
          class="bg-pattern pattern-big-hide"
          alt="truck background"
          width="100%"
          height="auto"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    content: {
      type: Object,
      required: true,
    },
  },
})
</script>
<style>
@media only screen and (min-width: 1500px) {
  .bg-pattern {
    top: -50px;
  }
}

.hero-body {
  padding: 0;
  flex-direction: column;
  justify-content: center;
}

.bg-pattern {
  position: relative;
  width: 100%;
  max-width: 100%;
}
</style>
