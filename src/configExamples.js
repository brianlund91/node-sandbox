process.env.NODE_CONFIG_DIR = __dirname;

const config = require('config');

function configTest() {
  console.log('config:', config);
  console.log('config.has(\'a\'):', config.has('a'));
}

module.exports = {
  configTest,
};
