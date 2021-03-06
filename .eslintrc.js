module.exports = {
  root: true,
  // env: {
  //   'vue/setup-compiler-macros': true
  // },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-components': 'off',
    // 单个单词的组件
    'no-unused-vars': 'off'
  }
}
