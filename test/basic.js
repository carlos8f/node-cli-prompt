describe('basic test', function () {
  it('works', function (done) {
    suppose('node', [resolve(__dirname, '../examples/name.js')])
      .on('enter your first name: ').respond('carliz\b\bos\n')
      .on('and your last name: ').respond('rodriguez\n')
      .on('hi, carlos rodriguez!\n').respond("'sup!")
      .error(assert.ifError)
      .end(function (code) {
        assert(!code);
        done();
      });
  });
});
