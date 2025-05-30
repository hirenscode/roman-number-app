import React, { useState, useEffect, useRef } from "react";
import {Button, Flex, Form, TextField, Text} from "@adobe/react-spectrum";
import { useAPIConfig } from "../contexts/APIConfigContext";
import useLocalStorageState from "../hooks/useLocalStorageState";
import { trackUserInteraction, trackApiCall, trackComponentRender } from "../utils/observability";

export default function FormContent() {

    const [number, setNumber] = useLocalStorageState('lastNumber', 1);
    const [romanNumber, setRomanNumber] = useLocalStorageState('lastRomanNumeral', 'I');
    const numberRef = useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const { backendBaseUrl } = useAPIConfig();

    // Track component render
    useEffect(() => {
        trackComponentRender('FormContent', { number, romanNumber });
    }, [number, romanNumber]);

    const isValid = () => {
        return number >= 1 && number <= 3999;
    }

    const convertToRoman = () => {
        const startTime = performance.now();
        trackUserInteraction('convert_to_roman', { input: number });

        fetch(`${backendBaseUrl}/romannumeral?number=${number}`)
            .then(res => {
                const duration = performance.now() - startTime;
                if (!res.ok) {
                    setRomanNumber('API Response was not OK (200)');
                    trackApiCall('/romannumeral', 'GET', res.status, duration);
                    throw new Error('Failed to fetch Roman numeral');
                }
                return res.json();
            })
            .then(data => {
                const duration = performance.now() - startTime;
                setRomanNumber(data.output);
                trackApiCall('/romannumeral', 'GET', 200, duration);
                trackUserInteraction('conversion_success', { 
                    input: number, 
                    output: data.output 
                });
            })
            .catch(error => {
                const duration = performance.now() - startTime;
                console.error('Error:', error);
                setRomanNumber('Error Fetching from API');
                trackApiCall('/romannumeral', 'GET', 'error', duration);
                trackUserInteraction('conversion_error', { 
                    input: number, 
                    error: error.message 
                });
            });
    }

    return (
        <Flex direction="column" alignItems="center" justifyContent="center" width={"100%"} height="85vh" gap="size-300">
            <Form width="100%" maxWidth="size-3600">
                <TextField 
                    value={number}
                    validationState={isValid() ? "valid" : "invalid"}
                    errorMessage="Only 'numbers' between 1 to 3999 allowed"
                    inputMode="numeric" 
                    onChange={(val) => {
                        setNumber(val);
                        trackUserInteraction('number_input', { value: val });
                    }} 
                    label="Enter a Number" 
                    maxLength="4"
                    ref={numberRef}
                    onFocus={() => {
                        setIsFocused(true);
                        if (numberRef.current) {
                            numberRef.current.select();
                        }
                        trackUserInteraction('input_focus');
                    }}
                    onBlur={() => {
                        setIsFocused(false);
                        trackUserInteraction('input_blur');
                    }}
                />
                <Button 
                    onClick={convertToRoman} 
                    isDisabled={!isValid()}
                > 
                    Convert to Roman Numeral 
                </Button>
                <Text alignSelf="center" UNSAFE_style={{ textAlign: "center", fontSize: "20px" }}> 
                    Roman Numeral : {romanNumber} 
                </Text>
            </Form>
        </Flex>
    );
}