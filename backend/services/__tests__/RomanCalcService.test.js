const RomanCalcService = require('../RomanCalcService'); // Import the whole module
const { toRoman, clearCache } = RomanCalcService;

describe('RomanCalcService', () => { 

  beforeEach(() => {
    clearCache();
  });

  describe('toRoman', () => {
    test('should return "Invalid number" for numbers less than 1', () => {
      expect(toRoman(0)).toBe('Invalid number');
      expect(toRoman(-1)).toBe('Invalid number');
    });

    test('should return "Invalid number" for numbers greater than 3999', () => {
      expect(toRoman(4000)).toBe('Invalid number');
    });

    test('should return "Invalid number" for non-integer numbers', () => {
      expect(toRoman(3.14)).toBe('Invalid number');
    });

    test('should return "Invalid number" for non-numeric inputs', () => {
      expect(toRoman('abc')).toBe('Invalid number');
      expect(toRoman(null)).toBe('Invalid number');
      expect(toRoman(undefined)).toBe('Invalid number');
      expect(toRoman({})).toBe('Invalid number');
      expect(toRoman([])).toBe('Invalid number');
    });

    test('should correctly convert single symbol numbers', () => {
      expect(toRoman(1)).toBe('I');
      expect(toRoman(5)).toBe('V');
      expect(toRoman(10)).toBe('X');
      expect(toRoman(50)).toBe('L');
      expect(toRoman(100)).toBe('C');
      expect(toRoman(500)).toBe('D');
      expect(toRoman(1000)).toBe('M');
    });

    test('should correctly convert numbers with subtractive notation', () => {
      expect(toRoman(4)).toBe('IV');
      expect(toRoman(9)).toBe('IX');
      expect(toRoman(40)).toBe('XL');
      expect(toRoman(90)).toBe('XC');
      expect(toRoman(400)).toBe('CD');
      expect(toRoman(900)).toBe('CM');
    });

    test('should correctly convert complex numbers', () => {
      expect(toRoman(3)).toBe('III');
      expect(toRoman(58)).toBe('LVIII');
      expect(toRoman(1994)).toBe('MCMXCIV');
      expect(toRoman(3999)).toBe('MMMCMXCIX');
    });

    test('should use cache for repeated valid conversions (conceptual test)', () => {
      const mapGetSpy = jest.spyOn(Map.prototype, 'get');
      const mapSetSpy = jest.spyOn(Map.prototype, 'set');
      const mapHasSpy = jest.spyOn(Map.prototype, 'has');

      const number = 123;
      const expectedRoman = 'CXXIII';
      
      // First call - should compute and cache the number
      expect(toRoman(number)).toBe(expectedRoman);

      // Assertions for the first call (cache miss)
      expect(mapHasSpy).toHaveBeenCalledTimes(1);
      expect(mapHasSpy).toHaveBeenCalledWith(number);
      expect(mapGetSpy).not.toHaveBeenCalled(); 
      expect(mapSetSpy).toHaveBeenCalledTimes(1);
      expect(mapSetSpy).toHaveBeenCalledWith(number, expectedRoman);

      mapGetSpy.mockClear(); 
      mapSetSpy.mockClear();
      mapHasSpy.mockClear();
      
      // Second call - should ideally retrieve from cache
      expect(toRoman(number)).toBe(expectedRoman);
      
      // Assertions for the second call (cache hit)
      expect(mapHasSpy).toHaveBeenCalledTimes(1);
      expect(mapHasSpy).toHaveBeenCalledWith(number);
      expect(mapGetSpy).toHaveBeenCalledTimes(1);
      expect(mapGetSpy).toHaveBeenCalledWith(number);
      expect(mapGetSpy).toHaveReturnedWith(expectedRoman);
      expect(mapSetSpy).not.toHaveBeenCalled(); 

      // Restore original Map methods
      mapHasSpy.mockRestore();
      mapGetSpy.mockRestore();
      mapSetSpy.mockRestore();
    });
  });
});