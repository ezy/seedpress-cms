function validateEmail(email) {
  let errorMessage = '';
  const regex = /\S+@\S+\.\S+/;
  const trimmedEmail = email.trim();

  if (trimmedEmail.length > 40) {
    errorMessage = '* Email is too long, please use shorter email address';
  }

  if (!regex.test(trimmedEmail) || trimmedEmail.length === 0) {
    errorMessage = '* Email must be in valid format';
  }

  return errorMessage;
}

function validatePassword(password) {

  const errorMessages = [];

  if (password.length > 50) {
    errorMessages.push('* Must be fewer than 50 chars');
  }

  if (password.length < 8) {
    errorMessages.push('* Must be longer than 7 chars');
  }

  return errorMessages;
}

function validateStringLength(content, limit) {
  let errorMessage = '';
  if (content.trim().length > limit) {
    errorMessage = `* Cannot be more than ${limit} characters`;
  } else if (content.trim().length <= 0) {
    errorMessage = '* Cannot be empty';
  } else {
    errorMessage = '';
  }
  return errorMessage;
}

module.exports = {
  validateEmail,
  validatePassword,
  validateStringLength
};
