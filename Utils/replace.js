function replace(text, array) {
    let res = text;
    for (let i of array) {
      res = res.split(i).join('[CONTENT PRIVATE]');
    }
    return res;
  }
  module.exports = replace; 