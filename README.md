# mark-match

[![Actions Status](https://github.com/laomao800/mark-match/workflows/package-ci/badge.svg)](https://github.com/laomao800/mark-match/actions)
[![codecov](https://codecov.io/gh/laomao800/mark-match/branch/master/graph/badge.svg)](https://codecov.io/gh/laomao800/mark-match)

## Usage

```js
import { markMatch, markExactMatch, hasMatch, hasExactMatch } from '@laomao800/mark-match'

// Normal match
markMatch('1234567890', '34') // -> '12<mark>34</mark>567890'

// Multiple keyword split by spaces
markMatch('1234567890', '3 6 9') // -> '12<mark>3</mark>45<mark>6</mark>78<mark>9</mark>0'

// Mark match by exact keyword include spaces
markExactMatch('1 2 3 4 5 6 7 8 9', '3 4 5') // -> '1 2 <mark>3 4 5</mark> 6 7 8 9'

// Custom match template
markMatch('1234567890', '34', match => `<span class="keyword">${match}</span>`)
markExactMatch('1234567890', '34', match => `<span class="keyword">${match}</span>`)
// -> '12<span class="keyword">34</span>567890'

// Works like `markMatch` & `markExactMatch` except is return boolean value
hasMatch('1234567890', '3 6 9') // true
hasExactMatch('1234567890', '3 6 9') // false
```
