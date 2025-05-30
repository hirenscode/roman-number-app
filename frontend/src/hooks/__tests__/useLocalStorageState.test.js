import { renderHook, act } from '@testing-library/react';
import useLocalStorageState from '../useLocalStorageState';

describe('useLocalStorageState Hook', () => {
  const TEST_KEY = 'testKey';
  const DEFAULT_VALUE = 'defaultValue';
  const NEW_VALUE = 'newValue';

  let getItemSpy;
  let setItemSpy;

  beforeEach(() => {
    // Mock localStorage
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem');
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    // Clear localStorage before each test for isolation
    localStorage.clear();
  });

  afterEach(() => {
    // Restore original localStorage methods
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  test('should initialize with defaultValue if localStorage is empty', () => {
    getItemSpy.mockReturnValueOnce(null); // Simulate empty localStorage for this key

    const { result } = renderHook(() => useLocalStorageState(TEST_KEY, DEFAULT_VALUE));

    expect(result.current[0]).toBe(DEFAULT_VALUE);
    expect(getItemSpy).toHaveBeenCalledWith(TEST_KEY);
    // useEffect will also call setItem with the default value initially
    expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify(DEFAULT_VALUE));
  });

  test('should initialize with storedValue if localStorage has a value for the key', () => {
    const storedValue = { data: 'persisted data' };
    getItemSpy.mockReturnValueOnce(JSON.stringify(storedValue));

    const { result } = renderHook(() => useLocalStorageState(TEST_KEY, DEFAULT_VALUE));

    expect(result.current[0]).toEqual(storedValue);
    expect(getItemSpy).toHaveBeenCalledWith(TEST_KEY);
    // useEffect will also call setItem with the stored value initially
    expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify(storedValue));
  });

  test('should update state and localStorage when setValue is called', () => {
    getItemSpy.mockReturnValueOnce(null); // Start with empty localStorage

    const { result } = renderHook(() => useLocalStorageState(TEST_KEY, DEFAULT_VALUE));

    // Initial setItem call from useEffect
    expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify(DEFAULT_VALUE));
    setItemSpy.mockClear(); // Clear mock for the next assertion

    act(() => {
      result.current[1](NEW_VALUE);
    });

    expect(result.current[0]).toBe(NEW_VALUE);
    expect(setItemSpy).toHaveBeenCalledTimes(1);
    expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify(NEW_VALUE));
  });

  test('should handle functional updates for setValue', () => {
    const initialNumericValue = 10;
    getItemSpy.mockReturnValueOnce(JSON.stringify(initialNumericValue));

    const { result } = renderHook(() => useLocalStorageState(TEST_KEY, 0));

    expect(result.current[0]).toBe(initialNumericValue);
    setItemSpy.mockClear();

    act(() => {
      result.current[1]((prevValue) => prevValue + 5);
    });

    expect(result.current[0]).toBe(15);
    expect(setItemSpy).toHaveBeenCalledWith(TEST_KEY, JSON.stringify(15));
  });
});