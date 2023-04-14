module.exports = {
    root: true,
    parserOptions: {
      ecmaVersion: 8 // depends on your version of nodejs
    },
    plugins: ["formatjs"],
    rules: {
      "formatjs/no-offset": "error"
    }
  };