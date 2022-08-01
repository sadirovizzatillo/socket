module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData:
          ' @import "@/assets/styles/stylesheet.scss"; @import "@/assets/styles/variables.scss"; @import "@/assets/styles/w-global.scss"; ',
      },
    },
  },
  chainWebpack: (config) => {
    config.module.rules.delete("eslint");
  },
  publicPath: "/",
  devServer: {
    https: false,
    port: 8000,
  },
};
