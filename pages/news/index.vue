<template>
  <div class="section pt-0">
    <div class="is-flex is-justify-content-center">
      <div>
        <div class="section is-flex is-justify-content-center">
          <h1 class="yc-headline yc-headline-max-width">
            {{ newsContent.headline }}
          </h1>
        </div>
        <div
          v-for="(newsItem, index) in news.newsList"
          :key="index"
          class="yc-list-max-width"
        >
          <BlogListItemComponent
            :post="newsItem.attributes"
            :link="newsItem.link"
          ></BlogListItemComponent>
          <div class="separator my-6"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BlogListItemComponent from '../../components/BlogListItemComponent.vue'
import newsEn from '~/content/newsEn.json'
import newsSv from '~/content/newsSv.json'

export default Vue.extend({
  components: {
    BlogListItemComponent,
  },
  async asyncData({ app }) {
    const news = app.i18n.locale === 'en' ? newsEn : newsSv

    async function awaitImport(blog) {
      const wholeMD = await import(
        `~/content/news/${app.i18n.locale}/${
          app.i18n.locale === 'en' ? blog.slug : blog.otherSlug
        }.md`
      )

      if (wholeMD) {
        return {
          attributes: wholeMD.attributes,
          link: blog.slug,
        }
      }
    }

    const newsList = await Promise.all(
      news
        .filter((blog) => blog.visible === true)
        .map((blog) => awaitImport(blog))
    ).then((res) => {
      return {
        newsList: res,
      }
    })

    const newsContent = await import(`~/content/news_page/intro_section.json`)

    return {
      news: newsList,
      newsContent:
        app.i18n.locale === 'en' ? newsContent.default : newsContent.default.sv,
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
            this.$i18n.locale === 'en' ? 'news' : 'sv/nyheter'
          }`,
          text: this.$i18n.locale === 'en' ? 'news' : 'nyheter',
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
      title: `${this.newsContent.headline} - YouCruit Group`,
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      meta: [
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.newsContent.description,
        },
        {
          property: 'og:title',
          hid: 'og:title',
          content: this.newsContent.headline,
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
