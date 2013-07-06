var prompt = require('../');

prompt('enter your first name: ', function (val) {
  var first = val;
  prompt('and your last name: ', function (val) {
    console.log('hi, ' + first + ' ' + val + '!');
  });
});
