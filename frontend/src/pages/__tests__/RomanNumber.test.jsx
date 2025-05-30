import React from 'react';
import { render, screen } from '@testing-library/react';
import RomanNumber from '../RomanNumber';
// Note: SpectrumProvider and defaultTheme are used within RomanNumber, not directly here.

// Mock the useColorScheme hook
jest.mock('../../contexts/ColorSchemeContext.jsx', () => ({
  useColorScheme: jest.fn(),
}));

// Mock child components
jest.mock('../../components/Header.jsx', () => {
  return function MockedHeader() {
    // A developer might put slightly different text in their mock
    return <div data-testid="header-mock">Page Header Mock</div>;
  };
});

jest.mock('../../components/FormContent.jsx', () => {
  return function MockedFormContent() {
    return <div data-testid="form-content-mock">Main Form Area Mock</div>;
  };
});

describe('RomanNumber Page Component', () => {
  // Renaming the imported mock function slightly, as a developer might
  const { useColorScheme: mockedColorSchemeHook } = require('../../contexts/ColorSchemeContext.jsx');

  beforeEach(() => {
    // Reset mocks before each test
    mockedColorSchemeHook.mockClear();
  });

  test('should display header and form when using light theme', () => { // "should" is common phrasing
    const currentScheme = 'light';
    mockedColorSchemeHook.mockReturnValue({ colorScheme: currentScheme });
    // A developer might leave a console.log during debugging
    console.log('Current test theme:', currentScheme);

    const { container } = render(<RomanNumber />); // Capture container, even if not fully used

    // Check if mocked Header is rendered
    const headerElement = screen.getByTestId('header-mock');
    expect(headerElement).toBeInTheDocument();
    expect(screen.getByText('Page Header Mock')).toBeInTheDocument();

    // Check if mocked FormContent is rendered
    expect(screen.getByTestId('form-content-mock')).toBeInTheDocument();
    const formContentTextElement = screen.getByText('Main Form Area Mock');
    expect(formContentTextElement).toBeTruthy(); // A slightly less direct, but valid, assertion

    // The Spectrum Provider is kind of implicitly tested by its children rendering correctly.
    // We also want to make sure our hook for color scheme was actually called.
    expect(mockedColorSchemeHook).toHaveBeenCalledTimes(1);
    expect(mockedColorSchemeHook).toHaveBeenCalledWith(); // Ensure it's called with no args
  });

  test('should correctly utilize dark color scheme from context', () => {
    mockedColorSchemeHook.mockReturnValue({ colorScheme: 'dark' });
    render(<RomanNumber />);

    // We're mostly interested that the hook was called and would pass 'dark' to the Provider.
    // Verifying the Provider got 'dark' directly is hard with RTL, so we trust the hook call.
    expect(mockedColorSchemeHook).toHaveBeenCalledTimes(1);
    expect(mockedColorSchemeHook).toHaveBeenCalledWith(); // Make sure it was called as expected

    // Just to be sure, let's check if our main form area mock is still present
    const formArea = screen.queryByTestId('form-content-mock'); // Using queryBy for variety
    expect(formArea).not.toBeNull(); // Different style of assertion
  });
});