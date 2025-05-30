import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { Provider, defaultTheme } from '@adobe/react-spectrum';
import FormContent from '../FormContent';

// Mock the contexts and hooks
jest.mock('../../contexts/APIConfigContext', () => ({
    useAPIConfig: () => ({
        backendBaseUrl: 'http://test-api.com'
    }),
    APIConfigProvider: ({ children }) => children
}));

// Create a simple state management system
let mockState = {
    lastNumber: 1,
    lastRomanNumeral: 'I'
};

// Mock useLocalStorageState
jest.mock('../../hooks/useLocalStorageState', () => ({
    __esModule: true,
    default: jest.fn((key, initialValue) => {
        if (!(key in mockState)) {
            mockState[key] = initialValue;
        }
        return [mockState[key], (value) => {
            mockState[key] = value;
        }];
    })
}));

// Mock fetch
global.fetch = jest.fn();

describe('FormContent Component', () => {
    const mockBackendBaseUrl = 'http://test-api.com';

    const renderComponent = () => {
        return render(
            <Provider theme={defaultTheme}>
                <FormContent />
            </Provider>
        );
    };

    beforeEach(() => {
        // Reset all mocks and state before each test
        jest.clearAllMocks();
        mockState = {
            lastNumber: 1,
            lastRomanNumeral: 'I'
        };
    });

    test('validates number input and button state', async () => {
        const { rerender } = renderComponent();
        
        const numberInput = screen.getByLabelText('Enter a Number');
        const convertButton = screen.getByRole('button', { name: 'Convert to Roman Numeral' });

        // Test invalid number (0)
        await act(async () => {
            fireEvent.change(numberInput, { target: { value: '0' } });
            // Force a re-render to update validation state
            rerender(
                <Provider theme={defaultTheme}>
                    <FormContent />
                </Provider>
            );
        });

        // Wait for validation state to update
        await waitFor(() => {
            const wrapper = screen.getByLabelText('Enter a Number').closest('.zo2IKa_spectrum-Textfield');
            expect(wrapper).toHaveClass('zo2IKa_spectrum-Textfield--invalid');
            expect(convertButton).toHaveAttribute('disabled');
        });

        // Test invalid number (4000)
        await act(async () => {
            fireEvent.change(numberInput, { target: { value: '4000' } });
            // Force a re-render to update validation state
            rerender(
                <Provider theme={defaultTheme}>
                    <FormContent />
                </Provider>
            );
        });

        // Wait for validation state to update
        await waitFor(() => {
            const wrapper = screen.getByLabelText('Enter a Number').closest('.zo2IKa_spectrum-Textfield');
            expect(wrapper).toHaveClass('zo2IKa_spectrum-Textfield--invalid');
            expect(convertButton).toHaveAttribute('disabled');
        });

        // Test valid number (42)
        await act(async () => {
            fireEvent.change(numberInput, { target: { value: '42' } });
            // Force a re-render to update validation state
            rerender(
                <Provider theme={defaultTheme}>
                    <FormContent />
                </Provider>
            );
        });

        // Wait for validation state to update
        await waitFor(() => {
            const wrapper = screen.getByLabelText('Enter a Number').closest('.zo2IKa_spectrum-Textfield');
            expect(wrapper).toHaveClass('zo2IKa_spectrum-Textfield--valid');
            expect(convertButton).not.toHaveAttribute('disabled');
        });
    });

    test('handles API call and displays roman numeral', async () => {
        const mockRomanNumeral = 'XLII';
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => ({ output: mockRomanNumeral })
        });

        const { rerender } = renderComponent();
        
        const numberInput = screen.getByLabelText('Enter a Number');
        const convertButton = screen.getByRole('button', { name: 'Convert to Roman Numeral' });

        // Enter valid number
        await act(async () => {
            fireEvent.change(numberInput, { target: { value: '42' } });
            // Force a re-render to update validation state
            rerender(
                <Provider theme={defaultTheme}>
                    <FormContent />
                </Provider>
            );
        });

        // Wait for validation state to update
        await waitFor(() => {
            const wrapper = screen.getByLabelText('Enter a Number').closest('.zo2IKa_spectrum-Textfield');
            expect(wrapper).toHaveClass('zo2IKa_spectrum-Textfield--valid');
        });

        // Click convert button and wait for API response
        await act(async () => {
            fireEvent.click(convertButton);
            // Wait for the API call to complete and state to update
            await new Promise(resolve => setTimeout(resolve, 0));
            // Force a re-render to update with new state
            rerender(
                <Provider theme={defaultTheme}>
                    <FormContent />
                </Provider>
            );
        });

        // Verify API call
        expect(fetch).toHaveBeenCalledWith(`${mockBackendBaseUrl}/romannumeral?number=42`);

        // Wait for and verify roman numeral display
        await waitFor(() => {
            const romanNumeralText = screen.getByText(/Roman Numeral :/);
            expect(romanNumeralText).toHaveTextContent(`Roman Numeral : ${mockRomanNumeral}`);
        });
    });
}); 