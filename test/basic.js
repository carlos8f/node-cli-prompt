describe('basic test', function () {
  var proc;

  before(function () {
    proc = spawn('node', [resolve(__dirname, '../examples/name.js')]);
  });

  it('prompts', function (done) {
    proc.stdout.once('data', function (chunk) {
      assert.equal(chunk.toString(), 'enter your first name: ');
      done();
    });
  });

  it('accepts first name', function (done) {
    proc.stdout.once('data', function (chunk) {
      assert.equal(chunk.toString(), 'and your last name: ');
      done();
    });
    proc.stdin.write('carlos\n');
  });

  it('accepts last name', function (done) {
    proc.once('close', function (code) {
      done(code !== 0 && new Error('closed with code ' + code) || null);
    });
    proc.stdout.once('data', function (chunk) {
      assert.equal(chunk.toString(), 'hi, carlos rodriguez!\n');
    });
    proc.stdin.write('rodriguez\n');
  });
});