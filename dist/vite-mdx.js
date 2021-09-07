"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Framework = void 0;
const mdx_1 = require("@mdx-js/mdx");
const pluginutils_1 = require("@rollup/pluginutils");
var Framework;
(function (Framework) {
    Framework["Vue3"] = "vue3";
    Framework["React"] = "react";
})(Framework = exports.Framework || (exports.Framework = {}));
const vue3DefaultRenderer = `
import {mdx} from 'vite-mdx/vue3'
`;
const reactDefaultRenderer = `
import React from 'react'
import {mdx} from '@mdx-js/react'
`;
const vue3DefaultPragma = `
/* @jsx mdx */
`;
const reactDefaultPragma = `
/* @jsxRuntime classic */
/* @jsx mdx */
/* @jsxFrag mdx.Fragment */
`;
const frameworkRendererPragmaMap = {
    vue3: {
        renderer: vue3DefaultRenderer,
        pragma: vue3DefaultPragma
    },
    react: {
        renderer: reactDefaultRenderer,
        pragma: reactDefaultPragma
    }
};
exports.default = (options = {}) => {
    const framework = options.framework || Framework.Vue3;
    if (framework !== Framework.React && framework !== Framework.Vue3)
        throw new Error('framework now only support `vue3` or `React`');
    return {
        name: 'vite-mdx',
        enforce: framework === Framework.React ? 'pre' : undefined,
        config() {
            return {
                esbuild: framework === Framework.React ? {
                    include: /\.(jsx|tsx|mdx)/,
                    loader: 'jsx'
                } : {}
            };
        },
        transform(code, id) {
            const { include = /\.mdx/, exclude, renderer: optionRenderer, pragma: optionPragma, } = options;
            const { renderer: defaultRenderer, pragma: defaultPragma } = frameworkRendererPragmaMap[framework];
            const renderer = optionRenderer || defaultRenderer;
            const pragma = optionPragma || defaultPragma;
            const filter = (0, pluginutils_1.createFilter)(include, exclude);
            if (!filter(id))
                return;
            const compiler = (0, mdx_1.createCompiler)();
            const result = compiler.processSync(code);
            return {
                code: `${renderer}${pragma}${result.contents}`
            };
        }
    };
};
//# sourceMappingURL=vite-mdx.js.map