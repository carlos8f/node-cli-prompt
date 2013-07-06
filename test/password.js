describe('password', function () {
  it('works', function (done) {
    suppose('node', [resolve(__dirname, '../examples/password.js')])
      //.debug(fs.createWriteStream('/tmp/debug.txt')) //optional writeable output stream
      .on('tell me a secret: ').respond('earthworn\bm jim\n')
      .on('earthworm jim\n').respond('hey')
      .error(assert.ifError)
      .end(function (code) {
        assert(!code);
        done();
      });
  });
});
