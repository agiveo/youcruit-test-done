<template>
  <div class="newsletter-bg py-6" style="background-color: #0c1d7d">
    <div class="hero is-halfheight">
      <div class="hero-body">
        <div
          class="
            section
            is-flex
            is-flex-direction-column
            is-justify-content-center
            is-align-items-center
          "
        >
          <h2 class="yc-heading-1 has-text-white has-text-centered">
            {{ $t('headline') }}
          </h2>
          <p class="yc-list-max-width yc-text yc-white has-text-centered mt-5">
            {{ $t('description') }}
          </p>
          <div class="section my-0 py-0" style="width: 100%">
            <mailchimp-subscribe
              url="https://youcruit.us6.list-manage.com/subscribe/post-json"
              user-id="1288f661e7"
              list-id="279c2d7169"
              @error="onError"
              @success="onSuccess"
            >
              <template
                #default="{ subscribe, setEmail, error, success, loading }"
              >
                <form
                  class="mt-6 has-text-centered"
                  @submit.prevent="subscribe"
                >
                  <div v-if="success" class="is-size-2 has-text-white">
                    {{ $t('subscribe-success') }}
                  </div>
                  <div
                    v-else
                    class="is-flex is-flex-wrap-wrap is-justify-content-center"
                  >
                    <input
                      v-model="email"
                      style="max-width: 398px"
                      class="input has-background-white mr-2 mb-2"
                      type="email"
                      :placeholder="$t('placeholder_text')"
                      @input="setEmail($event.target.value)"
                    />
                    <button
                      type="submit"
                      class="button is-info has-text-white"
                      :class="loading ? 'is-loading' : ''"
                    >
                      {{ $t('button_text') }}
                    </button>
                  </div>
                  <div v-if="error" class="has-text-danger">
                    {{ errorMessage }}
                  </div>
                </form>
              </template>
            </mailchimp-subscribe>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import MailchimpSubscribe from 'vue-mailchimp-subscribe'

export default Vue.extend({
  components: {
    MailchimpSubscribe,
  },
  data() {
    return {
      errorMessage: '',
      email: '',
    }
  },
  methods: {
    onError(error) {
      if (!error) {
        this.errorMessage = ''
      } else if (error.includes('has already subscribed')) {
        this.errorMessage = `${this.email} ${this.$t(
          'already-subscriber'
        ).toString()}`
      } else if (error.includes('has too many recent signup requests')) {
        this.errorMessage = `${this.email} ${this.$t(
          'too-many-signup-requests'
        ).toString()}`
      } else {
        this.errorMessage = this.$t('something-went-wrong').toString()
      }
    },
    onSuccess() {
      this.errorMessage = ''
    },
  },
})
</script>
<style lang="scss">
.newsletter-bg {
  background-image: url('~assets/pattern-on-dark.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: left;
}
</style>
