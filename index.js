var tty = require('tty')
  , keypress = require('keypress')

function prompt (message, hideInput, cb) {
  if (typeof hideInput === 'function') {
    cb = hideInput;
    hideInput = false;
  }

  keypress(process.stdin);

  function setRawMode(mode) {
    if (process.stdin.setRawMode) {
      process.stdin.setRawMode(mode);
    }
  }
  if (hideInput) setRawMode(true);

  process.stdout.write(message);

  var line = '';
  process.stdin.on('keypress', function (c, key) {
    if (key) {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
      else if (key.name === 'return' || key.name === 'enter') {
        process.stdin.removeAllListeners('keypress');
        process.stdin.pause();
        if (hideInput) {
          setRawMode(false);
          console.log();
        }
        cb(line, function () {}); // for backwards-compatibility, fake end() callback
        return;
      }
      if (key.name === 'backspace') line = line.slice(0, -1);
    }
    if (key && key.name !== 'backspace') line += c;
  }).resume();
}
module.exports = prompt;

function password (message, cb) {
  prompt(message, true, function (val) {
    // password is required
    if (!val.length) password(message, cb);
    else cb(val, function () {}); // for backwards-compatibility, fake end() callback
  });
}
module.exports.password = password;
