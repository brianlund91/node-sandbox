const fs = require('fs');
const path = require('path');

function jsonParse() {
  console.log('Enter jsonParse()');
  // console.log('process.cwd(): ', process.cwd());
  // console.log('__dirname: ', __dirname);
  const fileName = path.join(__dirname, 'team.json');
  const filePath = path.resolve(fileName);
  console.log(`Read in JSON file: ${filePath}`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const teamList = JSON.parse(fileContent);
  for (teamMember of teamList) {
    // console.log('teamMember: ', teamMember);
    console.log('teamMember.name: ', teamMember.name);
    console.log('teamMember.age: ', teamMember.age);
  }
  console.log('Exit jsonParse()');
}

module.exports = {
  jsonParse,
};
