const db = require('../Db/Models/password');
function genPassword(long) {
  let characters =
      "Aa0BbCc1DdEe2FfGgHh3IiJj4KkLl5MmNn6OoPp7QqRr8SsTt9UuVv*WwXxYyZz$",
    pass = "",
    number;

  for (let i = 0; i < long; i++) {
    number = getNumber(0, characters.length);
    pass += characters.substring(number, number + 1);
  }

  return pass;
}

function getNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = genPassword;