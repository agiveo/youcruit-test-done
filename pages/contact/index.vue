<template>
  <div class="section mb-6">
    <h1 class="yc-headline mb-6">
      {{ title }}
    </h1>

    <div
      style="gap: 2rem; margin: 0 auto"
      class="
        yc-list-max-width
        is-flex is-justify-content-space-between is-flex-wrap-wrap
        section
        px-0
      "
    >
      <div v-for="(info, index) in contactInfo" :key="index" class>
        <ContactInfoComponent :info="info"></ContactInfoComponent>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ContactInfoComponent from '~/components/ContactInfoComponent.vue'
// const md = require('markdown-it')({
//   html: true,
//   linkify: true,
//   typographer: true,
// })

export default Vue.extend({
  components: { ContactInfoComponent },
  async asyncData({ app }) {
    const about = await import(`~/content/contact_page/intro_section.md`)
    const attr = about.attributes
    const html = about.html

    const { title } = app.i18n.locale === 'en' ? attr : attr.sv

    return {
      title,
      html,
    }
  },
  data() {
    return {
      contactInfo: [
        {
          id: 1,
          name: 'Sven Holmgren',
          position: 'Board Chairman',
          email: 'sven.holmgren@youcruit.com',
          image: '/uploads/george-clooney.jpg',
        },
        {
          id: 2,
          name: 'Mats Holmbäck',
          position: 'CEO',
          email: 'mats.holmback@youcruit.com',
          image: '/uploads/denzel-washington.jpg',
        },
      ],
      breadcrumbs: [
        {
          url: 'https://youcruitgroup.com',
          text: 'index',
        },
        {
          url: `https://youcruitgroup.com/${
            this.$i18n.locale === 'en' ? 'contact' : 'sv/kontakt'
          }`,
          text: this.$i18n.locale === 'en' ? 'contact' : 'kontakt',
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
