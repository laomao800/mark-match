const escaped = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

function mark(
  text,
  keyword,
  tplFn = match => `<mark>${match}</mark>`,
  /* istanbul ignore next */
  split = true
) {
  if (!keyword || !(keyword = keyword.trim())) {
    return text
  } else {
    let keywords = [keyword]
    if (split) {
      const splitKeyword = keyword.split(' ').filter(word => word)
      keywords = keywords.concat(splitKeyword)
    }
    const escapedKeywords = keywords.map(word => escaped(word))
    const reg = new RegExp(escapedKeywords.join('|'), 'gi')
    return text
      .toString()
      .replace(reg, tplFn)
  }
}

function markMatch(text, keyword, tplFn) {
  return mark(text, keyword, tplFn, true)
}

function markExactMatch(text, keyword, tplFn) {
  return mark(text, keyword, tplFn, false)
}

module.exports = {
  markMatch,
  markExactMatch
}
