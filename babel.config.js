module.exports = {
  presets: [
      //"babel-preset-expo",
      ["@babel/preset-env",
      {
        modules: false
      }
      ],
      "@babel/preset-react"

  ],
  plugins: [
    "@babel/transform-runtime",
    //"@babel/plugin-transform-runtime"
 // 'react-native-reanimated/plugin',
   /* "@babel/plugin-transform-runtime",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-typeof-symbol",*/
  ],
  env: {
    production: {
      only: ["src"],
      plugins: [
        [
          "transform-react-remove-prop-types",
          {
            removeImport: true
          }
        ],
        "@babel/plugin-transform-react-inline-elements",
        "@babel/plugin-transform-react-constant-elements"
      ]
    }
  }
};