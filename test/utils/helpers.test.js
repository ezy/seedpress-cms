const expect = require('chai').expect;
const helpers = require('../../server/utils/helpers');

describe('[Helpers] Unit Test - validateStringLength', () => {
  it('returns give error if input length > limit', () => {
    const error = helpers.validateStringLength('Hello World', 5);
    expect(error).to.equal('* Cannot be more than 5 characters');
  });

  it('returns error if input is empty', () => {
    const error = helpers.validateStringLength('', 5);
    expect(error).to.equal('* Cannot be empty');
  });

  it('returns empty string if there is no error', () => {
    const error = helpers.validateStringLength('Hello World!', 20);
    expect(error).to.equal('');
  });
});

describe('[Helpers] Unit Test - validatePassword', () => {
  it('returns error if length > 50 chars', () => {
    const password = 'Aas9df8sd9!@#sjsdlkfjdskfdsjfkldslkfjldkfjlkdsjflk dsjfkljdsklfjdsklfjlkdsfdsfddsdfsi4y34y0fhelkjvfsjf934otkshdlf9s8f0sdfsdfsdfuds0u230r9uwefdfssfdsfdsfsdf';
    const error = helpers.validatePassword(password);
    expect(error[0]).to.equal('* Must be fewer than 50 chars');
  });

  it('returns error if length < 8 chars', () => {
    const error = helpers.validatePassword('fd4%!D');
    expect(error[0]).to.equal('* Must be longer than 7 chars');
  });

});

describe('[Helpers] Unit Test - validateEmail', () => {
  it('returns error if it is longer than 40 chars', () => {
    const error = helpers.validateEmail('Asdfdfdsf4234234324324dsfjsdkflsdkfsdfskdfdsklfsd23434324234fdsfdsfsdf@cc.cc');
    expect(error).to.equal('* Email is too long, please use shorter email address');
  });

  it('returns no error if it is in correct foramt', () => {
    const error = helpers.validateEmail('fsdf.c.c');
    expect(error).to.equal('* Email must be in valid format');
  });
});
