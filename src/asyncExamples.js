const pWaitFor = require('p-wait-for');

function returnDelayedPromise(success = true, sleep = 1000) {
  console.log(`Enter returnDelayedPromise(${success}, ${sleep})`);
  // simple resolved promise with delay:
  // new Promise(resolve => setTimeout(() => resolve(stuff), 1000)
  // OR
  // new Promise(resolve => setTimeout(resolve, 10))
  return new Promise(((resolve, reject) => {
    // resolve after a timeout of 1 second
    setTimeout(() => {
      console.log(`Exit returnDelayedPromise(${success}, ${sleep})`);
      if (success) resolve();
      else reject(new Error('Rejected Promise'));
    }, sleep);
  }));
}

function waitOneSecondCallback(callback) {
  console.log('Enter waitOneSecondCallback()');
  // callback after a timeout of 1 second
  setTimeout(() => {
    console.log('Exit waitOneSecondCallback()');
    callback();
  }, 1000);
}

function callbackExample() {
  console.log('Enter callbackExample()');
  waitOneSecondCallback(() => console.log('callbackExample: Woohoo'));
  console.log('Exit callbackExample()');
}

function promiseHandlingExample(success = true) {
  console.log('Enter promiseHandlingExample()');
  returnDelayedPromise(success)
    .then(() => console.log('promiseHandlingExample: Success!'))
    .catch((err) => console.log('promiseHandlingExample: Something went wrong: ', err));
  console.log('Exit promiseHandlingExample()');
}

async function awaitExample(success = true) {
  console.log(`Enter awaitExample(${success})`);
  try {
    await returnDelayedPromise(success);
    console.log('awaitExample: Yay!');
  } catch (err) {
    console.log('awaitExample: Bad news ', err);
  }
  console.log(`Exit awaitExample(${success})`);
}

async function awaitUnhandledPromiseRejectionExample() {
  console.log('Enter awaitUnhandledPromiseRejectionExample()');
  await returnDelayedPromise(false);
  console.log('Exit awaitUnhandledPromiseRejectionExample()');
}

function timeoutPromise() {
  console.log('Before timeout');
  new Promise(((resolve, reject) => {
    // resolve after a timeout of 1 second
    setTimeout(() => resolve(1), 1000);
  })).then((result) => {
    console.log('After timeout');
  });

  console.log('Next operation');
}

function promiseRejectTest() {
  console.log('Enter promiseRejectTest()');
  Promise.reject('error')
    .then(() => {
      console.log('Success');
    }).catch((error) => {
      console.log('Error: ', error);
    });
  console.log('Exit promiseRejectTest()');
}

function promiseRejectNoHandlerTest() {
  console.log('Enter promiseRejectNoHandlerTest()');
  Promise.reject('error')
    .then(() => {
      console.log('Success');
    });
  // expect UnhandledPromiseRejectionWarning
  console.log('Exit promiseRejectNoHandlerTest()');
}

function promiseErrorInHandlerTest() {
  console.log('Enter promiseErrorInHandlerTest()');
  Promise.resolve()
    .then(() => {
      // force error
      throw new Error('oh no');
    }).catch((error) => {
      // expect error to be caught here
      console.log('Error handled in .catch: ', error);
    });
  console.log('Exit promiseErrorInHandlerTest()');
}

function promiseChainExample() {
  return returnDelayedPromise().then(() => true);
}

async function awaitPromiseChainExample() {
  const result = await promiseChainExample();
  console.log('result:', result);
}

function pollingWithIntervalExample() {
  // NOTE: setInterval can get messy if the time it takes
  // an async function to complete is > the interval
  // because the function will be started again before completing
  console.log('Enter pollingWithIntervalExample()');
  // varying sleepTimes, simulating unpredictible response times from async functions
  const waitTimes = [1000, 10000, 100, 4000, 500];
  const maxRetries = waitTimes.length;
  let retryCount = 0;
  const intervalId = setInterval(async () => {
    const sleep = waitTimes[retryCount];
    console.log(`Start interval function (retryCount=${retryCount}, sleep=${sleep})`);
    if (retryCount >= maxRetries) {
      // terminate interval if max retries reached
      console.log(`Max retries (${maxRetries}) reached`);
      clearInterval(intervalId);
      return;
    }
    retryCount++;
    await returnDelayedPromise(true, sleep);
    console.log(`End interval function (retryCount=${retryCount}, sleep=${sleep})`);
  }, 3000);
  console.log('Exit pollingWithIntervalExample()');
}

