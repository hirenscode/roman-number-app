import React, { useState, useEffect } from "react";
import {Button, Flex, Form, TextField, Text} from "@adobe/react-spectrum";
import { useAPIConfig } from "../contexts/APIConfigContext";
import useLocalStorageState from "../hooks/useLocalStorageState";

export default function FormContent() {

    const [number, setNumber] = useLocalStorageState('lastNumber', 1);
    const [romanNumber, setRomanNumber] = useLocalStorageState('lastRomanNumeral', 'I');

    const { backendBaseUrl } = useAPIConfig();


    const isValid = () => {
        return number >= 1 && number <= 3999;
    }

    const convertToRoman = () => {
        fetch(`${backendBaseUrl}/romannumeral?number=${number}`)
            .then(res => {
                if (!res.ok) {
                    setRomanNumber('API Response was not OK (200)');
                    throw new Error('Failed to fetch Roman numeral');
                }
                return res.json();
            })
            .then(data => setRomanNumber(data.output))
            .catch(error => {
                console.error('Error:', error);
                setRomanNumber('Error Fetching from API');
            });
    }

    return (
        <Flex direction="column" alignItems="center" justifyContent="center" width={"100%"} height="85vh" gap="size-300">
            <Form width="100%" maxWidth="size-3600">
                <TextField value={number}
                    validationState={isValid() ? "valid" : "invalid"}
                    errorMessage="Only 'numbers' between 1 to 3999 allowed"
                    inputMode="numeric" 
                    onChange={(val) => {setNumber(val)}} 
                    label="Enter a Number" 
                    maxLength="4"
                />
                <Button onClick={convertToRoman} isDisabled={!isValid()}> Convert to Roman Numeral </Button>
                <Text alignSelf="center" UNSAFE_style={{ textAlign: "center", fontSize: "20px" }}> Roman Numeral : {romanNumber} </Text>
            </Form>
        </Flex>
    );
}