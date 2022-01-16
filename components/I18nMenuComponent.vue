<template>
  <div class="mx-2">
    <button
      class="button menu-button px-1 py-0 mr-2 is-inline-flex"
      :class="$i18n.locale === 'en' ? 'menu-button-shadow' : ''"
      @click="changeLanguage('en')"
    >
      <img width="38px" height="25px" src="/images/en-flag.svg" alt="sv flag" />
    </button>
    <button
      class="button menu-button px-1 py-0 is-inline-flex"
      :class="$i18n.locale === 'en' ? '' : 'menu-button-shadow'"
      @click="changeLanguage('sv')"
    >
      <img width="38px" height="25px" src="/images/sv-flag.svg" alt="sv flag" />
    </button>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  methods: {
    changeLanguage(locale) {
      this.$i18n.setLocaleCookie(locale)
      this.$router.replace(this.switchLocalePath(locale))
    },
  },
})
</script>
<style lang="scss">
.menu-button {
  height: 1.8rem !important;
  border-radius: 0;
  border: 0;
  display: inline;
}
button {
  outline: none;
}

.menu-button-shadow {
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.15), 0 5px 5px 0 rgba(0, 0, 0, 0.15);
}
</style>
