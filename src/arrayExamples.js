function isArrayTest() {
  const myArray = [1, 2, 3];
  const myObject = {'name': 'Brian'}

  // typeof is not good enough, type is object
  // console.log('myArray: ', myArray, '(type=', typeof myArray, ')');
  // console.log('myObject: ', myObject, '(type=', typeof myObject, ')');

  console.log('Array.isArray(myArray):', Array.isArray(myArray));
  console.log('Array.isArray(myObject):', Array.isArray(myObject));

  console.log('myArray instanceof Array: ', myArray instanceof Array);
  console.log('myObject instanceof Array: ', myObject instanceof Array);
}

module.exports = {
  isArrayTest,
}
