describe('multi', function () {
  it('works', function (done) {
    suppose('node', [resolve(__dirname, '../examples/multi.js')])
      .debug(fs.createWriteStream('/tmp/debug.txt')) //optional writeable output stream
      .on('username: (john_doe) ').respond('\n')
      .on('password (must be at least 5 characters): ').respond('asdfff\b\b\n')
      .on('password must be at least 5 characters long\npassword (must be at least 5 characters): ').respond('asdfff\n')
      .on('number of pets: (6) ').respond('eight\n')
      .on('number of pets: (6) ').respond('8\n')
      .on('is this ok?: (y/n) ').respond('okay\n')
      .on('is this ok?: (y/n) ').respond('yes\n')
      .on("{ username: 'john_doe', password: 'asdfff', pets: 8 }\n").respond('great')
      .error(assert.ifError)
      .end(function (code) {
        assert(!code);
        done();
      });
  });
});
