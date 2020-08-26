import Vue from 'vue';

const stringToArray = s => {
    let splitString = s.split(',')
    let trimmedArray = splitString.map( t => t.trim())
    return trimmedArray
};

const stringToSlug = s => {
  const slug = s.toLowerCase().replace(/[^\w\u0621-\u064A\s]/gi, '').replace(/\s/g, '-')
  return slug
};

const generatePassword = s => {
  var length = Number.isInteger(s) ? s : 8,
  charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
  retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
};

Vue.filter('stringToArray', stringToArray)
Vue.filter('stringToSlug', stringToSlug)
Vue.filter('generatePassword', generatePassword)
