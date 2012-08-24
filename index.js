function prompt (message, cb) {
  process.stdout.write(message);
  var line = '';
  process.stdin.on('data', function fn (buf) {
    if (buf[0] === 0x03) process.exit();

    line += buf;

    function findBreak () {
      var idx = line.indexOf('\n');
      if (idx >= 0) return idx;
      return line.indexOf('\r');
    }
    
    var idx;
    while ((idx = findBreak()) >= 0) {
      process.stdin.removeListener('data', fn);
      return cb(line.slice(0, idx), function end () {
        process.stdin.pause();
      });
    }
  });
  process.stdin.resume();
}
module.exports = prompt;