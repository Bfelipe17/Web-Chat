let expect = require('expect');
let {generateMessage} = require('./message');

describe('generateMessage', function() {
  it('should generate correct message object', function () {
    let from = 'Jen';
    let text = 'Some message';
    let message = generateMessage(from, text);

    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({from, text})
  });
});
