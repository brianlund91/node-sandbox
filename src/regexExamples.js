function testRegex() {
  const testString = "Brian Lund";
  const regexString = "";
  const isMatch = testString.match(new RegExp(regexString));
  console.log('isMatch: ', isMatch);
}

module.exports = {
  testRegex,
}
