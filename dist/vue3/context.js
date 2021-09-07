"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useMDXComponents = exports.MDXProvide = exports.contextKey = void 0;
const vue_1 = require("vue");
exports.contextKey = '__MDX_PROVIDE_KEY__';
exports.MDXProvide = (0, vue_1.defineComponent)({
    name: 'MDXProvide',
    props: {
        components: {
            type: Object,
            required: true
        }
    },
    setup(props, { slots }) {
        const componentsRef = (0, vue_1.computed)(() => props.components);
        (0, vue_1.provide)(exports.contextKey, componentsRef);
        return () => slots.default && slots.default();
    }
});
const defaultComponentsRef = (0, vue_1.computed)(() => ({}));
const useMDXComponents = (getPropsComponents) => {
    const providedComponentsRef = (0, vue_1.inject)(exports.contextKey, defaultComponentsRef);
    const mergedComponentsRef = (0, vue_1.computed)(() => ({
        ...providedComponentsRef.value,
        ...getPropsComponents()
    }));
    return mergedComponentsRef;
};
exports.useMDXComponents = useMDXComponents;
//# sourceMappingURL=context.js.map