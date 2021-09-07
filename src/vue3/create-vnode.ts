import { createVNode, defineComponent, Fragment } from 'vue'

import { useMDXComponents } from './context'

import type { VNodeProps, PropType } from 'vue'

const TYPE_PROP_NAME = 'mdxType'

const DEFAULTS = {
  inlineCode: 'code',
  wrapper: (props, { slots }) => createVNode(Fragment, {}, slots.default && slots.default())
}

const MDXCreateElement = defineComponent({
  name: 'MDXCreateElement',
  props: {
    components: {
      type: Object as PropType<Record<string, VNodeProps>>,
      default: () => ({})
    },
    originalType: String,
    mdxType: String,
    parentName: String
  },
  setup (props, { slots }) {

    const componentsRef = useMDXComponents(() => props.components)
    return () => {
      const components = componentsRef.value
      const { parentName, originalType, mdxType: type, ...etc } = props

      const Component =
        components[`${parentName}.${type}`] ||
        components[type] ||
        DEFAULTS[type] ||
        originalType
      return createVNode(Component, { ...etc }, slots.default && slots.default())
    }
  }
})

export default function mdx (
  type: VNodeProps,
  props?: any,
  children?: unknown,
  patchFlag?: number,
  dynamicProps?: string[] | null,
  isBlockNode?: boolean
) {
  let component = type
  let newProps = props
  const mdxType = props && props.mdxType

  if (typeof type === 'string' || mdxType) {
    component = MDXCreateElement
    newProps = {}
    for (let key in props) {
      if (Object.hasOwnProperty.call(props, key)) {
        newProps[key] = props[key]
      }
    }
    newProps.originalType = type
    newProps[TYPE_PROP_NAME] = typeof type === 'string' ? type : mdxType
  }

  return createVNode(component, newProps, children, patchFlag, dynamicProps, isBlockNode)
}
