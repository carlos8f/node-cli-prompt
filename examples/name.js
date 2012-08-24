var prompt = require('../');

prompt('enter your first name: ', function (val) {
  var first = val;
  prompt('and your last name: ', function (val, end) {
    console.log('hi, ' + first + ' ' + val + '!');
    end();
  });
});