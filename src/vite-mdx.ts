import { createCompiler } from '@mdx-js/mdx'
import { createFilter } from '@rollup/pluginutils'

import type { Plugin } from 'vite'
import type { FilterPattern } from '@rollup/pluginutils'

export enum Framework {
  Vue3 = 'vue3',
  React = 'react',
}

interface Options {
  include?: FilterPattern
  exclude?: FilterPattern
  framework?: `${Framework}` | Framework | string
  renderer?: string
  pragma?: string
}

const vue3DefaultRenderer = `
import {mdx} from 'vite-mdx/vue3'
`
const reactDefaultRenderer = `
import React from 'react'
import {mdx} from '@mdx-js/react'
`

const vue3DefaultPragma = `
/* @jsx mdx */
`
const reactDefaultPragma = `
/* @jsxRuntime classic */
/* @jsx mdx */
/* @jsxFrag mdx.Fragment */
`

const frameworkRendererPragmaMap = {
  vue3: {
    renderer: vue3DefaultRenderer,
    pragma: vue3DefaultPragma
  },
  react: {
    renderer: reactDefaultRenderer,
    pragma: reactDefaultPragma
  }
}

export default (options: Options = {}): Plugin => {
  const framework = options.framework || Framework.Vue3

  if (framework !== Framework.React && framework !== Framework.Vue3) throw new Error('framework now only support `vue3` or `React`')

  return {
    name: 'vite-mdx',
    enforce: framework === Framework.React ? 'pre' : undefined,

    config () {
      return {
        esbuild: framework === Framework.React ? {
          include: /\.(jsx|tsx|mdx)/,
          loader: 'jsx'
        } : {}
      }
    },

    transform (code, id) {

      const {
        include = /\.mdx/,
        exclude,
        renderer: optionRenderer,
        pragma: optionPragma,
      } = options

      const { renderer: defaultRenderer, pragma: defaultPragma } = frameworkRendererPragmaMap[framework]
      const renderer = optionRenderer || defaultRenderer
      const pragma = optionPragma || defaultPragma

      const filter = createFilter(include, exclude)

      if (!filter(id)) return

      const compiler = createCompiler()

      const result = compiler.processSync(code)

      return {
        code: `${renderer}${pragma}${result.contents}`
      }
    }
  }
}