async function pollingWithTimeoutExample() {
  // NOTE: the timeout method of polling waits for the function
  // to complete before sleeping, cuasing the interval to be
  // greater than expected, but ensuring completion
  // TODO: make this await-able? (wrap in Promise?)
  console.log('Enter pollingWithTimeoutExample()');
  // varying sleepTimes, simulating unpredictible response times from async functions
  const waitTimes = [1000, 10000, 100, 4000, 500];
  const maxRetries = waitTimes.length - 1;
  let retryCount = 0;
  const check = async () => {
    const sleep = waitTimes[retryCount];
    console.log(`Start timeout function (retryCount=${retryCount}, sleep=${sleep})`);
    await returnDelayedPromise(true, sleep);
    if (retryCount >= maxRetries) {
      // terminate if max retries reached
      console.log(`Max retries (${maxRetries}) reached`);
      return;
    }
    retryCount++;
    console.log(`End timeout function (retryCount=${retryCount}, sleep=${sleep})`);
    console.log('wait 3 seconds before trying again...');
    setTimeout(check, 3000);
  };
  check();
  console.log('Exit pollingWithTimeoutExample()');
}

async function pollingWithWaitForHelperExample() {
  // NOTE: the p-wait-for function gives us an optional
  // interval and timeout, all wrapped in a promise
  console.log('Enter pollingWithWaitForHelperExample()');
  // varying sleepTimes, simulating unpredictible response times from async functions
  const waitTimes = [1000, 10000, 100, 4000, 500];
  const maxRetries = waitTimes.length - 1;
  let retryCount = 0;
  await pWaitFor(async () => {
    const sleep = waitTimes[retryCount];
    console.log(`Start pWaitFor function (retryCount=${retryCount}, sleep=${sleep})`);
    await returnDelayedPromise(true, sleep);
    if (retryCount >= maxRetries) {
      // terminate if max retries reached (by returning true)
      console.log(`Max retries (${maxRetries}) reached`);
      return true;
    }
    retryCount++;
    console.log(`End pWaitFor function (retryCount=${retryCount}, sleep=${sleep})`);
    console.log('wait 3 seconds before trying again...');
    return false; // continue
  // }, { interval: 3000 });
  }, { interval: 3000, timeout: 10000 }); // optional timeout
  console.log('Exit pollingWithWaitForHelperExample()');
}

/**
 * wraps a promise in a timeout, allowing the promise to reject if not resolve with a specific period of time
 * @param {integer} ms - milliseconds to wait before rejecting promise if not resolved
 * @param {Promise} promise to monitor
 * @Example
 *  promiseTimeout(1000, fetch('https://courseof.life/johndoherty.json'))
 *      .then(function(cvData){
 *          alert(cvData);
 *      })
 *      .catch(function(){
 *          alert('request either failed or timedout');
 *      });
 */
function promiseTimeout(ms, promise) {
  return new Promise(((resolve, reject) => {
    // create a timeout to reject promise if not resolved
    const timer = setTimeout(() => {
      reject(new Error('promise timeout'));
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  }));
}

async function testPromiseTimeout() {
  const promise = returnDelayedPromise(true, 2000);
  try {
    await promiseTimeout(1000, promise);
    console.log('Promise completed before timeout!');
  } catch (error) {
    console.log('Promise timed out!');
  }
}

module.exports = {
  waitOneSecondPromise: returnDelayedPromise,
  waitOneSecondCallback,
  callbackExample,
  promiseHandlingExample,
  awaitExample,
  awaitUnhandledPromiseRejectionExample,
  timeoutPromise,
  promiseRejectTest,
  promiseRejectNoHandlerTest,
  promiseErrorInHandlerTest,
  pollingWithIntervalExample,
  pollingWithTimeoutExample,
  pollingWithWaitForHelperExample,
  promiseTimeout,
  testPromiseTimeout,
};
