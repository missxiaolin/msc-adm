module.exports = function () {
  const cdn = {
    externals: {
      vue: "Vue",
      vuex: "Vuex",
      "vue-router": "VueRouter",
      "element-ui": "ELEMENT",
      axios: "axios",
    },
    css: [
      {
        key: "elementui",
        url: "",
      },
    ],
    js: [
      {
        key: "elementui",
        url: "",
      },
    ],
  };

  return cdn;
};
