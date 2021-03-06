export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',
  loading: false,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'youcruit-group',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: 'We build labor market places.',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~assets/styles/global.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/format-date',
    '~/plugins/buefy-components',
    '~/plugins/jsonld',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-i18n',
    [
      'nuxt-cookie-control',
      {
        css: true,
        barPosition: 'bottom-full',
        colors: {
          barTextColor: '#fff',
          modalOverlay: '#000',
          barBackground: '#0C1D7D',
          modalButtonBackground: '#0bb3eb',
          controlButtonIconColor: '#2b3a4d',
          checkboxActiveBackground: '#2b3a4d',
          checkboxInactiveBackground: '#ccc',
          controlButtonHoverBackground: '#2b3a4d',
          checkboxDisabledBackground: '#556170',
        },
        // modal opener (cookie control)
        controlButton: false,
        text: {
          locale: {
            en: {
              barTitle: 'Cookies',
              barDescription:
                'We use our own cookies and third-party cookies so that we can show you this website and better understand how you use it, with a view to improving the services we offer. If you continue browsing, we consider that you have accepted the cookies.',
              acceptAll: 'Accept',
              declineAll: 'Delete all',
              manageCookies: 'Manage cookies',
              unsaved: 'You have unsaved settings',
              close: 'Close',
              save: 'Save',
              necessary: 'Necessary cookies',
              optional: 'Optional cookies',
              functional: 'Functional cookies',
              blockedIframe: 'To see this, please enable functional cookies',
              here: 'here',
            },
            sv: {
              barTitle: 'Kakor',
              barDescription:
                'Vi anv??nder v??ra egna cookies och cookies fr??n tredje part s?? att vi kan visa dig den h??r webbplatsen och b??ttre f??rst?? hur du anv??nder den i syfte att f??rb??ttra de tj??nster vi erbjuder. Om du forts??tter att surfa anser vi att du har accepterat kakorna.',
              acceptAll: 'Acceptera',
              declineAll: 'Ta bort alla',
              manageCookies: 'Hantera kakor',
              unsaved: 'Du har inte sparade inst??llningar',
              close: 'St??ng',
              save: 'Spara',
              necessary: 'N??dv??ndiga kakor',
              optional: 'Valfria kakor',
              functional: 'Funktionella kakor',
              blockedIframe:
                'F??r att se detta, v??nligen aktivera funktionella kakor',
              here: 'h??r',
            },
          },
        },
      },
    ],
    '@nuxtjs/sitemap',
  ],
  i18n: {
    seo: false,
    parsePages: false,
    baseUrl: 'https://youcruitgroup.com',
    pages: {
      '/index': {
        en: '/',
        // sv: '/',
      },
      'about/index': {
        en: '/about-us',
        // sv: '/om-oss',
      },
      'contact/index': {
        en: '/contact',
        // sv: '/kontakt',
      },
      'news/index': {
        en: '/news',
        // sv: '/nyheter',
      },
      'news/_slug/index': {
        en: '/news/:slug',
        // sv: '/nyheter/:slug',
      },
      'calendar/_slug/index': {
        en: '/calendar/:slug',
        // sv: '/kalender/:slug',
      },
    },
    locales: [
      // {
      //   id: 2,
      //   code: 'sv',
      //   iso: 'sv-SE',
      //   nameEn: 'Swedish',
      //   nameSv: 'Svenska',
      // },
      {
        id: 1,
        code: 'en',
        iso: 'en-US',
        nameEn: 'English',
        nameSv: 'Engelska',
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    vueI18n: {
      fallbackLocale: 'en',
      messages: {
        en: {
          ...require('./content/landing_page/suscribe_section.json'),
          home: 'HOME',
          contact: 'CONTACT',
          about: 'ABOUT',
          news: 'NEWS',
          'also-available-in': 'Read in Swedish',
          'already-subscriber': 'already subscribed to the newsletter.',
          'subscribe-success': 'Thank you for subscribing!',
          'something-went-wrong': 'Something went wrong!',
          'too-many-signup-requests':
            'has too many recent signup requests. Please try again later.',
          text404: "You just hit a route that doesn't exist...",
        },
        sv: {
          ...require('./content/landing_page/suscribe_section.json'),
          home: 'Hem',
          contact: 'Kontakt',
          about: 'Om oss',
          news: 'Nyheter',
          'also-available-in': 'L??s p?? engelska',
          'already-subscriber': 'prenumererar redan p?? nyhetsbrevet.',
          'subscribe-success': 'Tack f??r att du prenumererar!',
          'something-went-wrong': 'N??got gick fel!',
          'too-many-signup-requests':
            'har gjort f??r m??nga prenumererationsf??rfr??gningar. F??rs??k igen senare.',
          text404: 'Du tr??ffade en rutt som inte existerar...',
        },
      },
    },
  },
  sitemap: {
    hostname: 'https://youcruitgroup.com',
    gzip: true,
    exclude: ['/admin/**'],
    routes: require('./utils/createSitemapRoutes').default,
  },
  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // eslint-disable-next-line prettier/prettier
    extend(config) {
      // Add this to your build config
      config.module.rules.push({
        test: /\.md$/,
        loader: 'frontmatter-markdown-loader',
        options: {
          vue: true,
        },
      })
    },
  },
}
