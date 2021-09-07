"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vue_1 = require("vue");
const context_1 = require("./context");
const TYPE_PROP_NAME = 'mdxType';
const DEFAULTS = {
    inlineCode: 'code',
    wrapper: (props, { slots }) => (0, vue_1.createVNode)(vue_1.Fragment, {}, slots.default && slots.default())
};
const MDXCreateElement = (0, vue_1.defineComponent)({
    name: 'MDXCreateElement',
    props: {
        components: {
            type: Object,
            default: () => ({})
        },
        originalType: String,
        mdxType: String,
        parentName: String
    },
    setup(props, { slots }) {
        const componentsRef = (0, context_1.useMDXComponents)(() => props.components);
        return () => {
            const components = componentsRef.value;
            const { parentName, originalType, mdxType: type, ...etc } = props;
            const Component = components[`${parentName}.${type}`] ||
                components[type] ||
                DEFAULTS[type] ||
                originalType;
            return (0, vue_1.createVNode)(Component, { ...etc }, slots.default && slots.default());
        };
    }
});
function mdx(type, props, children, patchFlag, dynamicProps, isBlockNode) {
    let component = type;
    let newProps = props;
    const mdxType = props && props.mdxType;
    if (typeof type === 'string' || mdxType) {
        component = MDXCreateElement;
        newProps = {};
        for (let key in props) {
            if (Object.hasOwnProperty.call(props, key)) {
                newProps[key] = props[key];
            }
        }
        newProps.originalType = type;
        newProps[TYPE_PROP_NAME] = typeof type === 'string' ? type : mdxType;
    }
    return (0, vue_1.createVNode)(component, newProps, children, patchFlag, dynamicProps, isBlockNode);
}
exports.default = mdx;
//# sourceMappingURL=create-vnode.js.map