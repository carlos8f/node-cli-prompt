describe('basic test', function () {
  it('works', function (done) {
    suppose('node', [resolve(__dirname, '../examples/name.js')])
      .when('enter your first name: ').respond('carliz\b\bos 8\n')
      .when('and your last name: ').respond('rodriguez\n')
      .when('hi, carlos 8 rodriguez!\n').respond("'sup!")
      .on('error', assert.ifError)
      .end(function (code) {
        assert(!code);
        done();
      });
  });
});
