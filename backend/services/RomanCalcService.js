function toRoman(num) {
  if (!+num || num < 1 || num > 3999) return 'Invalid number';
  const cache = new Map();
  if (cache.has(num)) return cache.get(num);

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

  let result = '';
  for (const [value, symbol] of romanMap) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  cache.set(num, result);
  return result;
}

module.exports = { toRoman };
