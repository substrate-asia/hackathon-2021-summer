module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    // 不检查换行符，由 git 处理
    "linebreak-style": "off",
    // 只允许 for 循环中的自增自减
    "no-plusplus": [
      'error', {
        "allowForLoopAfterthoughts": true,
      },
    ],
  },
};
