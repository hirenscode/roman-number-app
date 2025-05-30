const { logger, metrics } = require('../observability');
const cache = new Map(); // Define cache at module scope

function clearCache() {
  const previousSize = cache.size;
  cache.clear();
  metrics.cacheMetrics.size.set(0);
  logger.info('Cache cleared', { previousSize });
}

function updateCacheMetrics() {
  const hits = metrics.cacheMetrics.hits._count;
  const misses = metrics.cacheMetrics.misses._count;
  const total = hits + misses;
  const hitRatio = total > 0 ? hits / total : 0;
  
  metrics.cacheMetrics.size.set(cache.size);
  metrics.cacheMetrics.hitRatio.set(hitRatio);
}

function toRoman(inputNum) {
  // Log the input for debugging
  logger.debug('Converting number to Roman numeral', { input: inputNum });

  if (typeof inputNum !== 'number' || isNaN(inputNum) || inputNum < 1 || inputNum > 3999 || !Number.isInteger(inputNum)) {
    logger.warn('Invalid input for Roman conversion', { 
      input: inputNum,
      type: typeof inputNum,
      isNaN: isNaN(inputNum),
      isInteger: Number.isInteger(inputNum)
    });
    return 'Invalid number';
  }

  if (cache.has(inputNum)) {
    metrics.cacheMetrics.hits.inc();
    logger.debug('Cache hit for Roman conversion', { input: inputNum });
    updateCacheMetrics();
    return cache.get(inputNum);
  }

  metrics.cacheMetrics.misses.inc();
  logger.debug('Cache miss for Roman conversion', { input: inputNum });

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

  // ex1 inputNum is 425
  // 425 >= [outer for loop 1000,900,500] false -> 425 >= 400, true 
  //  symbol = 'CD', result = 'CD'
  //  [next iteration] 25 >= [outer for loop 500,400,100,90,50,40] false -> 25 >= 10, true
  //  symbol = 'X', result = 'CDX'
  //  [next iteration] 15 >= [outer for loop doesn't run, becase 15 is still greater than 10] -> 15 >= 10, true
  //  symbol = 'X', result = 'CDXX'
  //  [next iteration] 5 >= [outer for loop 10] false -> 5 >= 5, true
  //  symbol = 'V', result = 'CDXXV'
  // outer for loop runs till value is 1 and ends with result = 'CDXXV'
  let num = inputNum;
  let result = '';
  for (const [value, symbol] of romanMap) {
    while (num >= value) {
      result += symbol;
      num -= value;
    }
  }
  
  cache.set(inputNum, result);
  updateCacheMetrics();
  
  logger.debug('Cached new Roman conversion', { 
    input: inputNum, 
    result,
    cacheSize: cache.size 
  });
  
  return result;
}

module.exports = { toRoman, clearCache };
