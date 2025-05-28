const cache = new Map(); // Define cache at module scope

function clearCache() {
  cache.clear();
}

function toRoman(inputNum) {
  if (typeof inputNum !== 'number' || isNaN(inputNum) || inputNum < 1 || inputNum > 3999 || !Number.isInteger(inputNum)) {
    return 'Invalid number';
  }

  if (cache.has(inputNum)) return cache.get(inputNum);

  const romanMap = [
    [1000, 'M'],
    [900,  'CM'],
    [500,  'D'],
    [400,  'CD'],
    [100,  'C'],
    [90,   'XC'],
    [50,   'L'],
    [40,   'XL'],
    [10,   'X'],
    [9,    'IX'],
    [5,    'V'],
    [4,    'IV'],
    [1,    'I']
  ];

  let num = inputNum;
  let result = '';
  for (const [value, symbol] of romanMap) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  cache.set(inputNum, result);
  return result;
}


module.exports = { toRoman, clearCache };
