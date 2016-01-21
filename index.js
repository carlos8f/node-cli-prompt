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
    else if (process.stdout.isTTY) {
      tty.setRawMode(mode);
    }
  }
  if (hideInput) setRawMode(true);

  process.stdout.write(message);

  function listen (c, key) {
    if (key) {
      if (key.ctrl && key.name === 'c') {
        process.exit();
      }
      else if (key.name === 'return'){
        if (hideInput == true){
          process.stdin.removeListener('keypress', listen);
          process.stdin.pause();
          setRawMode(false);
          console.log();
          cb(line, function () {}); // for backwards-compatibility, fake end() callback
        }
        return;
      } else if (key.name === 'enter' || key.sequence === '\r\n') {
        process.stdin.removeListener('keypress', listen);
        process.stdin.pause();
        if (hideInput) {
          setRawMode(false);
          console.log();
        }
        cb(line.trim(), function () {}); // for backwards-compatibility, fake end() callback
        return;
      }
      if (key.name === 'backspace') line = line.slice(0, -1);
    }
    if (!key || key.name !== 'backspace') line += c;
  }

  var line = '';
  process.stdin.on('keypress', listen).resume();
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

function multi (questions, cb) {
  var idx = 0, ret = {};
  (function ask () {
    var q = questions[idx++];
    if (typeof q === 'string') {
      q = {key: q};
    }
    function record (val) {
      function retry () {
        idx--;
        ask();
      }
      if (q.required && typeof q.default === 'undefined' && !val) return retry();
      if (!val && typeof q.default !== 'undefined') {
        val = def;
      }
      if (q.validate) {
        try {
           var ok = q.validate.call(ret, val);
        }
        catch (e) {
          console.log(e.message);
          return retry();
        }
        if (ok === false) return retry();
      }
      if (q.type === 'number') {
        val = Number(val);
        if (Number.isNaN(val)) return retry();
      }
      else if (q.type === 'boolean') val = val.match(/^(yes|ok|true|y)$/i) ? true : false;
      if (typeof q.key !== 'undefined') ret[q.key] = val;
      if (questions[idx]) ask();
      else cb(ret);
    }
    var label = (q.label || q.key) + ': ';
    if (q.default) {
      var def = (typeof q.default === 'function') ? val = q.default.call(ret) : q.default;
      label += '(' + def + ') ';
    }
    else if (q.type === 'boolean') {
      label += '(y/n) ';
      q.validate = function (val){
        if (!val.match(/^(yes|ok|true|y|no|false|n)$/i)) return false;
      };
    }
    prompt(label, q.type === 'password', record);
  })();
}
module.exports.multi = multi;
