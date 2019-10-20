describe('markMatch', () => {
  const { markMatch, markExactMatch } = require('./index.js')
  const testText = '1234567890'

  it('Empty keyword', () => {
    expect(markMatch(testText, '')).toEqual(testText)
  })

  it('Unmatch', () => {
    expect(markMatch(testText, 'a')).toEqual(testText)
  })

  it('Mark match', () => {
    expect(markMatch(testText, '3')).toEqual('12<mark>3</mark>4567890')
  })

  it('Split keyword', () => {
    expect(markMatch(testText, '3 6 9')).toEqual('12<mark>3</mark>45<mark>6</mark>78<mark>9</mark>0')
  })

  it('No split keyword', () => {
    expect(markExactMatch(testText, '3 6 9')).toEqual('1234567890')
    expect(markExactMatch('123 6 94578', '3 6 9')).toEqual('12<mark>3 6 9</mark>4578')
  })

  it('Template', () => {
    expect(
      markMatch(
        testText,
        '3',
        (match) => `<div class="keyword">${match}</div>`
      )
    ).toEqual('12<div class="keyword">3</div>4567890')
  })

  it('Special char', () => {
    const regChar = [
      '-', '[', ']', '{', '}', '(', ')', '*', '+',
      '?', '.', ',', '\\', '^', '$', '|', '#'
    ]
    const testText = regChar.join('')
    regChar.forEach(char => {
      expect(markMatch(testText, char)).toEqual(
        testText.replace(char, `<mark>${char}</mark>`)
      )
    })
  })
})
