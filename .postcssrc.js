/*
Postcss配置文件
  */
module.exports = {
  plugins: {
    //VueCli已经配置了这个选项，这里不用重复配置
    // autoprefixer: {
    //   browsers: ['Android >= 4.0', 'iOS >= 8'],
    // },
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
    },
  },
}
