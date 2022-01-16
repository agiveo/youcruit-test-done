<template>
  <div>
    <IntroSectionComponent :content="introContent"></IntroSectionComponent>
    <LatestBlogComponent
      :content="newsContent"
      :news-list="news.newsList"
    ></LatestBlogComponent>
    <hr />
    <CalendarEventsComponent
      :calendar-list="calendar.calendarList"
      :content="calendarContent"
    ></CalendarEventsComponent>
  </div>
</template>

<script>
import Vue from 'vue'
import IntroSectionComponent from '../components/IntroSectionComponent.vue'
import LatestBlogComponent from '../components/LatestBlogPostComponent.vue'
import CalendarEventsComponent from '../components/CalendarEventsComponent.vue'
import newsEn from '~/content/newsEn.json'
import calendarEn from '~/content/calendarEn.json'

import newsSv from '~/content/newsSv.json'
import calendarSv from '~/content/calendarSv.json'

export default Vue.extend({
  components: {
    IntroSectionComponent,
    LatestBlogComponent,
    CalendarEventsComponent,
  },
  jsonld() {
    return {
      '@context': 'https://schema.org',
      '@type': 'Corporation',
      name: 'Youcruit Group',
      alternateName: 'Youcruit AB',
      url: 'https://youcruitgroup.com',
      logo: 'https://youcruitgroup.com/images/logo.svg',
      sameAs: '',
      email: 'ir@youcruit.com',
      telephone: '+46 70-719 38 42',
      address: [
        {
          '@type': 'PostalAddress',
          addressLocality: 'Tampa',
          addressRegion: 'Florida',
          postalCode: '33607',
          streetAddress: '3401 W Cypress St. Suite 101',
        },
        {
          '@type': 'PostalAddress',
          addressLocality: 'Malmö',
          addressRegion: 'Skåne',
          postalCode: 'SE-211 39',
          streetAddress: 'Gustav Adolfs Torg 8B',
        },
      ],
    }
  },
  async asyncData({ app }) {
    const news = app.i18n.locale === 'en' ? newsEn : newsSv
    const calendar = app.i18n.locale === 'en' ? calendarEn : calendarSv

    async function awaitImport(content, path) {
      const wholeMD = await import(
        `~/content/${path}/${app.i18n.locale}/${
          app.i18n.locale === 'en' ? content.slug : content.otherSlug
        }.md`
      )

      return {
        attributes: wholeMD.attributes,
        link: content.slug,
      }
    }

    const newsList = await Promise.all(
      news
        .filter((n) => n.visible === true)
        .slice(0, 4)
        .map((content) => awaitImport(content, 'news'))
    ).then((res) => {
      return {
        newsList: res,
      }
    })

    const calendarList = await Promise.all(
      calendar
        .filter((c) => c.visible === true)
        .slice(0, 4)
        .map((content) => awaitImport(content, 'calendar'))
    ).then((res) => {
      return {
        calendarList: res,
      }
    })

    const calendarContent = await import(
      `~/content/landing_page/calendar_section.json`
    )

    const introContent = await import(
      `~/content/landing_page/intro_section.json`
    )
    const newsContent = await import(
      `~/content/landing_page/latest_news_section.json`
    )

    if (app.i18n.locale === 'en') {
      return {
        news: newsList,
        calendar: calendarList,
        calendarContent: calendarContent.default,
        introContent: introContent.default,
        newsContent: newsContent.default,
      }
    } else {
      return {
        news: newsList,
        calendar: calendarList,
        calendarContent: calendarContent.default.sv,
        introContent: introContent.default.sv,
        newsContent: newsContent.default.sv,
      }
    }
  },
  head() {
    return {
      title: 'YouCruit Group',
      htmlAttrs: {
        lang: this.$i18n.locale,
      },
      meta: [
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.introContent.headline,
        },
        {
          property: 'og:title',
          hid: 'og:title',
          content: 'YouCruit Group',
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

<style></style>
