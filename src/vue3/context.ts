import { defineComponent, computed, provide, inject } from 'vue'

import type { PropType, VNodeProps } from 'vue'

export const contextKey = '__MDX_PROVIDE_KEY__'

export const MDXProvide = defineComponent({
  name: 'MDXProvide',
  props: {
    components: {
      type: Object as PropType<Record<string, VNodeProps>>,
      required: true
    }
  },
  setup (props, { slots }) {

    const componentsRef = computed(() => props.components)

    provide(contextKey, componentsRef)

    return () => slots.default && slots.default()
  }
})


const defaultComponentsRef = computed(() => ({}))
export const useMDXComponents = (getPropsComponents: () => Record<string, VNodeProps>) => {
  const providedComponentsRef = inject(contextKey, defaultComponentsRef)

  const mergedComponentsRef = computed(() => ({
    ...providedComponentsRef.value,
    ...getPropsComponents()
  }))

  return mergedComponentsRef
}
