<template>
  <div class="is-flex">
    <div class="date-badge mt-2">
      <div class="month">{{ event.date | formatMonth($i18n.locale) }}</div>
      <div
        class="
          day-year-container
          is-flex is-flex-direction-column is-justify-content-center
        "
      >
        <div class="day">{{ event.date | formatDay }}</div>
        <div class="year">{{ event.date | formatYear }}</div>
      </div>
    </div>
    <div class="yc-list-max-width">
      <nuxt-link
        class="hover-indicator content"
        :to="localePath(`/calendar/${link}`)"
      >
        <h3 class="yc-heading-2">
          {{ event.title }}
        </h3>
        <p class="yc-grey-5 yc-text">{{ event.description }}</p>
      </nuxt-link>
      <ul class="my-2">
        <li
          v-for="(attachment, index) in event.attached_files"
          :key="index"
          class="mb-1"
        >
          <FilePreviewComponent :attachment="attachment"></FilePreviewComponent>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import FilePreviewComponent from './FilePreviewComponent.vue'

export default Vue.extend({
  components: {
    FilePreviewComponent,
  },
  props: {
    event: {
      type: Object,
      required: true,
    },
    link: {
      type: String,
      required: false,
      default: '',
    },
  },
})
</script>
<style lang="scss" scoped></style>
