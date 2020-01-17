function errorPropertiesTest() {
  console.log('Enter errorPropertiesTest()');
  const err = new Error('this is an error, obv');
  console.log('err:', err);
  console.log('err.message:', err.message);
  const obj = { error: err, msg: 'additional info' };
  console.log('obj:', obj);
  if (obj.hasOwnProperty('msg')) console.log(obj.msg);
  if (err.hasOwnProperty('msg')) console.log(err.msg);
  if (err.custom) console.log(1, err.custom);
  err.custom = 'custom error field';
  if (err.custom) console.log(2, err.custom);
  console.log('Enter errorPropertiesTest()');
}

function stackTraceTest() {
  try {
    throwError();
  } catch (err) {
    console.trace('In stackTraceTest catch block');
    console.log('err.stack:', err.stack);
    throw err;
  }
}

function finallyTest() {
  console.log('Enter finallyTest()');
  try {
    console.log('In finallyTest try block');
    throw new Error('1');
  } catch (err) {
    console.log('In finallyTest catch block');
    throw new Error('2');
  } finally {
    console.log('In finallyTest finally block');
  }
  console.log('Exit finallyTest()');
}

function throwError() {
  console.trace('in throwError');
  throw new Error('oops');
}

module.exports = {
  errorPropertiesTest,
  stackTraceTest,
  finallyTest,
};
