const request = require('supertest');
const app = require('../app');

describe('Express App', () => {
  describe('GET /', () => {
    test('should return the sample message', async () => {
      const response = await request(app).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('No API at this endpoint, please try hitting http://{host}:{port}/romannumeral?number={number}!');
    });
  });

  describe('GET /romannumeral (Integration with RomanCalcService)', () => {
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

    test('should correctly convert a valid number to Roman numeral', async () => {
      const response = await request(app).get('/romannumeral?number=10');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ input: 10, output: 'X' });
    });

    test('should return "Invalid number" for out-of-range numbers (e.g., 0)', async () => {
      const response = await request(app).get('/romannumeral?number=0');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ input: 0, output: 'Invalid number' });
    });

    test('should return "Invalid number" for out-of-range numbers (e.g., 4000)', async () => {
      const response = await request(app).get('/romannumeral?number=4000');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({ input: 4000, output: 'Invalid number' });
    });
  });

  describe('CORS', () => {
    test('should have CORS headers for allowed origin', async () => {
      const frontendOrigin = 'http://localhost:5173';
      const response = await request(app).get('/romannumeral?number=1').set('Origin', frontendOrigin);
      expect(response.headers['access-control-allow-origin']).toBe(frontendOrigin);
    });
  });
});