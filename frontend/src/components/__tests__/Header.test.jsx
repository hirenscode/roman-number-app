import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // For more realistic interactions
import Header from '../Header';

// Let's mock our custom hook
jest.mock('../../contexts/ColorSchemeContext.jsx', () => ({
  useColorScheme: jest.fn(),
}));

describe('Header Component', () => {
  // We'll need a reference to the mocked hook
  const { useColorScheme: mockedUseColorScheme } = require('../../contexts/ColorSchemeContext.jsx');
  let mockToggleColorScheme;

  beforeEach(() => {
    // Reset the mock before each test run
    mockToggleColorScheme = jest.fn(); // This will be our toggle function
    mockedUseColorScheme.mockClear();
  });

  test('button should show "Dark" when theme is light, and toggle theme on click', async () => {
    const user = userEvent.setup();
    mockedUseColorScheme.mockReturnValue({
      colorScheme: 'light', // Start with light theme
      toggleColorScheme: mockToggleColorScheme,
    });

    render(<Header />);

    const themeButton = screen.getByRole('button', { name: 'Dark' });
    expect(themeButton).toBeInTheDocument(); // Check if button with 'Dark' text is there

    await user.click(themeButton); // Simulate a user click
    expect(mockToggleColorScheme).toHaveBeenCalledTimes(1); // Did our function get called?
  });

  test('button should show "Light" when theme is dark', () => {
    mockedUseColorScheme.mockReturnValue({
      colorScheme: 'dark', // Start with dark theme
      toggleColorScheme: mockToggleColorScheme,
    });

    render(<Header />);
    expect(screen.getByRole('button', { name: 'Light' })).toBeInTheDocument();
  });
});