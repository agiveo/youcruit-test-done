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
          <div class="yc-list-max-width">
            <div v-for="(post, index) in newsList" :key="index">
              <BlogListItemComponent
                :post="post.attributes"
                :link="post.link"
              ></BlogListItemComponent>
              <div class="separator"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Vue from 'vue'
import BlogListItemComponent from './BlogListItemComponent.vue'

export default Vue.extend({
  components: {
    BlogListItemComponent,
  },
  props: {
    newsList: {
      type: Array,
      required: true,
    },
    content: {
      type: Object,
      required: true,
    },
  },
})
</script>
