describe('windows CRLF', function () {
  it('works', function (done) {
    suppose('node', [resolve(__dirname, '../examples/name.js')])
      .on('enter your first name: ').respond('carlos\r\n')
      .on('and your last name: ').respond('rodriguez\r\n')
      .on('hi, carlos rodriguez!\n').respond("'sup!")
      .error(assert.ifError)
      .end(function (code) {
        assert(!code);
        done();
      });
  });
});
