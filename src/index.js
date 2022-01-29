//base32hex chars where array index equals value
const chars = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
];

let counter = 0; //within current milisecond
let lastTime = null; //last timestamp of UUID

/**
 * Generate locally ordered UUIDs
 * @public
 * @param {string} [prepend=""] - string to start ID with (UUID length becomes 32 + length of this string)
 * @returns {string} - UUID
 */
module.exports = function UUID(prepend) {
  let id = '';

  //Timestamp to 32 base
  let nowTime = new Date().getTime();

  /*
	Increment counter within single
	milisecond to preserve ordering
	*/
  if (nowTime === lastTime) {
    ++counter;
  } else {
    counter = 0;
    lastTime = nowTime;
  }

  //Convert counter to 32 radix and fix width to 5
  let counterStr = counter.toString(32);
  counterStr = '00000'.slice(counterStr.length) + counterStr;

  //Random number (radix 32)
  for (let i = 0; i < 18; ++i) {
    //Get random number between 0 and 32 (not including 32)
    let number = Math.floor(Math.random() * 32);
    id += chars[number];
  }

  id = [nowTime.toString(32), counterStr, id].join('');

  return prepend || '' + id;
};
