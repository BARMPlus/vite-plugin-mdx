# Vite Plugin MDX

## Getting Started

1. Install:
   ```
   npm install @barmplus/vite-plugin-mdx -D
   ```
   or
   ```
   yarn add @barmplus/vite-plugin-mdx -D
   ```


2. Add the plugin to your `vite.config.js`.

   ```js
   // vite.config.js

   import mdx from '@barmplus/vite-plugin-mdx'

   const options = {
       framework: 'react' // react or vue3 
   }
 
   export default {
     plugins: [mdx(options)]
   }
   ```

3. You can now write `.mdx` files.

   ```mdx-js
   // hello.mdx
   
   # Hello MDX & Vite

   This is a plugin of MDX for vite
   ```
   
   ```javascript
   // App.jsx
   
   import React from 'react'

   import Hello from './hello.mdx'

   function App() {
     return (
       <div className="App">
         <Hello/>
       </div>
     )
   }

   export default App

   ```
