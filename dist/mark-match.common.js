'use strict';

var escaped = function (text) { return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'); };

function genKeywordRegExp(keyword, exact) {
  if ( exact === void 0 ) exact = false;

  if (!keyword || !(keyword = keyword.trim())) {
    return null
  } else {
    var keywords = [keyword];
    if (!exact) {
      keywords = keywords.concat(
        keyword.split(' ').filter(function (word) { return word; })
      );
    }
    var escapedKeywords = keywords.map(function (word) { return escaped(word); });
    return new RegExp(escapedKeywords.join('|'), 'gi')
  }
}

function mark(
  text,
  keyword,
  tplFn,
  /* istanbul ignore next */
  exact
) {
  if ( tplFn === void 0 ) tplFn = function (match) { return ("<mark>" + match + "</mark>"); };
  if ( exact === void 0 ) exact = false;

  var keywordReg = genKeywordRegExp(keyword, exact);
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
  var keywordReg = genKeywordRegExp(keyword);
  return !!keywordReg && keywordReg.test(text)
}

function hasExactMatch(text, keyword) {
  var keywordReg = genKeywordRegExp(keyword, true);
  return !!keywordReg && keywordReg.test(text)
}

module.exports = {
  markMatch: markMatch,
  markExactMatch: markExactMatch,
  hasMatch: hasMatch,
  hasExactMatch: hasExactMatch
};
