const _ = require('lodash');

const myObject = {
  name: 'Brian',
  age: 27,
  hobbies: [
    'basketball',
    'video games',
  ],
  college: {
    name: 'CSU',
    location: 'Fort Collins',
  },
  employed: true,
};

const brian = { name: 'Brian', age: 27 };
const mim = { name: 'Mim', age: 25 };
const chris = { name: 'Chris', age: 37 };
const team = [brian, mim, chris];

function printAllAttributes() {
  console.log('Enter printAllAttributes()');
  // this will print myObject: [object Object], not ideal
  // console.log(`myObject: ${myObject}`);

  // this is better
  // console.log('myObject: ', myObject);

  // these have the same issue as above, just printing Object
  // console.log('myObject: %s (type=%s)', myObject, typeof myObject);
  // console.log(`myObject: ${myObject} (type=${typeof myObject})`);
  // this works
  // console.log('myObject: ', myObject, '(type=', typeof myObject, ')');

  // prints in JSON format, includes nested objects and arrays
  // console.log(JSON.stringify(myObject));

  // JSON pretty print
  console.log(JSON.stringify(myObject, null, 4));

  // ECMAScript 5
  // for (let key in myObject) {
  //   // check if the property/key is defined in the object itself, not in parent
  //   if (myObject.hasOwnProperty(key)) {
  //     console.log(key, myObject[key]);
  //   }
  // }

  // ECMAScript 2017
  // for (const [key, value] of Object.entries(myObject)) {
  //   console.log(key, value);
  // }
  console.log('Exit printAllAttributes()');
}

function printTeamMemberNames() {
  const teamMemberNames = team.map((member) => member.name);
  console.log('teamMemberNames: ', teamMemberNames);
}

function printOwnPropertyNames() {
  console.log(Object.getOwnPropertyNames(myObject));
}

function printUndefinedPropeties() {
  console.log(myObject.name); // Brian
  console.log(myObject.nonsense); // undefined
  console.log(myObject.college.major); // undefined
  // console.log(myObject.nonsense.bogus); // TypeError: Cannot read property 'bogus' of undefined
  console.log(_.get(myObject, 'nonsense.bogus', 'default')); // default
  console.log(myObject && myObject.college ? myObject.college.major : 'default'); // undefined
  console.log(myObject && myObject.college && myObject.college.major ? myObject.college.major : 'default'); // default
  console.log(myObject && myObject.nonsense ? myObject.nonsense.bogus : 'default'); // default
  console.log(myObject && myObject.nonsense && myObject.nonsense.bogus ? myObject.nonsense.bogus : 'default'); // default
  console.log(((myObject || {}).college || {}).major); // undefined
  console.log(((myObject || {}).nonsense || {}).bogus); // undefined
}

module.exports = {
  printAllAttributes,
  printTeamMemberNames,
  printOwnPropertyNames,
  printUndefinedPropeties,
};
