import React, {useState} from "react";
import {Button, Flex, Form, TextField, Text} from "@adobe/react-spectrum";

export default function FormContent() {

    const [romanNumber, setRomanNumber] = useState('I');
    const [number, setNumber] = useState(1);

    const isValid = () => {
        return number >= 1 && number <= 3999;
    }

    const convertToRoman = () => {
        //Fetch roman number from Backend and
        //setRomanNumer()
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