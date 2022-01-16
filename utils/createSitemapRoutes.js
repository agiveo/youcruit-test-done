import newsEn from '../content/newsEn.json'
import calendarEn from '../content/calendarEn.json'

// import newsSv from '../content/newsSv.json'
// import calendarSv from '../content/calendarSv.json'

const createSitemapRoutes = () => {
  const routes = []

  newsEn.forEach((post) => {
    routes.push({
      url: `/news/${post.slug}`,
      changefreq: 'monthly',
      lastmod: new Date(post.date),
    })
  })

  // newsSv.forEach((post) => {
  //   routes.push({
  //     url: `/sv/nyheter/${post.slug}`,
  //     changefreq: 'monthly',
  //     lastmod: new Date(post.date),
  //   })
  // })

  calendarEn.forEach((post) => {
    routes.push({
      url: `/calendar/${post.slug}`,
      changefreq: 'monthly',
      lastmod: new Date(post.date),
    })
  })

  // calendarSv.forEach((post) => {
  //   routes.push({
  //     url: `sv/kalender/${post.slug}`,
  //     changefreq: 'monthly',
  //     lastmod: new Date(post.date),
  //   })
  // })

  return routes
}

export default createSitemapRoutes
