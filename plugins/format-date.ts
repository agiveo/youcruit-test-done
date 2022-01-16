import Vue from 'vue'

Vue.filter('formatDate', (dateStr: string, locale: string) => {
  if (!locale || !dateStr) return ''

  const options = { month: 'long', day: 'numeric', year: 'numeric' } as const
  return locale === 'en'
    ? Intl.DateTimeFormat('en-GB', options).format(new Date(dateStr))
    : Intl.DateTimeFormat('sv-SE', options).format(new Date(dateStr))
})

Vue.filter('formatDay', (dateStr: string) => {
  if (!dateStr) return ''

  const options = { day: 'numeric' } as const
  return Intl.DateTimeFormat('en-GB', options).format(new Date(dateStr))
})

Vue.filter('formatMonth', (dateStr: string, locale: string) => {
  if (!locale || !dateStr) return ''

  const options = { month: 'long' } as const
  return locale === 'en'
    ? Intl.DateTimeFormat('en-GB', options).format(new Date(dateStr))
    : Intl.DateTimeFormat('sv-SE', options).format(new Date(dateStr))
})

Vue.filter('formatYear', (dateStr: string) => {
  if (!dateStr) return ''

  const options = { year: 'numeric' } as const
  return Intl.DateTimeFormat('en-GB', options).format(new Date(dateStr))
})
