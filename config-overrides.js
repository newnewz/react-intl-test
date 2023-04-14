const {override, addBabelPlugins, addBabelPreset} = require('customize-cra')

module.exports = override(
  addBabelPreset('@babel/preset-react'),
  addBabelPlugins(
    'babel-plugin-formatjs',
  ),
)