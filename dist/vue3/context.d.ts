import type { PropType, VNodeProps } from 'vue';
export declare const contextKey = "__MDX_PROVIDE_KEY__";
export declare const MDXProvide: import("vue").DefineComponent<{
    components: {
        type: PropType<Record<string, VNodeProps>>;
        required: true;
    };
}, () => import("vue").VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, Record<string, any>, string, VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<{
    components?: unknown;
} & {
    components: Record<string, VNodeProps>;
} & {}>, {}>;
export declare const useMDXComponents: (getPropsComponents: () => Record<string, VNodeProps>) => import("vue").ComputedRef<{}>;
