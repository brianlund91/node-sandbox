/* eslint-disable no-unused-vars */

// SANDBOX
// put anything here for testing/prototyping/whatever purposes

const asyncExamples = require('./src/asyncExamples');
const pathExamples = require('./src/pathExamples');
const jsonExamples = require('./src/jsonExamples');
const objectExamples = require('./src/objectExamples');
const arrayExamples = require('./src/arrayExamples');
const errorExamples = require('./src/errorExamples');
const regexExamples = require('./src/regexExamples');
const requestExamples = require('./src/requestExamples');
const configExamples = require('./src/configExamples');
const stringExamples = require('./src/stringExamples');

console.log('=== Welcome to Brian\'s Sandbox! ===');

// async sandbox
// asyncExamples.timeoutPromise();
// asyncExamples.promiseRejectTest();
// asyncExamples.promiseRejectNoHandlerTest();
// asyncExamples.promiseErrorInHandlerTest();
// asyncExamples.callbackExample();
// asyncExamples.awaitExample();
// asyncExamples.awaitExample(false);
// asyncExamples.awaitUnhandledPromiseRejectionExample();
// asyncExamples.promiseHandlingExample();
// asyncExamples.promiseHandlingExample(false);
// asyncExamples.awaitUnhandledPromiseRejectionExample();
// asyncExamples.pollingWithTimeoutExample();
// asyncExamples.pollingWithWaitForHelperExample();
// asyncExamples.testPromiseTimeout();

// path sandbox
// pathExamples.pathExample();

// json sandbox
// jsonExamples.jsonParse();

// object sandbox
// objectExamples.printAllAttributes();
// objectExamples.printUndefinedPropeties();
// objectExamples.printTeamMemberNames();
// objectExamples.printOwnPropertyNames();

// array sandbox
// arrayExamples.isArrayTest();

// error sandbox
// errorExamples.errorPropertiesTest();
// errorExamples.stackTraceTest();
// errorExamples.finallyTest();

// regex sandbox
// regexExamples.testRegex();

// request sandbox
// requestExamples.getRequest();

// config sandbox
// configExamples.configTest();

// string sandbox
// stringExamples.runAllTests();


console.log('=== Execution complete, now leaving sandbox ===');
