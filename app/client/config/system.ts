System.config({
  baseURL: '/assets', defaultJSExtensions: true,

  map: {
    firebase: 'firebase-web.js'
  },

  meta: {
    'firebase': {
      format: 'cjs'
    },
  }
});
