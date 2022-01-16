<template>
  <div class="section">
    <div class="is-flex is-justify-content-center">
      <div class="section px-0 yc-list-max-width">
        <div class="is-flex is-justify-content-space-between is-flex-wrap-wrap">
          <span class="yc-date">{{ date | formatDate($i18n.locale) }}</span>
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
        <figure v-if="image" class="image mb-5">
          <img
            style="border-radius: 3px"
            width="auto"
            height="auto"
            :src="`/${image}`"
            alt="blog image"
          />
        </figure>
        <div class="content yc-text mb-2" v-html="html"></div>
        <p v-if="tags" class="mb-5">
          <span
            v-for="(tag, index) in tags"
            :key="index"
            class="mr-2 yc-grey-4"
          >
            # {{ tag }}</span
          >
        </p>
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
        <div class="separator"></div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import newsEn from '~/content/newsEn.json'
import newsSv from '~/content/newsSv.json'
import FilePreviewComponent from '~/components/FilePreviewComponent.vue'

/* eslint-disable camelcase */
export default Vue.extend({
  components: {
    FilePreviewComponent,
  },
  async asyncData({ app, params }) {
    const news = app.i18n.locale === 'en' ? newsEn : newsSv
    const blogMeta = news.find((b) => b.slug === params.slug)

    const post = await import(
      `~/content/news/${app.i18n.locale}/${
        app.i18n.locale === 'en' ? blogMeta.slug : blogMeta.otherSlug
      }.md`
    )
    const attr = post.attributes
    const slug = params.slug

    const { attached_files, date, description, image, tags, title } = attr

    const otherPath =
      app.i18n.locale === 'en'
        ? `/sv/nyheter/${blogMeta.otherSlug}`
        : `/news/${blogMeta.otherSlug}`

    return {
      title,
      attached_files,
      date,
      description,
      image,
      tags,
      slug,
      otherPath,
      otherVisible: blogMeta.otherVisible,
      html: post.html,
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
          this.$i18n.locale === 'en' ? 'news' : 'sv/nyheter'
        }`,
        text: this.$i18n.locale === 'en' ? 'news' : 'nyheter',
      },
      {
        url: `https://youcruitgroup.com/${
          this.$i18n.locale === 'en' ? 'news' : 'sv/nyheter'
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
            this.$i18n.locale === 'sv' ? 'sv/nyheter' : 'news'
          }/${this.slug}`,
        },
        headline: this.title,
        description: this.description,
        image: this.image ? 'https://youcruitgroup.com/' + this.image : '',
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
          content: this.image ? this.image : '/images/social-share-image.jpg',
        },
      ],
    }
  },
})
</script>
