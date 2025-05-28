import React, {useState} from "react";
import {Button, Flex, Form, TextField, Text} from "@adobe/react-spectrum";

export default function FormContent() {

    const [romanNumber, setRomanNumber] = useState('I');
    const [number, setNumber] = useState(1);

    return (
        <Flex>
            <Form>
                <TextField value={number}></TextField>
                <Button> Convert to Roman Numeral </Button>
                <Text> Roman Numeral : {romanNumber} </Text>
            </Form>
        </Flex>
    );
}