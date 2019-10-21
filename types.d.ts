type markFn = (
  /** origin text */
  text: string,

  /** keyword */
  keyword: string,

  /**
   * default: (match: string) => `<mark>${match}<mark>`
   */
  templateFunction: (matchText: string) => string
) => string

type hasMatch = (
  /** origin text */
  text: string,

  /** keyword */
  keyword: string
) => boolean

/** Mark match by split keyword by spaces */
declare const markMatch: markFn

/** Mark match by exact keyword include spaces */
declare const markExactMatch: markFn

/** Return whether has match by split keyword by spaces */
declare const hasMatch: hasMatch

/** Return whether has match by exact keyword include spaces */
declare const hasExactMatch: hasMatch

export {
  markMatch,
  markExactMatch,
  hasMatch,
  hasExactMatch
}
