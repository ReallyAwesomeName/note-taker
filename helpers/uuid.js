// NOTE: grabbed from 11-Express/01-Activities/17-Ins_POST-Fetch
// Immediately export a function that generates a string of random numbers and letters
module.exports = () =>
  Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
