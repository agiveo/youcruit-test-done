/* eslint-disable no-useless-escape */
const fs = require('fs')
const path = require('path')
const parseMarkdown = require('front-matter-markdown')

function slugify(string) {
  const a =
    'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
  const b =
    'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
  const p = new RegExp(a.split('').join('|'), 'g')

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, '') // Trim - from end of text
}

/**
 * getFiles - Get list of files in directory
 * @param {string} dir
 * @returns {Array} Array of objects
 */
const getFiles = (thisPath) => {
  const thisFiles = fs.readdirSync(thisPath)

  const filelist = []

  thisFiles.forEach((file) => {
    const thisMarkdownFile = fs.readFileSync(`${thisPath}/${file}`, 'utf-8')
    const thisFileContents = parseMarkdown(thisMarkdownFile)

    const date = thisFileContents.date
    const visible = thisFileContents.visible
    const slug = slugify(thisFileContents.title)

    const obj = { date, slug, visible, otherSlug: '', otherVisible: false }

    filelist.push(obj)
  })

  return filelist
}

/**
 * Write blogs json file
 */
const writeFileInfo = async (thisPath, jsonFile) => {
  const fileArray = await getFiles(thisPath)

  // Order array by date (default asc)
  const sortedArray = await fileArray.sort((a, b) => {
    return a.date.getTime() - b.date.getTime()
  })

  // Reverse array and write to JSON
  const reversedArray = await sortedArray.reverse()
  const jsonContent = await JSON.stringify(reversedArray)

  fs.writeFile(jsonFile, jsonContent, (err) => {
    if (err) throw new Error(err)
  })
}

writeFileInfo(
  path.join(__dirname, 'news', 'en'),
  path.join(__dirname, 'newsEn.json')
)

writeFileInfo(
  path.join(__dirname, 'calendar', 'en'),
  path.join(__dirname, 'calendarEn.json')
)
