import buble from '@rollup/plugin-buble'
import { uglify } from 'rollup-plugin-uglify'

export default [
  {
    input: './src/index.js',
    output: {
      file: 'dist/mark-match.common.js',
      format: 'cjs'
    },
    plugins: [buble()]
  },
  {
    input: './src/index.js',
    output: {
      file: 'dist/mark-match.umd.js',
      format: 'umd',
      name: 'markMatch'
    },
    plugins: [buble(), uglify()]
  }
]
