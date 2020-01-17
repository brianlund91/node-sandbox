const request = require('request-promise');

function getRequest() {
  console.log('Enter getRequest()');
  // request('http://www.google.com')
  const resp = request('https://httpstat.us/500?sleep=10000');
  console.log('resp:', resp);
  resp
    .then((htmlString) => {
      console.log('htmlString:', htmlString);
    })
    .catch((err) => {
      console.error('Failed:', err);
      throw new Error(`Oh no: ${err}`);
    });
  console.log('Exit getRequest()');
}

module.exports = {
  getRequest,
};
