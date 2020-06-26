const fs = require('fs');
const toml = fs.readFileSync('./wrangler.toml', 'utf8');
const webpack = require('webpack');

function tomlValue(key){
  if(!key) return;

  const keyPattern = `${key} = `;

  return toml
      .match(new RegExp(`${keyPattern}(.*)`, `g`))
      .shift()
      .replace(new RegExp(`${keyPattern}`, `g`), ``)
      .replace(/\/\*\"/g, ``)
      .replace(/^\"/g, ``);
}

const TOML_ROUTE = tomlValue('route');

module.exports = {
  target: "webworker",
  entry: "./index.js",
  mode: "production",
  plugins: [
    new webpack.DefinePlugin( {
      "TOML_ROUTE": `"${TOML_ROUTE}"`
    })
  ]
}
