<template>
  <div>
    <HeaderComponent></HeaderComponent>
    <Nuxt />
    <NewsLetterComponent></NewsLetterComponent>
    <FooterComponent></FooterComponent>
    <CookieControl :locale="$i18n.locale"></CookieControl>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import NewsLetterComponent from '../components/NewsLetterComponent.vue'
import FooterComponent from '../components/FooterComponent.vue'

export default Vue.extend({
  components: {
    HeaderComponent,
    NewsLetterComponent,
    FooterComponent,
  },
  head() {
    return this.$nuxtI18nHead({ addSeoAttributes: true })
  },
})
</script>

<style></style>
