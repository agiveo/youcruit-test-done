<template>
  <div class="section pt-0">
    <div class="is-flex is-justify-content-center">
      <div class="yc-content-max-width">
        <div class="section mx-0 px-0">
          <h1 class="yc-headline mb-6">
            {{ title }}
          </h1>
          <div class="content yc-text yc-black" v-html="content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
// const md = require('markdown-it')({
//   html: true,
//   linkify: true,
//   typographer: true,
// })

export default Vue.extend({
  async asyncData({ app }) {
    const about = await import(`~/content/about_page/intro_section.md`)
    const attr = about.attributes
    const html = about.html
    const { title } = app.i18n.locale === 'en' ? attr : attr.sv
    return {
      title,
      content: html,
    }
  },
  data() {
    return {
      breadcrumbs: [
        {
          url: 'https://youcruitgroup.com',
          text: 'index',
        },
        {
          url: `https://youcruitgroup.com/${
            this.$i18n.locale === 'en' ? 'about-us' : 'sv/om-oss'
          }`,
          text: this.$i18n.locale === 'en' ? 'about us' : 'om oss',
        },
      ],
    }
  },
  jsonld() {
    const items = this.breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text,
      },
    }))

    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items,
    }
  },
  head() {
    return {
      title: `${this.title} - YouCruit Group`,
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      meta: [
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          property: 'og:title',
          hid: 'og:title',
          content: this.title,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/images/social-share-image.jpg',
        },
      ],
    }
  },
})
</script>
