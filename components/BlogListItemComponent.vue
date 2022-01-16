<template>
  <div class="container mt-5 mb-5">
    <nuxt-link class="hover-indicator" :to="localePath(`/news/${link}`)">
     
      <p class="yc-date">
        {{ post.date | formatDate($i18n.locale) }}
      </p>
      <div class>
        <h2 class="yc-heading-2">
          {{ post.title }}
        </h2>
      </div>
      <p class="yc-grey-5 yc-text">{{ post.description }}</p>
    </nuxt-link>
    <p v-if="post.tags" class="mb-5">
      <span
        v-for="(tag, index) in post.tags"
        :key="index"
        class="mr-2 yc-grey-4"
        >#{{ tag }}</span
      >
    </p>
    <ul v-if="post.attached_files" class="my-1">
      <li
        v-for="(attachment, index) in post.attached_files"
        :key="index"
        class="mb-1"
      >
        <FilePreviewComponent :attachment="attachment"></FilePreviewComponent>
      </li>
    </ul>
   
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
    post: {
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
