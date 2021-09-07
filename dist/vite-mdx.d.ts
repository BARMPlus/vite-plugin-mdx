import type { Plugin } from 'vite';
import type { FilterPattern } from '@rollup/pluginutils';
export declare enum Framework {
    Vue3 = "vue3",
    React = "react"
}
interface Options {
    include?: FilterPattern;
    exclude?: FilterPattern;
    framework?: `${Framework}` | Framework | string;
    renderer?: string;
    pragma?: string;
}
declare const _default: (options?: Options) => Plugin;
export default _default;
