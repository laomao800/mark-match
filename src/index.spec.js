const { markMatch, markExactMatch, hasMatch, hasExactMatch } = require('./index.js')
const testText = '1234567890'

describe('markMatch', () => {
  it('Unmatch', () => {
    expect(markMatch(testText, 'a')).toBe(testText)
  })

  it('Mark match', () => {
    expect(markMatch(testText, '3')).toBe('12<mark>3</mark>4567890')
  })

  it('Split keyword', () => {
    expect(markMatch(testText, '3 6 9')).toBe('12<mark>3</mark>45<mark>6</mark>78<mark>9</mark>0')
  })

  it('No split keyword', () => {
    expect(markExactMatch(testText, '3 6 9')).toBe('1234567890')
    expect(markExactMatch('123 6 94578', '3 6 9')).toBe('12<mark>3 6 9</mark>4578')
  })

  it('Template', () => {
    expect(
      markMatch(
        testText,
        '3',
        (match) => `<div class="keyword">${match}</div>`
      )
    ).toBe('12<div class="keyword">3</div>4567890')
  })

  it('Special char', () => {
    const regChar = [
      '-', '[', ']', '{', '}', '(', ')', '*', '+',
      '?', '.', ',', '\\', '^', '$', '|', '#'
    ]
    const testText = regChar.join('')
    regChar.forEach(char => {
      expect(markMatch(testText, char)).toBe(
        testText.replace(char, `<mark>${char}</mark>`)
      )
    })
  })
})

describe('hasMatch', () => {
  it('Mark match', () => {
    expect(hasMatch(testText, '3')).toBe(true)
  })

  it('Split keyword', () => {
    expect(hasMatch(testText, '3 6 9')).toBe(true)
  })

  it('No split keyword', () => {
    expect(hasExactMatch('1234567890', '3 4 5')).toBe(false)
    expect(hasExactMatch('123 4 567890', '3 4 5')).toBe(true)
  })
})

describe('fallback', () => {
  it('Empty text', () => {
    expect(markMatch('', '')).toBe('')
    expect(markExactMatch('', '')).toBe('')
    expect(hasMatch('', '')).toBe(false)
    expect(hasExactMatch('', '')).toBe(false)
  })

  it('Null value', () => {
    expect(markMatch(null, '')).toBe(null)
    expect(markExactMatch(null, '')).toBe(null)
    expect(hasMatch(null, '')).toBe(false)
    expect(hasExactMatch(null, '')).toBe(false)
  })

  it('Empty keyword', () => {
    expect(markMatch(testText, '')).toBe(testText)
    expect(markExactMatch(testText, '')).toBe(testText)
    expect(hasMatch(testText, '')).toBe(false)
    expect(hasExactMatch(testText, '')).toBe(false)
  })
})
