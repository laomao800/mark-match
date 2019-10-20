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

/** Mark match by split keyword by spaces */
declare const markMatch: markFn

/** Mark match by exact keyword include spaces */
declare const markExactMatch: markFn

export {
  markMatch,
  markExactMatch
}
