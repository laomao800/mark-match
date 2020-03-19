const escaped = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')

function genKeywordRegExp(keyword, exact = false) {
  if (!keyword || !(keyword = keyword.trim())) {
    return null
  } else {
    let keywords = [keyword]
    if (!exact) {
      keywords = keywords.concat(
        keyword.split(' ').filter(word => word)
      )
    }
    const escapedKeywords = keywords.map(word => escaped(word))
    return new RegExp(escapedKeywords.join('|'), 'gi')
  }
}

function mark(
  text,
  keyword,
  tplFn = match => `<mark>${match}</mark>`,
  /* istanbul ignore next */
  exact = false
) {
  const keywordReg = genKeywordRegExp(keyword, exact)
  return keywordReg
    ? text.replace(keywordReg, tplFn)
    : text
}

function markMatch(text, keyword, tplFn) {
  return mark(text, keyword, tplFn)
}

function markExactMatch(text, keyword, tplFn) {
  return mark(text, keyword, tplFn, true)
}

function hasMatch(text, keyword) {
  const keywordReg = genKeywordRegExp(keyword)
  return !!keywordReg && keywordReg.test(text)
}

function hasExactMatch(text, keyword) {
  const keywordReg = genKeywordRegExp(keyword, true)
  return !!keywordReg && keywordReg.test(text)
}

module.exports = {
  markMatch,
  markExactMatch,
  hasMatch,
  hasExactMatch
}
