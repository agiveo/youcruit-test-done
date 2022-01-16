<template>
  <div class="section">
    <div class="is-flex is-justify-content-center">
      <div class="section px-0 yc-list-max-width">
        <div class="is-flex is-justify-content-space-between is-flex-wrap-wrap">
          <span class="yc-grey-4 has-text-weight-semibold">{{
            date | formatDate($i18n.locale)
          }}</span>
          <!-- <span v-if="otherVisible" class="hover-indicator">
            <a
              :href="otherPath"
              class="is-flex is-justify-content-flex-end yc-black"
            >
              <span v-if="$i18n.locale === 'sv'" class="mr-1">{{
                $t('also-available-in')
              }}</span>
              <span v-else class="mr-1">{{ $t('also-available-in') }}</span>
              <img
                v-if="$i18n.locale === 'sv'"
                width="30px"
                height="24px"
                src="/images/en-flag.svg"
              />
              <img
                v-else
                width="30px"
                height="24px"
                src="/images/sv-flag.svg"
              />
            </a>
          </span> -->
        </div>
        <h1 class="yc-heading-2">
          {{ title }}
        </h1>
        <div class="content yc-text" v-html="html"></div>
        <ul class="my-2">
          <li
            v-for="(attachment, index) in attached_files"
            :key="index"
            class="mb-1"
          >
            <FilePreviewComponent
              :attachment="attachment"
            ></FilePreviewComponent>
          </li>
        </ul>
        <div class="separator my-6"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import calendarEn from '~/content/calendarEn.json'
import calendarSv from '~/content/calendarSv.json'
import FilePreviewComponent from '~/components/FilePreviewComponent.vue'
/* eslint-disable camelcase */
export default Vue.extend({
  components: {
    FilePreviewComponent,
  },
  async asyncData({ app, params }) {
    const calendar = app.i18n.locale === 'en' ? calendarEn : calendarSv
    const blogMeta = calendar.find((b) => b.slug === params.slug)

    const event = await import(
      `~/content/calendar/${app.i18n.locale}/${
        app.i18n.locale === 'en' ? blogMeta.slug : blogMeta.otherSlug
      }.md`
    )

    const attr = event.attributes
    const slug = params.slug

    const { attached_files, created_date, date, description, title } = attr

    // const otherPath =
    //   app.i18n.locale === 'en'
    //     ? `/sv/kalender/${blogMeta.otherSlug}`
    //     : `/calendar/${blogMeta.otherSlug}`

    return {
      title,
      attached_files,
      created_date,
      date,
      description,
      slug,
      html: event.html,
      // otherPath,
      // otherVisible: blogMeta.otherVisible,
    }
  },
  jsonld() {
    const breadcrumbs = [
      {
        url: 'https://youcruitgroup.com',
        text: 'index',
      },
      {
        url: `https://youcruitgroup.com/${
          this.$i18n.locale === 'en' ? 'calendar' : 'sv/kalender'
        }`,
        text: this.$i18n.locale === 'en' ? 'calendar' : 'kalender',
      },
      {
        url: `https://youcruitgroup.com/${
          this.$i18n.locale === 'en' ? 'calendar' : 'sv/kalender'
        }/${this.slug}`,
        text: this.title,
      },
    ]

    const items = breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@id': item.url,
        name: item.text,
      },
    }))
    return [
      {
        '@context': 'https://schema.org',
        '@type': 'NewsArticle',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': `https://youcruitgroup.com/${
            this.$i18n.locale === 'sv' ? 'sv/kalendar' : 'calendar'
          }/${this.slug}`,
        },
        headline: this.title,
        description: this.description,
        image: '',
        datePublished: this.date,
        dateModified: new Date(),
        author: {
          '@type': 'Organization',
          name: 'Youcruit Group',
        },
        publisher: {
          '@type': 'Organization',
          name: 'Youcruit Group',
          logo: {
            '@type': 'ImageObject',
            url: 'https://youcruitgroup.com/images/logo.svg',
          },
        },
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items,
      },
    ]
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
