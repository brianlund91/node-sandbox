const path = require('path');

function pathExample() {
  console.log('Enter pathExample()');
  console.log('process.cwd(): ', process.cwd()); // directory that this was run from (probably project root)
  console.log('__dirname: ', __dirname); // directory that contains this file
  const relativePath = '../../fakeFolder/file.txt';
  const absolutePath = path.resolve(relativePath);
  console.log('absolutePath: ', absolutePath);
  console.log('Exit pathExample()');
}

module.exports = {
  pathExample,
}
