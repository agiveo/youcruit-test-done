<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline my-4">
        <div class="column px-2 is-12 is-3-desktop">
          <h2 class="yc-heading-1 yc-black mb-4">
            {{ content.headline }}
          </h2>
        </div>
        <div class="column px-2 is-12 is-9-desktop">
          <div
            class="is-flex is-flex-direction-column yc-list-max-width"
            style="gap: 4rem"
          >
            <CalenderEventItemComponent
              v-for="(event, index) in calendarList"
              :key="index"
              :event="event.attributes"
              :link="event.link"
            ></CalenderEventItemComponent>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import CalenderEventItemComponent from './CalendarEventItemComponent.vue'

export default Vue.extend({
  components: {
    CalenderEventItemComponent,
  },
  props: {
    content: {
      type: Object,
      required: true,
    },
    calendarList: {
      type: Array,
      required: true,
    },
  },
})
</script>
