<template>
  <header>
    <b-navbar
      fixed-top
      transparent
      :active.sync="visible"
      role="navigation"
      aria-label="main navigation"
      :style="{
        boxShadow:
          scrolled && !visible ? '0 5px 5px 0 rgba(0, 0, 0, 0.12)' : '',
      }"
    >
      <template #brand>
        <b-navbar-item tag="nuxt-link" class="logo-link" :to="localePath('/')">
          <figure>
            <img
              src="/images/logo.svg"
              width="173px"
              height="28px"
              alt="logo"
            />
          </figure>
        </b-navbar-item>
      </template>
      <template #end>
        <b-navbar-item
          v-for="link in menuLinks"
          :key="link.name"
          tag="nuxt-link"
          :to="localePath(link.link)"
        >
          {{ $t(link.name) }}
        </b-navbar-item>
        <!-- <span
          v-if="!isContentPage"
          :class="visible ? '' : 'ml-6'"
          class="is-flex is-align-items-center py-2"
        >
          <I18nMenuComponent></I18nMenuComponent>
        </span> -->
      </template>
    </b-navbar>
  </header>
</template>

<script>
import Vue from 'vue'
// import I18nMenuComponent from './I18nMenuComponent.vue'

export default Vue.extend({
  // components: {
  //   I18nMenuComponent,
  // },
  data() {
    return {
      scrolled: false,
      visible: false,
      menuLinks: [
        {
          name: 'home',
          description: 'HOME',
          link: '/',
        },
        {
          name: 'news',
          description: 'NEWS',
          link: '/news',
        },
        {
          name: 'about',
          description: 'ABOUT',
          link: '/about-us',
        },
        {
          name: 'contact',
          description: 'CONTACT',
          link: '/contact',
        },
      ],
    }
  },
  computed: {
    isContentPage() {
      if (this.$route.name) {
        return this.$route.name.includes('slug')
      } else {
        return true
      }
    },
  },
  mounted() {
    document.addEventListener('scroll', this.handleScroll, { passive: true })
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    toggleVisibility() {},
    handleScroll() {
      const isScrolled = window.scrollY > 10
      if (isScrolled !== this.scrolled) {
        this.scrolled = !this.scrolled
      }
    },
  },
})
</script>
<style lang="scss" scoped>
.nav-shadow {
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>
