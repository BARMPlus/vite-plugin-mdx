import { defineComponent } from 'vue'

import Demo from './Demo.mdx'

export default defineComponent({
  name: 'App',
  setup () {
    return () => (
      <div>
        <Demo />
      </div>
    )
  }
})
