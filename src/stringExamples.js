function splitStringAfterWord(phrase, splitter) {
  console.log(`splitStringAfterWord(phrase=${phrase}, splitter=${splitter})`);
  if (!phrase.includes(splitter)) {
    console.warn(`${splitter} not found in phrase: ${phrase}`);
    return;
  }
  const index = phrase.indexOf(splitter) + splitter.length;
  const part1 = phrase.substring(0, index);
  console.log('part1:', part1);
  const part2 = phrase.substring(index);
  console.log('part2:', part2);
  return [part1, part2];
}

function splitStringAfterWordTest1() {
  const phrase = 'I like to eat mint ice cream';
  const splitter = 'mint';
  splitStringAfterWord(phrase, splitter);
}

function splitStringAfterWordTest2() {
  // splitter not found case
  const phrase = 'I like to eat mint ice cream';
  const splitter = 'vanilla';
  splitStringAfterWord(phrase, splitter);
}

function splitStringAfterWordTest3() {
  // multiple lines case
  const phrase = 'I like\n to eat mint\n ice cream';
  const splitter = 'mint';
  splitStringAfterWord(phrase, splitter);
}

function splitStringAfterWordTest4() {
  // splitter appears multiple time in phrase
  const phrase = 'I like to eat mint (really minty) ice cream';
  const splitter = 'mint';
  splitStringAfterWord(phrase, splitter);
}

function runAllTests() {
  splitStringAfterWordTest1();
  splitStringAfterWordTest2();
  splitStringAfterWordTest3();
  splitStringAfterWordTest4();
}

module.exports = {
  splitStringOnWord: splitStringAfterWord,
  runAllTests,
};
