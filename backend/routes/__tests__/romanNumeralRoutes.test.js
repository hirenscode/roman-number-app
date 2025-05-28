const request = require('supertest');
const express = require('express');
const romanNumeralRoutes = require('../romanNumeralRoutes');
const { toRoman } = require('../../services/RomanCalcService');

// Mock the RomanCalcService
jest.mock('../../services/RomanCalcService');

const app = express();
app.use(express.json());
app.use('/romannumeral', romanNumeralRoutes);

describe('Roman Numeral Routes', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  describe('GET /romannumeral', () => {
    test('should return 400 if "number" query parameter is missing', async () => {
      const response = await request(app).get('/romannumeral');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Missing query parameter: number' });
    });

    test('should return 400 if "number" query parameter is not a number', async () => {
      const response = await request(app).get('/romannumeral?number=abc');
      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: 'Query parameter "number" must be a number' });
    });

    test('should call toRoman service and return its result for a valid number', async () => {
      toRoman.mockReturnValue('X'); 

      const response = await request(app).get('/romannumeral?number=10');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ input: 10, output: 'X' });
      expect(toRoman).toHaveBeenCalledTimes(1);
      expect(toRoman).toHaveBeenCalledWith(10);
    });

    test('should handle "Invalid number" string from toRoman service', async () => {
      toRoman.mockReturnValue('Invalid number');

      const response = await request(app).get('/romannumeral?number=0');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ input: 0, output: 'Invalid number' });
      expect(toRoman).toHaveBeenCalledTimes(1);
      expect(toRoman).toHaveBeenCalledWith(0);
    });

     test('should handle large valid numbers correctly', async () => {
      toRoman.mockReturnValue('MMMCMXCIX');
      const response = await request(app).get('/romannumeral?number=3999');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ input: 3999, output: 'MMMCMXCIX' });
      expect(toRoman).toHaveBeenCalledWith(3999);
    });
  });
});